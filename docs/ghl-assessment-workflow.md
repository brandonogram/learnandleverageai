# GHL Post-Purchase Workflow: AI Opportunity Assessment

**Purpose:** When a buyer completes Stripe checkout for the $997 AI Opportunity Assessment, fire the fulfillment handoff automatically. Codex CRITICAL #4 flagged this as a missing piece.

**Status:** Spec only. Brandon builds in GHL UI (API doesn't support workflow creation).

---

## Trigger

**Stripe webhook** → `POST https://learnandleverageai.com/api/webhook/stripe` (already exists at `src/app/api/webhook/stripe/route.ts`)

Stripe event: `checkout.session.completed` where the line item product ID matches `prod_UNS85jGx4lXqts` (AI Opportunity Assessment).

The handler already creates a GHL contact with the buyer's email + name + phone. Extend it to:
1. Add tag `assessment-purchased` to the contact
2. Add tag `assessment-intake-pending`
3. Set custom field `assessment_paid_at` to the current ISO timestamp
4. Add the contact to pipeline stage **"Assessment — paid, awaiting intake"** (needs creating in GHL UI — see below)

---

## GHL Pipeline changes

**New pipeline:** `fCAIO Prospects` (separate from the workshop pipeline `Lb2EtR2nnxlLGRWCwBpD`)

Stages:
1. `Applied` — submitted the `/assessment` apply form (Chunk 3 CTA swap)
2. `Assessment — paid, awaiting intake` — Stripe webhook fired, contact needs to call the intake line
3. `Assessment — intake done, report in progress` — voice-assessment route logged a transcript
4. `Assessment — delivered` — Brandon emailed the report
5. `Walkthrough booked`
6. `Walkthrough done`
7. `Retainer proposed` — Brandon pitched the $4,997 one-time build or $4,997/mo advisory
8. `Retainer signed` — closed
9. `Retainer declined` — lost, note the reason
10. `Referral asked` — moved here 4 weeks post-delivery

---

## Workflow 1 — "Assessment — Payment Confirmed"

**Trigger:** Contact tagged `assessment-purchased`

**Steps:**

1. **Wait 30 seconds** (let Stripe webhook finish setting all fields)

2. **Send SMS** (via Twilio through GHL) — `from: +13024166285`
   ```
   Hi {{contact.first_name}} — payment received for your AI Opportunity Assessment. Next step: call us at (302) 416-6285 any time to do your 20-min intake with Emma (our AI intake agent). Your report lands within 48 business hours of that call. — Brandon
   ```

3. **Send Email** (via AgentMail template, `from: brandon@learnandleverageai.com`)
   - Subject: `You're in — here's how to start your AI Assessment`
   - Body: Mirror the `/assessment/success` page content. Include:
     - Intake phone number (prominent)
     - What to expect during the 20-min call
     - 48-business-hour SLA starts at call completion
     - Calendar link for the walkthrough (sent after report is delivered, not now)
     - Brandon's direct email for anything urgent
     - Refund terms link

4. **Create Task** for Brandon:
   - Title: `Watch for intake transcript from {{contact.first_name}} ({{contact.company}})`
   - Due: +48 business hours from now
   - Note: `Transcript will arrive at brandon@learnandleverageai.com subject "Assessment intake — ..." — when it does, move contact to "intake done, report in progress" and start report prep`

5. **Wait 24 hours**

6. **If** contact still has tag `assessment-intake-pending` (hasn't called yet), **send** follow-up SMS:
   ```
   Hi {{contact.first_name}} — friendly nudge: we haven't heard your intake call yet. Dial (302) 416-6285 any time to kick off your assessment. 20 min, AI-guided. — Brandon
   ```

7. **Wait 48 hours** — if still pending, email Brandon to personally reach out.

---

## Workflow 2 — "Assessment — Intake Transcript Received"

**Trigger:** Brandon manually moves contact from `Assessment — paid, awaiting intake` → `Assessment — intake done, report in progress` (the manual move replaces the `assessment-intake-pending` tag with `assessment-intake-done`)

**Steps:**

1. **Create Task** for Brandon:
   - Title: `Produce assessment report for {{contact.first_name}} ({{contact.company}})`
   - Due: +48 business hours
   - Note: `Transcript in AgentMail. Use the Gamma template at [LINK]. Chunk 2 manual-first — automate after first 2 reports.`

2. **Wait 48 business hours** — if contact is not yet in `Assessment — delivered`, escalate to Brandon via SMS.

---

## Workflow 3 — "Assessment — Delivered"

**Trigger:** Brandon moves contact to `Assessment — delivered` stage

**Steps:**

1. **Send Email** (template):
   - Subject: `Your AI Opportunity Assessment for {{contact.company}} is ready`
   - Body: Link to Gamma report + calendar link to book the 30-min walkthrough

2. **Send SMS** 2 hours later if no calendar booking yet:
   ```
   Hi {{contact.first_name}} — your AI Assessment is in your inbox. Grab a 30-min walkthrough slot with Brandon here: [calendar link]
   ```

3. **Wait 7 days** — if still no walkthrough booked, create task for Brandon to call personally.

---

## Code hooks needed on the website

**File:** `src/app/api/webhook/stripe/route.ts` (already exists)

Changes needed (Chunk 2 follow-on PR):
- After the existing contact-create call, when `checkout.session.completed` matches the assessment product, also PATCH the contact:
  ```ts
  await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/tags`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${GHL_API_KEY}`, Version: '2021-07-28', 'Content-Type': 'application/json' },
    body: JSON.stringify({ tags: ['assessment-purchased', 'assessment-intake-pending'] }),
  });
  ```
- And move the contact to the `Assessment — paid, awaiting intake` pipeline stage (pipeline ID + stage ID go in env).

---

## Brandon's manual-mode fallback (until the workflow is wired)

If a buyer pays before the workflow is live:
1. Watch `brandon@learnandleverageai.com` for the Stripe receipt
2. Reply manually within 1 hour with the intake-line number and expectations
3. When Emma logs a transcript, start the report manually
4. Deliver via email within 48 business hours
5. Send calendar link for walkthrough

This is the current operating mode — don't block on Workflow 1 being perfect.

---

## What this does NOT do

- Auto-generate the Gamma report (that's Chunk 9)
- Auto-book the walkthrough call (Brandon manually sends calendar link after delivery)
- Handle refund requests (handled in Chunk 3 refund policy, not this workflow)
- Handle no-shows on the intake call (covered by Workflow 1 step 6/7 SMS follow-ups)
