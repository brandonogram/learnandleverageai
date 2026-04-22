# Overnight Session Results — April 2, 2026

## What Was Done

### Two New SaaS Products Created

You asked for three things after the workshop meeting. Here's where each stands:

---

### 1. AI Email Auto-Responder for Brianna/DEBCC → "InboxPilot"

**Location:** ~/projects/workbench/inbox-pilot/
**GitHub:** https://github.com/brandonbot67/inbox-pilot (private)

**What's built:**
- Full PRD with architecture, DB schema, API design, pricing, GTM strategy
- Next.js 15 project scaffolded with TypeScript + Tailwind
- AI classification engine (Claude Haiku) — classifies emails as auto-respond / draft-review / human-only
- AI draft generator — generates response drafts matching user's writing style
- RAG system — embeds past sent emails for few-shot learning (OpenAI text-embedding-3-small + Supabase pgvector)
- Gmail API client — read emails, send replies, manage inbox
- Google Pub/Sub webhook — real-time email detection (no polling)
- Gmail watch management — auto-renew push notifications
- Approval dashboard components — DraftCard, DraftQueue, EmailLog, StatsCards
- UI component library — Button, Card, Badge, Modal, Sidebar, EmptyState
- Supabase auth (Google OAuth flow)
- Stripe billing integration
- Database migration SQL ready to apply (supabase/migrations/001_initial_schema.sql)
- Dockerfile for Hetzner/Coolify deployment

**Economics:**
- Cost per customer: ~$3.55/month
- Price: $49/mo (Starter), $79/mo (Pro), $149/mo (Business)
- Gross margin: 92-96%

**GTM plan:**
1. Build for Brianna free (60-day pilot)
2. Get case study with real numbers
3. Demo at DEBCC meeting
4. Sell to members at $49/mo with DEBCC discount
5. Expand to 7,000+ chambers of commerce nationally

---

### 2. Social Media Content Research & Planning Tool → "ContentBrief"

**Location:** ~/projects/workbench/content-brief/
**GitHub:** https://github.com/brandonbot67/content-brief (private)

**What's built:**
- Full PRD with architecture, DB schema, API design, pricing, GTM strategy
- Next.js 15 project scaffolded with TypeScript + Tailwind
- AI brief generator (Claude Sonnet 4.6) — generates 7-14 content briefs per week with hooks, scripts, shot lists
- Trend analyzer — aggregates and surfaces industry trends
- Google Trends integration (SerpAPI)
- YouTube Data API integration
- Reddit API integration
- TikTok Creative Center integration (RapidAPI) — [partial, needs API key]
- Industry configuration for 10 launch industries with real subreddits, keywords, default pillars
- Supabase auth + Stripe billing
- Database migration SQL ready (supabase/migrations/001_initial_schema.sql)
- Seasonal events pre-seeded (universal + plumbing/HVAC/landscaping specific)
- Dockerfile for Hetzner/Coolify deployment

**Economics:**
- Fixed data cost: $80/month (SerpAPI + TikTok RapidAPI)
- Variable cost per customer: ~$1.58/month
- Price: $49/mo (Starter), $99/mo (Growth), $199/mo (Pro)
- Gross margin: 96-98%
- Breakeven: 3 customers

**GTM plan:**
1. Beta with LLAI workshop attendees (free)
2. Launch for blue-collar industries
3. Product Hunt in "AI tools for small business"
4. Consultant/agency affiliate program

---

### 3. Workshop Meeting Notes Processing

**Status: BLOCKED** — I asked you to re-paste the meeting notes three times but the pasted text never came through. Please paste them again or save to a file so I can generate proper next steps.

---

## Infrastructure Decisions

| Decision | Choice | Monthly Cost |
|----------|--------|-------------|
| Hosting (both apps) | Hetzner VPS + Coolify | $4.51/mo total |
| Database (both apps) | Supabase free tier (2 projects) | $0 |
| Email AI | Claude Haiku 4.5 | ~$2.65/customer |
| Content AI | Claude Sonnet 4.6 | ~$0.32/customer |
| Domain registrar | TBD — domain research complete | ~$10-15/year each |
| Total infrastructure | | **~$5/month** |

---

## Blockers for You (Brandon)

1. **Supabase access token expired** — Go to https://supabase.com/dashboard/account/tokens, generate a new token, and run:
   ```
   echo "sbp_NEW_TOKEN" > ~/.supabase/access-token
   export SUPABASE_ACCESS_TOKEN="sbp_NEW_TOKEN"
   ```

2. **Pick product names + buy domains** — Domain research is complete. Check docs/domain-research.md (or I'll summarize when the research agent finishes).

3. **Re-paste workshop meeting notes** — I need these to create proper follow-up plan with Brianna and next workshop planning.

4. **Hetzner account** — Create an account at hetzner.com to provision a CX23 VPS (~$4.35/mo). Full setup guide at docs/hosting-research.md.

5. **Pick domain names** — See docs/domain-research.md for available options. Best deals:
   - Content tool: filmbriefs.com ($11/yr) or weeklybrief.co ($25/yr) or briefengine.ai ($69/yr)
   - Email tool: autopilotmail.ai ($69/yr) or brainstorm a new .com name

5. **API keys needed** (for ContentBrief):
   - SerpAPI key ($50/mo) — serpapi.com
   - RapidAPI key ($30/mo) — rapidapi.com for TikTok Creative Center
   - YouTube API key (free) — console.cloud.google.com
   - Reddit API credentials (free) — reddit.com/prefs/apps

6. **Google Cloud project** (for InboxPilot):
   - Create project at console.cloud.google.com
   - Enable Gmail API + Cloud Pub/Sub
   - Create OAuth 2.0 credentials (client ID + secret)
   - Set up Pub/Sub topic for email notifications

---

## Files Created/Updated This Session

### New Files
- ~/projects/workbench/inbox-pilot/ (entire project)
- ~/projects/workbench/content-brief/ (entire project)
- docs/ai-email-responder-research.md (architecture research)
- docs/social-content-research-tool-recommendation.md (architecture research)
- docs/overnight-session-apr2.md (this file)

### Updated Files
- CONTEXT.md (added Apr 2 decisions)
- ~/shared-brain/CHANGELOG.md (session entry)
- ~/shared-brain/DECISIONS.md (2 new decisions)
- ~/shared-brain/PROJECTS.md (2 new projects registered)
- ~/shared-brain/CLAUDE-CODE-DAILY-LOG.md (full session log)
- Memory files: project_inbox_pilot.md, project_content_brief.md, feedback_no_vercel.md
