# GHL API Setup Results — Workshop Email/SMS Sequences

**Created:** 2026-03-23
**Location ID:** AVkeTAjBMKyrH5q0f7bQ
**PIT Token:** pit-9c5383fc-800d-463c-a803-0e6401f30b98

---

## Summary

### What Was Done via API

1. **17 Email Templates Created** — All sequence emails with subject lines, preview text, from name (Brandon Calloway), and from email (info@learnandleverageai.com)
2. **5 Custom Values Created** — Merge fields for all sequences (workshop_venue, workshop_date, workshop_time, registration_link, next_workshop_date)
3. **3 Additional Tags Created** — workshop-confirmed, hot-lead, referral-program (added to existing 19 tags, total now 22)
4. **1 Existing Workflow Found** — "Registration Confirmation" (draft) already exists

### What CANNOT Be Done via API (Requires GHL UI)

1. **Workflow Creation** — The GHL API does NOT support creating workflows. Only `GET /workflows/` (list) and `POST /contacts/{id}/workflow/{workflowId}` (add contact to workflow) are available.
2. **Workflow Steps/Actions** — Cannot add email/SMS/wait steps to workflows via API
3. **Workflow Triggers** — Cannot set triggers via API
4. **Email HTML Body Content** — Templates are created as containers; the actual email body HTML must be pasted in the GHL email builder UI
5. **SMS Messages** — No API endpoint for creating SMS templates; must be typed directly into workflow SMS action steps

---

## What Was Created

### Email Templates (17 total)

All templates configured with: From Name: "Brandon Calloway" | From Email: info@learnandleverageai.com

| # | Sequence | Template Name | GHL ID | Subject Line |
|---|----------|--------------|--------|-------------|
| 1 | Lead Nurture | Email 1: The AI Gap Is Real | `69c0e7c650373501dd123d02` | Your coworkers are using AI. Here is what they are not telling you. |
| 2 | Lead Nurture | Email 2: What You Will Walk Away With | `69c0e8028165f5c3560ae591` | 3 things you will have working by the end of the workshop |
| 3 | Lead Nurture | Email 3: The Real Cost of Waiting | `69c0e803d9eb943651045a92` | The professionals who wait on AI are going to regret it |
| 4 | Registration | Confirm: You Are In | `69c0e803d9eb946579045a9a` | You are registered! Here is everything you need for the upcoming workshop |
| 5 | Pre-Workshop | Reminder 1: One Week Away | `69c0e80425ffb17d27ad1fb1` | One week away — here is how to prepare |
| 6 | Pre-Workshop | Reminder 2: Three Days Out | `69c0e80450373597fe123e92` | The workshop is in 3 days — 3 quick things before we start |
| 7 | Pre-Workshop | Reminder 3: See You Tonight | `69c0e80580b0950cddf1b75d` | See you tonight! Here is the address |
| 8 | Post-Workshop | Attendee 1: Thank You + Resources | `69c0e80525ffb1ed8bad1fbc` | Thank you — here are your resources + a quick favor |
| 9 | Post-Workshop | Attendee 2: Monday Challenge | `69c0e806503735b2f0123e9a` | Your Monday morning AI challenge |
| 10 | Post-Workshop | Attendee 3: Testimonial + Offers | `69c0e8078165f5b06f0ae5b6` | Quick question + something for people who want to go deeper |
| 11 | Post-Workshop | Attendee 4: Referral + Next | `69c0e807ffade9295d3a620e` | The next workshop date — and a way to save $50 |
| 12 | No-Show | Email 1: We Missed You | `69c0e8089ca4ba78c273778d` | We missed you — here is what happened |
| 13 | No-Show | Email 2: Last Chance | `69c0e8085c2440410bd8fcc4` | Last call — next AI workshop date coming soon |
| 14 | Upsell | Email 1: AI Starter Pack | `69c0e8092562a8fba2f998a8` | The next step after the workshop (and a question for you) |
| 15 | Upsell | Email 2: Advanced Workshop | `69c0e80ab7369780e952b9b0` | For the 20% who want to go way beyond the basics |
| 16 | Upsell | Email 3: Corporate + Consulting | `69c0e80a8165f5eaf60ae5d4` | Something I do not talk about much (but your company might need) |
| 17 | Referral | Bring a Coworker Save $50 | `69c0e80b8165f568930ae5d6` | Know someone who needs this? You both save $50. |

