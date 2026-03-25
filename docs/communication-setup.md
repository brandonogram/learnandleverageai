# LearnAndLeverageAI Communication Setup

> **Status:** ACTION REQUIRED (Brandon — ~15 min total)
> **Date:** 2026-03-21
> **Purpose:** Set up business email and phone so Brandon's personal info is NEVER public-facing

---

## CRITICAL RULE

**Brandon's personal phone (302-420-9576) and personal email (mcrbrandon@gmail.com) must NEVER appear on any public-facing material** — website, ads, handouts, Facebook page, Eventbrite, or anywhere else. All communication goes through automated systems.

---

## PART 1: EMAIL — AgentMail.to Setup

### Why AgentMail

AgentMail.to is an API-first email platform designed for AI agents. It provides real email inboxes that can send, receive, and be automated via REST API and webhooks. Free plan includes 3 inboxes, 3,000 emails/month, 100 emails/day, and 3 GB storage — more than enough for workshop lead capture and support.

### What We Need

| Inbox | Purpose | Public-Facing? |
|-------|---------|---------------|
| `info@learnandleverageai.agentmail.to` | Contact email for website, ads, handouts, Facebook | Yes |
| `support@learnandleverageai.agentmail.to` | Post-workshop support, follow-up | Yes |
| (optional 3rd) | Internal notifications, webhook receiver | No |

### Step 1: Create AgentMail Account (Brandon — 2 min)

1. Go to: **https://console.agentmail.to/sign-up**
2. Sign up with GitHub, Apple, or email (uses Clerk auth)
3. No credit card required (free plan)
4. Once in the console, go to **API Keys** section
5. Click **"Create New API Key"**
6. Copy the key (format: `am_...`) and save it

**Give the API key to Claude Code** — it will be added to `~/shared-brain/CREDENTIALS.md` and used for all email automation.

### Step 2: Create Inboxes (Automated via API after Step 1)

Once the API key is provided, Claude Code will run:

```bash
# Create info@ inbox
curl -X POST "https://api.agentmail.to/v0/inboxes" \
  -H "Authorization: Bearer am_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "info",
    "domain": "learnandleverageai.agentmail.to",
    "display_name": "Learn & Leverage AI"
  }'

# Create support@ inbox
curl -X POST "https://api.agentmail.to/v0/inboxes" \
  -H "Authorization: Bearer am_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "support",
    "domain": "learnandleverageai.agentmail.to",
    "display_name": "Learn & Leverage AI Support"
  }'
```

**Note on domain:** On the free plan, custom domains aren't available. The domain will be `agentmail.to` and the username can be `info-learnandleverageai` or similar. If the `learnandleverageai` subdomain style isn't supported, we'll use:
- `info-learnandleverageai@agentmail.to`
- `support-learnandleverageai@agentmail.to`

Or upgrade to the $20/mo Developer plan for custom domain `learnandleverageai.com` (requires DNS verification).

### Step 3: Configure Webhooks for GHL Routing

After inbox creation, set up webhooks so inbound emails are forwarded to GHL:

```bash
curl -X POST "https://api.agentmail.to/v0/webhooks" \
  -H "Authorization: Bearer am_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://services.leadconnectorhq.com/hooks/WEBHOOK_ID",
    "event_types": ["message.received"],
    "inbox_ids": ["info-inbox-id", "support-inbox-id"]
  }'
```

The webhook URL will be a GHL inbound webhook that creates/updates contacts and triggers workflows when emails arrive.

### Step 4: Configure as GHL "From" Address

For GHL email sequences to send FROM the AgentMail address:
- **Option A (Recommended):** Set up AgentMail as a custom SMTP sender in GHL under Settings > Email Services. AgentMail supports SMTP via their API.
- **Option B:** Use GHL's built-in LC Email with a forwarding address pointing to AgentMail for replies.
- **Option C:** Use the AgentMail API directly from GHL workflows via custom webhook actions.

### AgentMail API Reference

| Detail | Value |
|--------|-------|
| **Base URL** | `https://api.agentmail.to/v0/` |
| **Auth** | Bearer token (`Authorization: Bearer am_...`) |
| **Create Inbox** | `POST /v0/inboxes` |
| **Send Email** | `POST /v0/inboxes/{inbox_id}/messages` |
| **List Messages** | `GET /v0/inboxes/{inbox_id}/messages` |
| **Reply** | `POST /v0/inboxes/{inbox_id}/messages/{message_id}/reply` |
| **Create Webhook** | `POST /v0/webhooks` |
| **Docs** | https://docs.agentmail.to |
| **Console** | https://console.agentmail.to |
| **SDKs** | Python: `pip install agentmail` / Node: `npm install agentmail` |

