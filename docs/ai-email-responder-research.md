# AI Email Auto-Responder: Research & Architecture Plan

**Date:** 2026-04-02
**Target Customer:** Brianna / DEBCC (initial), then productize for DEBCC members (small biz owners)
**Price Target:** $50-100/month per customer

---

## 1. Architecture Overview

```
                    +------------------+
                    |   Gmail/Outlook  |
                    |   (User's inbox) |
                    +--------+---------+
                             |
                    Google Pub/Sub webhook
                    (real-time push notification)
                             |
                    +--------v---------+
                    | Supabase Edge    |
                    | Function:        |
                    | "email-webhook"  |
                    +--------+---------+
                             |
              +--------------+--------------+
              |                             |
     +--------v---------+         +--------v---------+
     | Claude Haiku 4.5 |         | Supabase DB      |
     | Classification   |         | (store raw email) |
     | + Draft Gen      |         | + embeddings      |
     +--------+---------+         +------------------+
              |
     +--------v---------+
     | Classification   |
     | Result:          |
     +--------+---------+
              |
     +-----+--+--+-----+
     |        |        |
  auto-    draft+    flag for
  send     review    human
  (routine) (queue)  (complex)
     |        |        |
     v        v        v
  Gmail    Dashboard  Email
  API      (Next.js)  notification
  send     approval   to owner
           UI
```

### How It Works (Step by Step)

1. **User connects Gmail** via OAuth 2.0 during onboarding
2. **Google Pub/Sub** sends a push notification to our webhook whenever a new email arrives
3. **Supabase Edge Function** receives the webhook, fetches the full email via Gmail API, stores it
4. **Claude Haiku 4.5** classifies the email into one of three buckets:
   - **Auto-send:** Routine question with high-confidence answer (membership dues, event dates, hours, etc.)
   - **Draft + Review:** AI drafts a response, queues it for human approval
   - **Flag for Human:** Complex, sensitive, or novel -- just notify the owner
5. **For auto-send:** The system sends the response via Gmail API (appears in their Sent folder)
6. **For draft + review:** The owner sees the draft in a simple dashboard, can edit and approve with one click
7. **For flagged:** The owner gets a push notification / email digest saying "these need your attention"

---

## 2. Tech Stack Recommendation

### Core Stack (Matches Your Existing Setup)

| Component | Technology | Why |
|-----------|-----------|-----|
| **Frontend / Dashboard** | Next.js (existing) | Already have it, approval UI is simple |
| **Database** | Supabase PostgreSQL (existing) | Multi-tenant via RLS, pgvector for embeddings |
| **Auth** | Supabase Auth + Google OAuth | Users sign in with Google, we get Gmail access in the same flow |
| **Email API** | Gmail API (direct) | Free, no per-mailbox cost, most small biz owners use Gmail |
| **Real-time Email Detection** | Google Cloud Pub/Sub | Free tier: 10GB/month. Push notifications, no polling |
| **Email Classification** | Claude Haiku 4.5 API | $1/$5 per MTok. Cheapest good model for classification |
| **Draft Generation** | Claude Haiku 4.5 API | Same model, few-shot with user's past responses |
| **Embeddings** | OpenAI text-embedding-3-small | $0.02/MTok. Embed past sent emails for RAG retrieval |
| **Vector Search** | Supabase pgvector | Built into Postgres, no extra service |
| **Background Jobs** | Supabase Edge Functions + pg_cron | Webhook handlers, daily digests, token refresh |
| **Hosting** | Vercel (existing) | Dashboard and API routes |
| **Deployment** | Vercel + Supabase | Both already in use |

### Why NOT Nylas or EmailEngine

| Option | Cost | Verdict |
|--------|------|---------|
| **Nylas** | $1.35-3.30/mailbox/month | Adds per-customer cost, overkill for Gmail-only MVP |
| **EmailEngine** | $995/year flat | Good at scale (100+ mailboxes), but premature for MVP |
| **Gmail API direct** | Free | Best for MVP. Add Nylas/EmailEngine later if you need Outlook support |