### Custom Values (Merge Fields)

| Name | Field Key | Current Value | GHL ID |
|------|-----------|---------------|--------|
| workshop_venue | `{{ custom_values.workshop_venue }}` | Hilton Wilmington/Christiana, 100 Continental Dr, Newark, DE 19713 | `uZLoQPfKK47CnlP1qKCX` |
| workshop_date | `{{ custom_values.workshop_date }}` | Thursday, April 2, 2026 | `t7aZYXjhmYJ1NiK7uKVg` |
| workshop_time | `{{ custom_values.workshop_time }}` | 6:00 PM - 8:00 PM EST | `HdkHbgmHUtybfxl3QpJS` |
| registration_link | `{{ custom_values.registration_link }}` | https://learnandleverageai.com/workshops | `IViGcQy0uX6ELlvOiPQ9` |
| next_workshop_date | `{{ custom_values.next_workshop_date }}` | TBA | `2tq7LC3h8zLFYpCTfPFx` |

### Tags (22 total)

| Tag | ID | Purpose |
|-----|----|---------|
| workshop-lead | `84KhhLyO1CgI4n06OAQT` | Master list — any lead captured |
| workshop-registered | `NucGFXbhcWSP4bFq8vr0` | Completed registration |
| workshop-confirmed | `MXGVzmwHciYkEh779C0O` | Opened confirm email or clicked calendar |
| workshop-attended | `uHX6CPSCYzdU1wISE7et` | Checked in at event |
| workshop-no-show | `wcpL1NW3SnctJtzFZbmi` | Registered but did not attend |
| workshop-purchased | `1MtXp24kcZIYy2CW8IqI` | Bought any offering |
| workshop-referrer | `27UkQttBakme10lr9AEo` | Referred someone |
| starter-pack-buyer | `5c0guSwFQvRWfxKmV3nF` | Bought $497 pack |
| advanced-workshop-buyer | `vuPqhixmtRSqb38NHNof` | Bought $997 intensive |
| consulting-lead | `A9TDQmhxL1cLSHF7IKWu` | Consulting inquiry |
| corporate-training-lead | `ewstYpgvpVskH5eaVe40` | Corporate training inquiry |
| hot-lead | `WzWqXuQftTMRtqMvrJkL` | VP/Director + AI skill < 4 |
| vip-director-plus | `HM48eCIwv0HuFvCDgizy` | Director+ title |
| referral-program | `xBbslh6FoNdtMsODWAAJ` | Enrolled in referral program |
| event-registration | `aMT2v7Nb200ynOVAjn26` | Event registration |
| facebook-lead | `ewrWdE3iSLei0WphZzJV` | From Facebook |
| phone-inquiry | `XpPZtdchUPTX8wkMzD4q` | Called in |
| voice-agent | `pvIVeDFN77qb81L3YAYm` | Handled by voice AI |
| llai-connect-form | `gFPWNJuzis21vwXFsNBK` | Connect form submission |
| source:sms | `AdcYmQ8eRGSjXWXZCNt5` | Inbound SMS |
| unknown-industry | `rcCn1u6YUeA0dE3b3OsA` | No industry identified |
| hvac | `yd9pktH8gGWDOAuUj2zN` | HVAC industry |

### Pipeline (Already Existed)

| Pipeline | ID | Stages |
|----------|----|--------|
| Workshop Attendee Journey | `Lb2EtR2nnxlLGRWCwBpD` | New Lead → Registered → Confirmed → Reminded → Attended → Post-Workshop → Customer → Referral |

### Custom Fields (Already Existed — 7 total)

| Field | Type | ID |
|-------|------|----|
| Company | TEXT | `mBsTuAMLk0vzJ3oi8WSw` |
| Job Title | TEXT | `tqoIYZF8Jo3jIe4RUq5S` |
| Workshop Date | TEXT | `aRt37ACv0XK6MmL8kgmZ` |
| Purchased | TEXT | `NFrSKyI4VEIrV1mx63rf` |
| AI Skill Score (Before) | NUMERICAL | `kZhmzNgVM6wxpGziPzgj` |
| AI Skill Score (After) | NUMERICAL | `Rbi0ghsRpGtBJwiLMMIS` |
| Biggest AI Challenge | SINGLE_OPTIONS (7 choices) | `3643VTUlvV9TEJVWmces` |

### Existing Workflow