### Free Plan Limits

| Resource | Limit |
|----------|-------|
| Inboxes | 3 |
| Emails/month | 3,000 |
| Emails/day | 100 |
| Storage | 3 GB |
| Webhook endpoints | 2 |
| Custom domains | 0 (need $20/mo Developer plan) |

### Alternative: Custom Domain Email ($20/mo)

If we want `info@learnandleverageai.com` and `support@learnandleverageai.com` (much more professional), upgrade to the Developer plan ($20/mo) and:
1. Add domain `learnandleverageai.com` in AgentMail console
2. Add DNS records (SPF, DKIM, MX) to the domain registrar
3. Verify domain
4. Create inboxes with the custom domain

**Recommendation:** Start with the free plan (`@agentmail.to` addresses) to get moving NOW, upgrade to custom domain later if needed.

---

## PART 2: PHONE — Twilio + GHL Voice AI Setup

### Current State

| Item | Status |
|------|--------|
| GHL Sub-Account (LLAI) | Active — Location ID: `AVkeTAjBMKyrH5q0f7bQ` |
| GHL Location Phone | Brandon's personal: 302-420-9576 (MUST CHANGE) |
| LC Phone Number | NOT assigned (LC Phone may not be enabled) |
| Twilio Number | **ALREADY PURCHASED**: +1 (302) 416-6285 |
| Twilio Number SID | See ~/shared-brain/CREDENTIALS.md |
| Twilio Account | See ~/shared-brain/CREDENTIALS.md |

### The Twilio Number

A dedicated Twilio number was purchased for LearnAndLeverageAI:

- **Number:** (302) 416-6285 / +13024166285
- **Type:** Local (Delaware 302 area code)
- **Capabilities:** Voice, SMS, MMS
- **Friendly Name:** LearnAndLeverageAI
- **Status:** Active, no webhooks configured yet
- **Cost:** ~$1.15/month + per-minute/per-message usage

This number is brand new and ready to be connected to GHL.

### Recommended Setup: Option B — Twilio Number Connected to GHL

**Why Twilio over LC Phone:**
1. Twilio number already exists and is purchased
2. Brandon's GHL agency already has Twilio connected (other sub-accounts use it)
3. More control over number configuration
4. Can be used outside GHL too (direct API, other integrations)
5. LC Phone requires identity verification (Persona — gov ID + selfie) which hasn't been done for this sub-account

### Setup Steps (Brandon — 10 min in GHL UI)

#### Step 1: Verify Twilio is Connected at Agency Level

1. Go to **GHL Agency View** (app.gohighlevel.com)
2. Navigate to **Settings > Phone Integration**
3. Confirm Twilio Account SID is connected (see ~/shared-brain/CREDENTIALS.md)
4. If not connected, paste credentials from ~/shared-brain/CREDENTIALS.md

#### Step 2: Assign Number to LLAI Sub-Account

1. Switch to **LearnAndLeverageAI sub-account**
2. Go to **Settings > Phone Numbers**
3. The Twilio number `(302) 416-6285` should appear automatically
4. If it doesn't appear, click **+ Add Number > Import from Twilio**
5. Select `+13024166285` and assign it to this location

#### Step 3: Update Location Phone

1. In the LLAI sub-account, go to **Settings > Business Profile**
2. Change the **phone number** from `302-420-9576` to `302-416-6285`
3. Save changes

**This removes Brandon's personal number from the GHL location entirely.**

#### Step 4: Create Voice AI Agent

1. In the LLAI sub-account, navigate to **Conversation AI > Voice AI** (or AI Employee section)
2. Click **"Create New Agent"**
3. Configure the agent:
   - **Name:** LLAI Workshop Assistant
   - **Greeting:** "Hi! Thanks for calling Learn and Leverage AI. I'm the AI assistant for our hands-on AI workshops in Delaware. How can I help you today?"
   - **Knowledge Base:** Add workshop details, FAQ, pricing, schedule (from `docs/ghl-workshop-setup.md`)
   - **Actions:** Book workshop registration, answer FAQs, escalate to Brandon only if explicitly requested
   - **Escalation Number:** Brandon's personal number (internal only, never shown to callers)

4. **Assign Phone Number:**
   - In the Voice AI agent settings, go to **Phone & Availability**
   - Assign `(302) 416-6285` to this agent
   - Set to answer ALL inbound calls (no forwarding)