**Decision:** Start with Gmail API direct. It covers 80%+ of small business owners. Add Microsoft Graph API as a paid add-on later if demand exists.

---

## 3. MVP Feature Set

### Phase 1: Core Product (Weeks 1-4)

**Must-Have Features:**

1. **Google OAuth onboarding** -- "Connect your Gmail" button, one click
2. **Email ingestion** -- Pub/Sub webhook receives new emails in real-time
3. **AI classification** -- Each incoming email classified as: auto-respond / draft-for-review / needs-human
4. **Auto-response for routine emails** -- Configurable categories (membership questions, event info, hours/location, etc.)
5. **Draft queue dashboard** -- Simple list: email subject, sender, AI draft, approve/edit/reject buttons
6. **One-click approve** -- Sends the AI draft as a reply from user's Gmail
7. **Daily digest email** -- Summary of what was auto-handled, what needs review
8. **Knowledge base setup** -- User pastes FAQs, org info, and key details the AI should know

### Phase 2: Learning System (Weeks 5-6)

9. **Past email import** -- Scan last 90 days of sent emails, embed them as training data
10. **Style matching** -- AI drafts match the user's actual writing style and tone
11. **Category auto-detection** -- System learns what types of emails the user gets repeatedly
12. **Confidence scoring** -- Higher confidence = auto-send, lower confidence = draft queue

### Phase 3: Polish (Weeks 7-8)

13. **Mobile-friendly approval** -- Approve drafts from phone via email link or simple mobile UI
14. **Response templates** -- User-created templates the AI can draw from
15. **Analytics dashboard** -- Emails handled, time saved, response time improvement
16. **Multi-inbox** -- Connect additional Gmail accounts (for assistants, shared inboxes)

### What's NOT in MVP

- Outlook/Microsoft support (Phase 2 product)
- Calendar integration
- CRM integration
- Team/multi-user collaboration
- Custom domains for sending

---

## 4. Email Classification System (Technical Detail)

### Classification Prompt (Claude Haiku 4.5)

```
You are an email classifier for a {organization_type}.

Given an incoming email, classify it into one of three categories:
1. AUTO_RESPOND - Routine question that can be answered from the knowledge base
2. DRAFT_REVIEW - Needs a response but should be reviewed by the owner first
3. HUMAN_ONLY - Complex, sensitive, personal, or novel -- owner must handle

Also extract:
- category: (membership, events, billing, general_info, complaint, partnership, other)
- urgency: (low, medium, high)
- confidence: (0.0 to 1.0)

Knowledge base:
{knowledge_base_text}

Recent similar emails and how they were handled:
{few_shot_examples}

Incoming email:
From: {sender}
Subject: {subject}
Body: {body}

Respond in JSON only.
```

### Few-Shot Learning from Past Emails

The system gets smarter over time by:

1. **Initial setup:** User provides FAQ answers and org info (knowledge base)
2. **Import phase:** We scan the user's last 90 days of sent emails and embed them with `text-embedding-3-small`
3. **At classification time:** When a new email arrives, we:
   - Embed the incoming email
   - Vector search for the 5 most similar past sent emails
   - Include those as few-shot examples in the classification prompt
4. **Feedback loop:** When the user approves/edits/rejects a draft, we store that as a new training example

### RAG Architecture (Supabase pgvector)

```sql
-- Store user's past email responses as training data
CREATE TABLE email_training_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  original_email_subject TEXT,
  original_email_body TEXT,
  response_body TEXT,
  category TEXT,
  embedding VECTOR(1536),  -- text-embedding-3-small
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for multi-tenant isolation
ALTER TABLE email_training_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own data" ON email_training_data
  FOR ALL USING (auth.uid() = user_id);

-- Create index for fast similarity search
CREATE INDEX ON email_training_data
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);
```

```sql
-- Similarity search function
CREATE OR REPLACE FUNCTION match_training_emails(
  query_embedding VECTOR(1536),
  match_user_id UUID,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  original_email_subject TEXT,
  original_email_body TEXT,
  response_body TEXT,
  category TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    etd.id,
    etd.original_email_subject,
    etd.original_email_body,
    etd.response_body,
    etd.category,
    1 - (etd.embedding <=> query_embedding) AS similarity
  FROM email_training_data etd
  WHERE etd.user_id = match_user_id
  ORDER BY etd.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
```

