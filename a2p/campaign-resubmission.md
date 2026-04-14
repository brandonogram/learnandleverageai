# A2P Campaign Resubmission — Learn & Leverage AI

> **Date:** April 13, 2026
> **Brand:** Dude Ventures Services, LLC (d/b/a Learn & Leverage AI)
> **Platform:** GHL Trust Center at app.boothlaunchpad.com

---

## What to Change in GHL Trust Center

Go to: **Settings > Phone System > Trust Center > Brands & Campaigns > [Campaign] > Edit**

---

## 1. Campaign Use Case Description (40-4096 chars)

Copy this exactly:

```
Learn & Leverage AI, operated by Dude Ventures Services LLC (doing business as Learn & Leverage AI), sends SMS messages to individuals who have opted in through our website. Messages include workshop confirmations, event reminders, venue details, and customer support responses. Recipients opt in by visiting our SMS opt-in page at https://learnandleverageai.com/sms-opt-in, entering their phone number, and selecting one or both optional SMS consent checkboxes. Each checkbox is unchecked by default and is not required to submit the form. The opt-in page displays full program disclosures including message types, frequency, data rates, and opt-out instructions. Privacy Policy: https://learnandleverageai.com/privacy. Terms of Service: https://learnandleverageai.com/terms. We do not share, sell, or transfer opt-in data to third parties for marketing or promotional purposes.
```

---

## 2. Message Flow / How do Contacts Opt-in to Messages? (40-2049 chars)

Copy this exactly:

```
Customers opt in to receive SMS messages by visiting our dedicated opt-in page at https://learnandleverageai.com/sms-opt-in. On this page, they enter their phone number and may select one or both optional consent checkboxes: (1) a non-marketing checkbox to receive workshop reminders, event updates, and registration confirmations, and (2) a marketing checkbox to receive promotional messages about new workshops and offers. Both checkboxes are unchecked by default and are optional — the form can be submitted without selecting either. After opting in, customers see a confirmation screen with program details. All messages include the brand name "Learn & Leverage AI" and opt-out instructions. Customers can opt out at any time by replying STOP to any message.
```

---

## 3. Opt-in Message (confirmation sent after opt-in)

```
Learn & Leverage AI: You're signed up for SMS updates. Msg frequency varies. Msg & data rates may apply. Reply HELP for help, STOP to opt out. https://learnandleverageai.com/privacy
```

---

## 4. Sample Messages (paste each as a separate sample)

### Sample Message 1 — Workshop Confirmation
```
Learn & Leverage AI: Hi [Name], you're confirmed for the AI workshop on [Date] at [Venue Address]. Bring your laptop. Questions? Reply here or call (302) 416-6285. Reply STOP to opt out.
```

### Sample Message 2 — Workshop Reminder
```
Learn & Leverage AI: Reminder — your AI workshop is tomorrow at [Time]. [Venue Name], [City] DE. Bring your laptop and charger. Need to cancel? Reply to this message. Reply STOP to unsubscribe.
```

### Sample Message 3 — Follow-up / Support
```
Learn & Leverage AI: Thanks for attending the workshop, [Name]. Your workbook and resources are at https://learnandleverageai.com/resources. Questions? Reply here or email info@learnandleverageai.com.
```

---

## 5. Opt-in Method

Select: **Website**

---

## 6. Opt-in Image URL

```
https://learnandleverageai.com/sms-opt-in
```

(GHL's AI compliance checker will crawl this page directly. Make sure the latest code is deployed before resubmitting.)

---

## 7. HELP Response (configure in GHL phone settings)

```
Learn & Leverage AI: For help, contact us at (302) 416-6285 or info@learnandleverageai.com. To stop messages, reply STOP. Msg & data rates may apply.
```

## 8. STOP Response (configure in GHL phone settings)

```
Learn & Leverage AI: You've been unsubscribed and will no longer receive messages from us. Reply START to re-subscribe.
```

---

## Brand Registration Reminders

Verify these haven't changed since last submission:

| Field | Value |
|-------|-------|
| Legal Business Name | Dude Ventures Services, LLC |
| EIN | 39-2424965 |
| Business Type | Limited Liability Corporation |
| Industry | EDUCATION |
| Website URL | https://LearnAndLeverageAI.com |
| Business Email | info@learnandleverageai.com |
| Street Address | 8 The Green STE B |
| City | Dover |
| State | DE |
| ZIP | 19901 |

---

## Changes from Previous (Rejected) Submission

| What Changed | Old (Rejected) | New (Fixed) |
|-------------|----------------|-------------|
| Opt-in URL | /workshops (no phone field, no SMS consent) | /sms-opt-in (dedicated opt-in page with full compliance) |
| Checkbox required? | "required SMS consent checkbox" | Both checkboxes optional, unchecked by default |
| Marketing checkbox disclosures | Missing frequency/rates/STOP/HELP | Full CTIA disclosures included |
| DBA disclosure | Not mentioned | "Dude Ventures Services LLC (doing business as Learn & Leverage AI)" |
| Campaign description | Referenced /workshops form | References /sms-opt-in with full opt-in flow description |
| sms_consent in API | Always sent as `true` | Only `true` when checkbox is checked |
| Sample message URLs | No HTTPS prefix | Full HTTPS URLs included |