#### Step 5: Configure Inbound Call Flow

1. Go to **Settings > Phone Numbers**
2. Click the three dots next to `(302) 416-6285`
3. Select **Edit Configuration**
4. Set **"Forward Calls to"** to the Voice AI agent
5. **Important:** Do NOT use this as the default sub-account phone number if you want AI to always answer

**Result:** When someone calls (302) 416-6285, GHL Voice AI answers, handles the conversation, books registrations, answers FAQs, and only escalates to Brandon if the caller explicitly asks for a human.

### Voice AI Pricing (GHL)

| Item | Cost |
|------|------|
| Twilio number rental | ~$1.15/month |
| GHL Voice AI (per minute) | ~$0.13-0.15/min (consumption-based) |
| Twilio per-minute (inbound) | ~$0.0085/min |
| SMS (outbound) | ~$0.0079/segment |
| Total estimated monthly | $5-15/month for low volume |

### A2P 10DLC Compliance (for SMS)

The Twilio account already has:
- **Brand:** `BN1a057e011d233baed40c015e081956a8` (APPROVED, Dude Ventures Services LLC)
- **Campaign:** `QE2c6890da8086d771620e9b13fadeba0b` (IN_PROGRESS, Low Volume Mixed)
- **Messaging Service:** `MGf3da26b373bd9d9f8270753a17c81eb5`

For SMS from the LLAI number, the number needs to be added to the messaging service campaign. This can be done via Twilio API:

```bash
# Use Twilio credentials from ~/shared-brain/CREDENTIALS.md
curl -X POST "https://messaging.twilio.com/v1/Services/$TWILIO_MESSAGING_SID/PhoneNumbers" \
  -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN" \
  -d "PhoneNumberSid=$TWILIO_LLAI_NUMBER_SID"
```

Or create a new campaign specifically for LLAI if the existing one is scoped differently.

---

## PART 3: What Goes Where (Public-Facing Contact Info)

### Use These Everywhere

| Channel | Contact Info |
|---------|-------------|
| **Website** (learnandleverageai.com) | Phone: (302) 416-6285, Email: info@[agentmail-address] |
| **Facebook Page** | Phone: (302) 416-6285, Email: info@[agentmail-address] |
| **Instagram** | Link to website |
| **Eventbrite** | Phone: (302) 416-6285, Email: info@[agentmail-address] |
| **Handouts/Flyers** | Phone: (302) 416-6285, Email: info@[agentmail-address] |
| **Meta Ads** | Phone: (302) 416-6285 |
| **LinkedIn** | Link to website |
| **Nextdoor** | Phone: (302) 416-6285 |

### NEVER Use These Publicly

| Item | Why Not |
|------|---------|
| 302-420-9576 | Brandon's personal cell — calls would ring his phone directly |
| mcrbrandon@gmail.com | Brandon's personal email — no automation, no tracking |
| brandontcalloway@gmail.com | Personal email |
| Any @gmail.com | Not professional, not automated |

---

## PART 4: Action Items Summary

### Brandon Must Do (Manual, ~15 min total)

- [ ] **AgentMail signup** — Go to https://console.agentmail.to/sign-up, create account, get API key (2 min)
- [ ] **GHL Twilio connection** — Verify Twilio is connected at agency level (2 min)
- [ ] **GHL number assignment** — Assign (302) 416-6285 to LLAI sub-account (3 min)
- [ ] **GHL location phone update** — Change from 302-420-9576 to 302-416-6285 (1 min)
- [ ] **GHL Voice AI agent** — Create Voice AI agent and assign phone number (7 min)

### Claude Code Will Do (Automated, after API key)

- [ ] Create AgentMail inboxes via API
- [ ] Configure webhooks for GHL routing
- [ ] Add Twilio number to A2P messaging campaign
- [ ] Update CREDENTIALS.md with all new IDs
- [ ] Update website contact info
- [ ] Update all marketing materials

---

## Credentials to Save (after setup)

```
## AgentMail (LearnAndLeverageAI)
- **API Key:** [from console]
- **Info Inbox:** info-learnandleverageai@agentmail.to (or custom domain version)
- **Support Inbox:** support-learnandleverageai@agentmail.to (or custom domain version)

## Twilio (LearnAndLeverageAI dedicated number)
- **Number:** +13024166285 / (302) 416-6285
- **SID:** See ~/shared-brain/CREDENTIALS.md
- **Account:** See ~/shared-brain/CREDENTIALS.md
- **Purpose:** Business phone for LLAI — Voice AI answers, SMS automated
```
