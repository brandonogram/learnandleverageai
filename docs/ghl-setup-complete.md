# GHL Setup Complete — LearnAndLeverageAI

**Date:** 2026-03-22
**Session:** Automated via Chrome CDP + Playwright
**Sub-Account:** LearnAndLeverageAI (Location: AVkeTAjBMKyrH5q0f7bQ)

---

## Summary of What Was Done

### 1. Sub-Account Access (DONE)
- Successfully navigated to LLAI sub-account at `https://app.gohighlevel.com/v2/location/AVkeTAjBMKyrH5q0f7bQ/dashboard`
- Dashboard loaded with "Workshop Attendee Journey" pipeline already visible
- All sidebar navigation items confirmed: Dashboard, Conversations, Calendars, Contacts, Opportunities, Payments, AI Agents, Marketing, Automation, Sites, Settings

### 2. AI Employee / AI Agents (CONFIRMED AVAILABLE)
- AI Agents section is fully available at `/ai-agents/getting-started`
- Sub-sections visible: Getting Started, Agent Studio, Voice AI, Conversation AI, Knowledge Base, Agent Templates, Content AI, Agent Logs
- Getting Started page shows 3 steps: Create Voice AI Agent, Test & Talk, Assign Phone Number & Go Live
- **Status:** AI Agents feature is enabled and ready to use

### 3. Phone Number Import (BLOCKED — Manual Step Required)
- Navigated to Settings > Phone System
- Current state: No phone numbers assigned to LLAI sub-account ("No Data")
- GHL only offers "Buy your Number" — there is NO "Import existing number" option in the UI
- The Twilio number +1 (302) 416-6285 cannot be imported through the GHL phone system UI
- **Brandon must:** Either buy a new number through GHL ($1.15/mo) OR configure the Twilio number at the agency level to forward to GHL

### 4. Workshop Registration Form (CREATED)
- **Form Name:** Workshop Registration
- **Form ID:** `dE4oVlJbNmJccm6PsFBW`
- **Form URL:** `https://app.gohighlevel.com/v2/location/AVkeTAjBMKyrH5q0f7bQ/form-builder-v2/dE4oVlJbNmJccm6PsFBW`
- **Embed URL:** `https://link.learnandleverageai.com/widget/form/dE4oVlJbNmJccm6PsFBW` (derived)

#### Fields Added (7 total + consent + submit):
| # | Field | Type | Source |
|---|-------|------|--------|
| 1 | First Name | Text (standard) | Contact > CONTACT |
| 2 | Last Name | Text (standard) | Contact > CONTACT |
| 3 | Phone | Phone (standard, required) | Default field |
| 4 | Email | Email (standard, required) | Default field |
| 5 | Company | Text (custom) | Contact > ADDITIONAL INFO |
| 6 | Job Title | Text (custom) | Contact > ADDITIONAL INFO |
| 7 | AI Skill Score (Before) | Number (custom) | Contact > ADDITIONAL INFO |
| 8 | Biggest AI Challenge | Dropdown (custom) | Contact > ADDITIONAL INFO |
| 9 | T&C Consent | Checkbox (default) | Auto-included |
| 10 | Submit Button | Button (default) | Auto-included |

**Note:** The original spec asked for a "Full Name" single field, but GHL's contact object uses First Name + Last Name separately, which is better for CRM personalization (allows `{{contact.first_name}}` in emails/SMS). The form has both.

**Field order needs adjustment:** Fields were added via drag-and-drop and may not be in ideal order. Brandon should reorder them in the form builder to: First Name, Last Name, Email, Phone, Company, Job Title, AI Skill Score, Biggest AI Challenge.

### 5. Registration Confirmation Workflow (CREATED)
- **Workflow Name:** Registration Confirmation
- **Workflow URL:** `https://app.gohighlevel.com/location/AVkeTAjBMKyrH5q0f7bQ/workflow/34231b88-9276-4988-87f5-f68e1f7662fb`
- **Status:** Draft (not published — needs review before going live)

#### Workflow Structure:
```
TRIGGER: Form Submitted
  Filter: Form is any of "Workshop Registration"
    |
    v
ACTION 1: Send Email
  From: Brandon Calloway <info@learnandleverageai.com>
  Subject: "You are registered! Here is everything you need for the workshop"
  Pre-Header: "Calendar invite attached. Here is what to bring."
  Body: Registration confirmation with workshop details, what to bring, what to expect
    |
    v
ACTION 2: Send SMS
  Body: "You're confirmed for the AI Workshop on April 2 at 6:00 PM!
  Location: Wilmington, DE. Bring your laptop + charger.
  I'll send a reminder the day before. — Brandon"
    |
    v
END
```

### 6. Screenshots Saved
All screenshots saved to `/tmp/ghl-setup-*.png` (85+ screenshots documenting every step)

Key screenshots:
- `/tmp/ghl-setup-01-current.png` — LLAI Dashboard
- `/tmp/ghl-setup-04-after-close.png` — AI Agents page
- `/tmp/ghl-setup-07-phone-system.png` — Phone System (no numbers)
- `/tmp/ghl-setup-51-all-fields.png` — Form with all fields added
- `/tmp/ghl-setup-74-trigger-saved.png` — Workflow trigger configured
- `/tmp/ghl-setup-85-workflow-complete.png` — Complete workflow with Email + SMS

---

## What Brandon Needs to Do

### Immediate (5 minutes):
1. **Review the form field order** — Open the form builder and drag fields into the preferred order
2. **Review the email content** — Click the Email action in the workflow to verify/edit the copy
3. **Review the SMS content** — Click the SMS action to verify/edit the copy
4. **Publish the workflow** — Toggle from "Draft" to "Publish" when ready

### Phone Number (still needed):
- Option A: Buy a GHL number through Settings > Phone System > Add Number ($1.15/mo)
- Option B: Configure Twilio forwarding at the agency level
- Option C: Port the Twilio number to GHL (longer process)

### Before Going Live:
1. Set up email sending domain (verify `learnandleverageai.com` for email deliverability)
2. Test the form by submitting a test entry
3. Verify the workflow triggers correctly
4. If using SMS, ensure a phone number is assigned and A2P messaging is compliant

---

## Technical Details

- **GHL Location ID:** AVkeTAjBMKyrH5q0f7bQ
- **GHL PIT Token:** pit-9c5383fc-800d-463c-a803-0e6401f30b98
- **Form ID:** dE4oVlJbNmJccm6PsFBW
- **Workflow ID:** 34231b88-9276-4988-87f5-f68e1f7662fb
- **Browser Session:** Chrome CDP at localhost:9222 (still active, do not close)
