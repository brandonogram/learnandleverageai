# Post-Workshop Feedback Survey

**Title:** AI Workshop Feedback — How Did We Do?
**Platform:** Typeform (preferred) or Google Forms (fallback)
**Trigger:** Sent via GHL 2 hours after workshop ends
**Purpose:** Collect before/after skill gap data, NPS, purchase tracking, testimonial consent, corporate leads

---

## STATUS: NEEDS MANUAL CREATION

**Why:** No Typeform API credentials available. Google Forms MCP permission denied. Survey must be created manually in Typeform or Google Forms UI.

**Estimated time to create:** 5 minutes in Typeform, 7 minutes in Google Forms

---

## SURVEY URL (fill in after creation)

- **Typeform URL:** `_____________________________`
- **Typeform Edit URL:** `_____________________________`
- **GHL Webhook URL:** (to update contact's post-workshop AI skill score)

---

## COMPLETE QUESTION SPECIFICATION

### Settings
- **Title:** AI Workshop Feedback — How Did We Do?
- **Welcome screen text:** "Thanks for attending today's AI workshop! Your feedback takes about 2 minutes and helps us make these workshops even better."
- **Thank you screen:** "Thanks for your feedback! Your input helps us make these workshops even better."
- **Progress bar:** On
- **One question at a time:** Yes (Typeform default)

---

### Question 1 — AI Skill Self-Assessment AFTER
- **Type:** Linear scale (slider if Typeform, scale if Google Forms)
- **Question:** "After today's workshop, how would you rate your AI skills now?"
- **Scale:** 1 to 10
- **Label left:** "1 = Still unsure"
- **Label right:** "10 = Confident daily user"
- **Required:** Yes
- **Intelligence:** This is the AFTER score. Combined with the BEFORE score from registration (GHL custom field `ai_skill_before`), this creates the before/after skill gap metric — our #1 marketing proof point ("Average attendee went from 2.3 to 6.8").

### Question 2 — Most Valuable Takeaway
- **Type:** Long text (open-ended)
- **Question:** "What was the most valuable thing you learned today?"
- **Required:** Yes
- **Intelligence:** Exact language for future marketing copy. Their words, not ours.

### Question 3 — Most Useful Section
- **Type:** Multiple choice (single select)
- **Question:** "Which section was most useful?"
- **Options:**
  1. What AI Is
  2. Prompt Engineering
  3. AI Agents & Automation
  4. What's Possible
- **Required:** Yes
- **Intelligence:** Tells us what to expand and what to cut in future workshops.

### Question 4 — Improvement Suggestions
- **Type:** Long text (open-ended)
- **Question:** "What should we add or change?"
- **Required:** No
- **Intelligence:** Curriculum improvement, identifies gaps.

### Question 5 — NPS Score
- **Type:** Linear scale
- **Question:** "How likely are you to recommend this workshop to a colleague?"
- **Scale:** 1 to 10
- **Label left:** "1 = Not likely"
- **Label right:** "10 = Absolutely!"
- **Required:** Yes
- **Intelligence:** NPS tracking. Under 7 = dig into why (follow-up sequence). Over 8 = referral ask trigger.

### Question 6 — Purchase Tracking
- **Type:** Dropdown (single select)
- **Question:** "Did you purchase anything today?"
- **Options:**
  1. Full Workshop ($297)
  2. AI Starter Pack ($497)
  3. Advanced Workshop ($997)
  4. Corporate Training inquiry
  5. Consulting inquiry
  6. Nothing yet
- **Required:** Yes
- **Intelligence:** Tracks conversion rate per product. "Nothing yet" respondents enter objection-handling follow-up sequence.

### Question 7 — Purchase Objection
- **Type:** Dropdown (single select)
- **Question:** "If you didn't purchase, what held you back?"
- **Options:**
  1. Need to think about it
  2. Too expensive
  3. Need manager approval
  4. Didn't see what I needed
  5. Want to try free stuff first
- **Required:** No (only show if Q6 = "Nothing yet" — use Typeform logic jump; in Google Forms, use "Go to section based on answer")
- **Intelligence:** Exact objection data drives automated follow-up. "Need manager approval" → send "Get Your Company to Pay" template. "Too expensive" → send payment plan option. "Need to think about it" → urgency sequence.

### Question 8 — Corporate Team Lead
- **Type:** Multiple choice with conditional fields
- **Question:** "Would you like your company to send your team for AI training?"
- **Options:**
  1. Yes (show follow-up fields for contact name + email)
  2. No
- **Follow-up fields (if Yes):**
  - "Contact name (manager/decision-maker):" — Short text, required if Yes
  - "Their email:" — Email field, required if Yes
- **Required:** Yes
- **Intelligence:** Corporate lead gen on autopilot. "Yes" responses auto-trigger outreach to the named manager via GHL.

### Question 9 — Testimonial Consent
- **Type:** Multiple choice (single select)
- **Question:** "Can we use your feedback as a testimonial?"
- **Options:**
  1. Yes
  2. No
- **Required:** Yes
- **Intelligence:** "Yes" respondents — their Q2 answer becomes a testimonial on the landing page and in ads.

### Question 10 — Open Feedback
- **Type:** Long text (open-ended)
- **Question:** "Anything else you want to tell us?"
- **Required:** No
- **Intelligence:** Catches everything else — surprise insights, specific requests, additional praise/complaints.

---

## TYPEFORM CREATION STEPS (5 minutes)

1. Go to https://admin.typeform.com → **Create new form**
2. Choose **Start from scratch**
3. Set title: "AI Workshop Feedback — How Did We Do?"
4. Add each question above in order (Q1-Q10)
5. For Q7: Add a **Logic Jump** — only show Q7 if Q6 answer = "Nothing yet"
6. For Q8: Add a **Logic Jump** — show contact name/email fields only if Q8 = "Yes"
7. Set the **Thank you screen**: "Thanks for your feedback! Your input helps us make these workshops even better."
8. Under Settings → turn on **Progress bar**
9. **Publish** the form
10. Copy the public URL and paste it below and in this doc above

**After creation:**
- Copy the Typeform URL back into this doc (top of file)
- Set up Typeform → GHL webhook:
  - In Typeform → Connect → Webhooks → add GHL inbound webhook URL
  - Map Q1 (AI skill after) to GHL custom field `ai_skill_after`
  - Map Q5 (NPS) to GHL custom field `workshop_nps`
  - Map Q6 (purchase) to GHL tag
  - Map Q8 (corporate lead) to trigger corporate outreach workflow

---

## GOOGLE FORMS FALLBACK (7 minutes)

If Typeform is not available or costs are a concern ($25/mo), use Google Forms:

1. Go to https://forms.google.com → **Blank form**
2. Set title: "AI Workshop Feedback — How Did We Do?"
3. Add description: "Thanks for attending! This takes about 2 minutes."
4. Add questions Q1-Q10 as specified above
5. For Q7: Use **Go to section based on answer** from Q6 (create a section for Q7 that's only reached when Q6 = "Nothing yet")
6. For Q8: Use sections — "Yes" goes to a section with name/email fields, "No" skips ahead
7. Under Settings: turn off "Collect email addresses" (we already have it from registration)
8. Set confirmation message: "Thanks for your feedback! Your input helps us make these workshops even better."

**Google Forms → GHL integration:**
- Use Google Apps Script or Make.com to forward form responses to GHL via webhook
- Or use Zapier: Google Forms → GHL Update Contact

---

## GHL WEBHOOK INTEGRATION

Once the survey platform is chosen, set up this webhook flow:

```
Survey submitted
  → Webhook fires to GHL
  → Match contact by email (from registration)
  → Update custom fields:
      - ai_skill_after = Q1 value
      - workshop_nps = Q5 value
  → Add tags based on responses:
      - Q6: "purchased:[product]" or "did-not-purchase"
      - Q7: "objection:[reason]" (if applicable)
      - Q8 Yes: "corporate-lead" + create task for outreach
      - Q9 Yes: "testimonial-approved"
  → Move pipeline stage to "Post-Workshop"
  → Trigger follow-up workflows based on tags
```

---

## KEY METRIC: BEFORE/AFTER SKILL GAP

The entire survey pivots on Q1. Combined with the registration form's "AI Skill Self-Assessment" (1-10 before score), this creates:

- **Marketing proof:** "Average attendee improved from 2.3 to 6.8"
- **Individual tracking:** Each contact has before + after scores in GHL
- **Curriculum validation:** If gap is small, the workshop isn't delivering enough value
- **Target:** Average improvement of 3+ points (e.g., 3.0 → 6.5)