---

## 5. Approval Workflow (Technical Detail)

### Database Schema

```sql
-- Incoming emails
CREATE TABLE incoming_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  gmail_message_id TEXT NOT NULL,
  gmail_thread_id TEXT NOT NULL,
  from_email TEXT NOT NULL,
  from_name TEXT,
  subject TEXT,
  body_text TEXT,
  body_html TEXT,
  received_at TIMESTAMPTZ,
  classification TEXT CHECK (classification IN ('auto_respond', 'draft_review', 'human_only')),
  category TEXT,
  urgency TEXT,
  confidence FLOAT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'auto_sent', 'draft_ready', 'approved', 'rejected', 'edited_and_sent', 'flagged')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI-generated drafts
CREATE TABLE email_drafts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  incoming_email_id UUID REFERENCES incoming_emails NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  draft_body TEXT NOT NULL,
  edited_body TEXT,  -- null until user edits
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'sent')),
  approved_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  gmail_draft_id TEXT,  -- if we create a Gmail draft
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User knowledge base
CREATE TABLE knowledge_base (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Approval Flow States

```
New Email Arrives
    |
    v
[CLASSIFY with Haiku]
    |
    +---> confidence >= 0.85 + AUTO_RESPOND --> [AUTO-SEND via Gmail API] --> status: auto_sent
    |
    +---> DRAFT_REVIEW --> [GENERATE DRAFT with Haiku] --> status: draft_ready
    |                         |
    |                    [User sees in dashboard]
    |                         |
    |                    +----+----+
    |                    |         |
    |                 Approve    Edit
    |                    |         |
    |                    v         v
    |               [SEND]    [User edits]
    |                    |         |
    |                    |    [SEND edited]
    |                    |         |
    |                    v         v
    |              status: approved / edited_and_sent
    |
    +---> HUMAN_ONLY --> status: flagged --> [NOTIFY USER via email/push]