| Workflow | Status | ID |
|----------|--------|----|
| Registration Confirmation | draft | `34231b88-9276-4988-87f5-f68e1f7662fb` |

---

## GHL API Capabilities Summary

### What the API CAN Do

| Capability | Endpoint | Method |
|-----------|----------|--------|
| List workflows | `GET /workflows/?locationId=` | Read-only |
| Add contact to workflow | `POST /contacts/{id}/workflow/{workflowId}` | Write |
| Remove contact from workflow | `DELETE /contacts/{id}/workflow/{workflowId}` | Write |
| Create email templates | `POST /emails/builder` | Write |
| Update email templates | `PATCH /emails/builder/{id}` | Write |
| List email templates | `GET /emails/builder?locationId=` | Read-only |
| Create/list/update contacts | Full CRUD | Full |
| Create/list custom fields | Full CRUD | Full |
| Create/list/update custom values | Full CRUD | Full |
| Create/list tags | Full CRUD | Full |
| Create/list pipelines + stages | Full CRUD | Full |
| Create/list opportunities | Full CRUD | Full |
| Send email via conversations | `POST /conversations/messages` | Write |
| Send SMS via conversations | `POST /conversations/messages` | Write |
| List/search conversations | `GET /conversations/search` | Read-only |

### What the API CANNOT Do

| Missing Capability | Impact |
|-------------------|--------|
| Create workflows | Must build all 7 workflows in GHL UI |
| Add workflow steps (email, SMS, wait, if/else) | Must configure each step manually in UI |
| Set workflow triggers | Must set triggers in UI |
| Set email HTML body content in templates | Body copy must be pasted into each template in the GHL email builder |
| Create SMS templates | SMS body must be typed into workflow SMS steps |
| Configure Conversation AI | Returns 404 with PIT token |
| Access snapshots | Token not authorized for this scope |

---

## BRANDON: What You Need to Do in GHL UI (~45-60 minutes)

### Step 1: Create 7 Workflows (30 minutes)

Go to **Automation > Workflows > Create Workflow** for each:

#### Workflow 1: Lead Nurture Sequence
- **Trigger:** Tag added = `workshop-lead` AND tag NOT = `workshop-registered`
- **Steps:**
  1. Send Email → Select template "Lead Nurture - Email 1" → Paste body from `docs/ghl-workshop-setup.md` Section 3A
  2. Wait 2 days
  3. Send Email → Select template "Lead Nurture - Email 2" → Paste body
  4. Wait 1 day
  5. Send SMS → Copy SMS text from Section 3A ("Hey {{contact.first_name}}, it's Brandon...")
  6. Wait 2 days
  7. Send Email → Select template "Lead Nurture - Email 3" → Paste body

#### Workflow 2: Registration Confirmation
- **Note:** This workflow already exists in DRAFT (ID: `34231b88-9276-4988-87f5-f68e1f7662fb`). Edit it.
- **Trigger:** Tag added = `workshop-registered`
- **Steps:**
  1. Send Email → Select template "Registration Confirm" → Paste body from Section 3B
  2. Send SMS → Copy SMS text from Section 3B ("You're confirmed for the AI Workshop...")
  3. Add tag: `workshop-confirmed`
  4. Remove from workflow: "Lead Nurture Sequence" (stop nurture once registered)

#### Workflow 3: Pre-Workshop Reminders
- **Trigger:** Tag added = `workshop-registered` (runs parallel to confirmation)
- **Steps:**
  1. Wait until 7 days before workshop date
  2. Send Email → Select template "Pre-Workshop Reminder 1" → Paste body from Section 3C
  3. Wait until 3 days before workshop date
  4. Send Email → Select template "Pre-Workshop Reminder 2" → Paste body
  5. Send SMS → Copy SMS text from Section 3C ("Hey {{contact.first_name}}! AI Workshop is this...")
  6. Wait until day of workshop, 12:00 PM
  7. Send Email → Select template "Pre-Workshop Reminder 3" → Paste body
  8. Send SMS → Copy SMS text ("Today's the day! AI Workshop at...")

#### Workflow 4: Post-Workshop — Attendees
- **Trigger:** Tag added = `workshop-attended`
- **Steps:**
  1. Wait 2 hours
  2. Send Email → Select template "Post-Workshop Attendee 1" → Paste body from Section 3D
  3. Wait 1 hour
  4. Send SMS → Copy SMS text ("Thanks for coming today...")
  5. Wait until Sunday 7 PM
  6. Send Email → Select template "Post-Workshop Attendee 2" → Paste body
  7. Wait 2 days
  8. Send Email → Select template "Post-Workshop Attendee 3" → Paste body
  9. Wait 1 day
  10. Send SMS → Copy SMS text ("Hey {{contact.first_name}}, quick question...")
  11. Wait 3 days
  12. Send Email → Select template "Post-Workshop Attendee 4" → Paste body