```

### Dashboard UI (Simple)

The approval dashboard is a single-page app with three tabs:

1. **Needs Review** (count badge) -- Drafts waiting for approval
   - Each card shows: sender, subject, AI draft, confidence score
   - Actions: [Approve & Send] [Edit] [Reject] [Handle Manually]

2. **Auto-Handled** -- What the AI sent on your behalf today
   - Read-only log with "Undo" option (within 30 seconds, cancels scheduled send)

3. **Flagged** -- Emails the AI couldn't handle
   - Quick link to open in Gmail

---

## 6. Competitive Landscape

### Direct Competitors

| Product | Price | What It Does | Gap for Small Biz |
|---------|-------|-------------|-------------------|
| **Shortwave** | $25-44/mo | AI email client, Ghostwriter matches your style | Replaces Gmail entirely -- too disruptive for small biz owners |
| **Superhuman** | $30/mo | Fast email client with AI features | Consumer product, not for auto-responding to members |
| **SaneBox** | $7-36/mo | Email sorting/filtering | No AI drafting or auto-response |
| **Front** | $19-59/mo | Shared inbox with collaboration | Team tool, overkill for solo operator |
| **Missive** | $14-26/mo | Collaborative inbox | Same -- team-oriented |
| **Help Scout** | $25-65/mo | Support desk with AI | Too heavy, designed for support teams |
| **Glue Up** | Custom | Chamber-specific CRM + email | Expensive, full CRM platform |

### Our Differentiator

**None of these products are designed for a solo business owner or org director who needs AI to handle their personal Gmail inbox.**

They all either:
- Replace Gmail (Shortwave, Superhuman) -- too disruptive
- Require a team (Front, Missive, Help Scout) -- overkill
- Only sort/filter (SaneBox) -- no response generation
- Are expensive platforms (Glue Up) -- wrong price point

**Our product:** "Keep using Gmail. We just make it so 60% of your emails get answered automatically."

---

## 7. Cost to Run Per Customer

### Monthly Cost Breakdown Per Customer

| Cost Item | Calculation | Monthly Cost |
|-----------|------------|-------------|
| **Claude Haiku 4.5 (classification)** | 500 emails x ~800 tokens avg input x $1/MTok | $0.40 |
| **Claude Haiku 4.5 (draft generation)** | 300 drafts x ~1500 tokens avg output x $5/MTok | $2.25 |
| **OpenAI Embeddings** | 500 emails x ~500 tokens x $0.02/MTok | $0.005 |
| **Supabase (pro-rated)** | $25/mo base / 50 customers | $0.50 |
| **Google Cloud Pub/Sub** | Free tier (10GB/mo) | $0.00 |
| **Gmail API** | Free | $0.00 |
| **Vercel hosting (pro-rated)** | $20/mo / 50 customers | $0.40 |
| **Total per customer** | | **~$3.55/mo** |

### At Scale (200 customers)

| Cost Item | Monthly |
|-----------|---------|
| Claude API | ~$530 |
| OpenAI Embeddings | ~$1 |
| Supabase Pro | $25 (one project, all tenants via RLS) |
| Vercel Pro | $20 |
| Google Cloud | ~$5 |
| **Total** | **~$581/mo** |
| **Revenue (200 x $79/mo)** | **$15,800/mo** |
| **Gross margin** | **96.3%** |

### Key Insight

At $79/month with a ~$3.55/customer cost, you have massive margin. Even at $49/month you are printing money. The LLM costs for classification + drafting are surprisingly cheap when using Haiku.

---

## 8. Productization Strategy

### Pricing

| Tier | Price | What's Included |
|------|-------|----------------|
| **Starter** | $49/mo | 1 Gmail inbox, 250 emails/mo, basic knowledge base, approval dashboard |
| **Pro** | $79/mo | 1 Gmail inbox, 1000 emails/mo, full RAG learning, style matching, analytics |
| **Business** | $149/mo | 3 inboxes, 3000 emails/mo, priority support, custom categories |

### Go-to-Market (DEBCC-Specific)

1. **Build it for Brianna first** -- She's the design partner. Build exactly what she needs.
2. **Free pilot:** Give Brianna 60 days free in exchange for:
   - Feedback on every feature
   - A case study with real numbers (hours saved, response time improvement)
   - Introduction to 10 DEBCC members who could use it
3. **DEBCC member discount:** $49/mo (Starter) with "DEBCC" code
4. **Workshop it:** Do a 30-min demo at a DEBCC meeting showing Brianna's results
5. **Referral program:** Brianna gets $10/mo credit per referral

### Broader Market

After DEBCC validation:
- **Chambers of commerce nationally** (there are 7,000+ in the US)
- **Membership organizations** (associations, clubs, nonprofits)
- **Solo professional services** (lawyers, accountants, realtors)
- **Any small biz owner drowning in email**

### Sales Pitch

"We analyzed Brianna's inbox at DEBCC. She was spending 3 hours a day on email. 60% of those emails were the same 15 questions. Our AI now handles those automatically. She reviews the drafts in 10 minutes over coffee. She got 2 hours back every day. That's what this does for you."

---

## 9. Implementation Timeline

### Week 1-2: Foundation
- [ ] Supabase schema (tables above + RLS policies)
- [ ] Google OAuth flow (connect Gmail)
- [ ] Gmail Pub/Sub webhook setup
- [ ] Email ingestion pipeline (webhook -> store in DB)
- [ ] Basic Claude Haiku classification (hardcoded knowledge base)

### Week 3-4: Core Product
- [ ] Draft generation with Haiku
- [ ] Approval dashboard UI (Next.js)
- [ ] One-click approve + send via Gmail API
- [ ] Auto-send for high-confidence routine emails
- [ ] Daily digest email (what was auto-handled)
- [ ] Knowledge base CRUD (user adds FAQs)

### Week 5-6: Learning System
- [ ] Past email import (scan last 90 days of sent)
- [ ] Embed sent emails with text-embedding-3-small
- [ ] RAG retrieval at classification time
- [ ] Style matching in draft generation
- [ ] Confidence scoring calibration

### Week 7-8: Polish & Launch
- [ ] Analytics dashboard (emails handled, time saved)
- [ ] Mobile-friendly approval (responsive + email links)
- [ ] Onboarding flow (guided setup wizard)
- [ ] Stripe billing integration (already have Stripe)
- [ ] Landing page for the product
- [ ] Deploy to production on Vercel

### Total: ~8 weeks to MVP with learning system

For a faster path: Weeks 1-4 alone produce a usable product. The learning system (weeks 5-6) makes it significantly better but isn't required for initial pilot with Brianna.

---

## 10. Technical Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **Gmail API quota limits** | Can't process emails fast enough | Pub/Sub eliminates polling; 250 units/user/sec is generous for inbox monitoring |
| **Google OAuth verification** | Delays launching to public | Start with "Testing" mode (100 users); apply for verification in week 3; takes 2-6 weeks |
| **AI sends wrong response** | Embarrassment, trust loss | Default to draft-review mode; only auto-send after user has approved 20+ similar emails with >0.90 confidence |
| **User's Gmail gets flagged as spam** | Deliverability issues | Send from user's actual Gmail via API (not our servers); rate-limit sends to human-like pace |
| **Data privacy concerns** | Users won't connect Gmail | Email content is only stored in their Supabase row (RLS); we never train on their data; offer data deletion |
| **Haiku quality too low** | Bad classifications/drafts | Start with Haiku; upgrade to Sonnet 4.6 for draft generation if quality is insufficient (~3x cost, still cheap) |

---

## 11. Database Schema Summary

### Tables

1. `users` -- Supabase Auth (built-in)
2. `user_settings` -- Gmail tokens, preferences, auto-send thresholds
3. `incoming_emails` -- Every email received, with classification
4. `email_drafts` -- AI-generated drafts, approval status
5. `email_training_data` -- Past sent emails with embeddings (RAG)
6. `knowledge_base` -- User-provided FAQs and org info with embeddings
7. `email_categories` -- User-defined categories (membership, events, billing, etc.)
8. `activity_log` -- Audit trail of all actions (sent, approved, rejected)

### Row Level Security

Every table uses RLS with `auth.uid() = user_id` policy. This means:
- One Supabase project serves all customers
- Each customer only sees their own data
- No risk of data leakage between tenants
- No need for separate databases per customer

---

## 12. Key Design Decisions

| Decision | Choice | Reasoning |
|----------|--------|-----------|
| Email API | Gmail API direct (not Nylas) | Free, covers 80%+ of target market, no per-mailbox cost |
| LLM for classification | Claude Haiku 4.5 | $1/MTok input is cheapest viable option; great at classification |
| LLM for drafts | Claude Haiku 4.5 (upgrade path to Sonnet) | Start cheap, upgrade if quality demands it |
| Embeddings | OpenAI text-embedding-3-small | $0.02/MTok, best value, 1536 dimensions, strong performance |
| Multi-tenancy | Supabase RLS (not separate DBs) | Single project, single deployment, lowest ops burden |
| Real-time detection | Google Pub/Sub push (not polling) | Free tier, instant, no quota waste |
| Default behavior | Draft+review (not auto-send) | Trust must be earned; auto-send unlocks after proven accuracy |
| Product scope | Gmail only for MVP | 80/20 rule; Outlook support adds weeks of work for 20% of market |

---

## 13. What Makes This Sellable at $49-79/Month

Small business owners do not buy technology. They buy time back.

**The pitch is never "AI email classification with RAG-powered draft generation."**

**The pitch is:** "How much is 2 hours of your day worth? For $79/month, you get them back."

### Value Calculation for Prospect

- Average small biz owner spends 2-3 hours/day on email
- 60% of emails are repetitive/routine
- System handles those automatically
- Owner saves 1-2 hours/day = 20-40 hours/month
- At $50/hour value of their time = $1,000-2,000/month of value
- Product costs $79/month
- **ROI: 12-25x**

This is an easy sell, especially with Brianna's case study showing real numbers.