#### Workflow 5: Post-Workshop — No-Shows
- **Trigger:** Tag added = `workshop-no-show`
- **Steps:**
  1. Wait until next morning 9:00 AM
  2. Send Email → Select template "No-Show Email 1" → Paste body from Section 3E
  3. Wait 1 day
  4. Send SMS → Copy SMS text ("Hey {{contact.first_name}}, missed you at the AI workshop...")
  5. Wait 2 days
  6. Send Email → Select template "No-Show Email 2" → Paste body

#### Workflow 6: Upsell Sequence
- **Trigger:** 7 days after tag `workshop-attended` added AND tag NOT = `workshop-purchased`
- **Steps:**
  1. Send Email → Select template "Upsell Email 1" → Paste body from Section 3F
  2. Wait 1 day
  3. Send SMS → Copy SMS text ("Hey {{contact.first_name}}, been using AI this week?...")
  4. Wait 2 days
  5. Send Email → Select template "Upsell Email 2" → Paste body
  6. Wait 4 days
  7. Send Email → Select template "Upsell Email 3" → Paste body

#### Workflow 7: Referral Program
- **Trigger:** 5 days after tag `workshop-attended` added
- **Steps:**
  1. Send Email → Select template "Referral Email" → Paste body from Section 3G
  2. Send SMS → Copy SMS text ("Hey {{contact.first_name}}! If you know anyone...")
  3. Add tag: `referral-program`

### Step 2: Paste Email Body Content (15 minutes)

For each email template listed above, open it in the GHL email builder and paste the body content from `docs/ghl-workshop-setup.md`. The template already has:
- Subject line (set via API)
- Preview text (set via API)
- From name: Brandon Calloway (set via API)
- From email: info@learnandleverageai.com (set via API)

You just need to paste the body text. All copy is in `docs/ghl-workshop-setup.md`, Sections 3A through 3G.

**Important:** Date references have been removed from subject lines. The body copy in ghl-workshop-setup.md still references "Thursday" and specific dates — when pasting, replace:
- "Thursday, {{custom.workshop_date}}" → "{{custom.workshop_date}}"
- "Thursday evening" → "the upcoming workshop evening"
- "this Thursday" → "the workshop date"
- Any specific April 2 references → use merge field `{{ custom_values.workshop_date }}`

### Step 3: Update Custom Values When Venue is Confirmed

Once the venue is confirmed, update these via API or UI:

```bash
# Update workshop_venue
curl -X PUT "https://services.leadconnectorhq.com/locations/AVkeTAjBMKyrH5q0f7bQ/customValues/uZLoQPfKK47CnlP1qKCX" \
  -H "Authorization: Bearer pit-9c5383fc-800d-463c-a803-0e6401f30b98" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{"name":"workshop_venue","value":"Hilton Christiana, 100 Continental Dr, Newark, DE 19713"}'

# Update workshop_date
curl -X PUT "https://services.leadconnectorhq.com/locations/AVkeTAjBMKyrH5q0f7bQ/customValues/t7aZYXjhmYJ1NiK7uKVg" \
  -H "Authorization: Bearer pit-9c5383fc-800d-463c-a803-0e6401f30b98" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{"name":"workshop_date","value":"Thursday, April 2, 2026"}'
```

### Step 4: Activate Workflows

After building all 7 workflows, toggle each from "Draft" to "Published" in the GHL UI.

---

## Notes

- **Date references removed:** All email subject lines use generic language ("the upcoming workshop," "the workshop date") instead of specific dates. Body copy merge fields will auto-populate from custom values.
- **Merge fields:** Use `{{ custom_values.workshop_date }}` for location-level values (same for all contacts) and `{{contact.first_name}}` for contact-level fields.
- **The email templates show as "New Template" in the API list endpoint** — this is a GHL API display bug. The names ARE set correctly (confirmed via individual PATCH responses) and will show correctly in the GHL UI.
- **One orphan template archived:** ID `69c0e7dc5c24401b32d8fbe6` was a test template, now archived.
