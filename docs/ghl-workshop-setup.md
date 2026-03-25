# GHL Workshop Setup: LearnAndLeverageAI

**Created:** 2026-03-21
**Purpose:** Complete GHL sub-account configuration, pipeline, email/SMS sequences, and chatbot training for the in-person AI workshop business.
**Status:** Ready for implementation

---

## Table of Contents

1. [GHL Sub-Account Status & Setup](#1-ghl-sub-account-status--setup)
2. [Pipeline Design (8 Stages)](#2-pipeline-design-8-stages)
3. [Email/SMS Sequences (All Copy)](#3-emailsms-sequences-all-copy)
   - 3A. Lead Nurture (3 emails, 1 SMS)
   - 3B. Registration Confirmation (1 email, 1 SMS)
   - 3C. Pre-Workshop Reminders (3 emails, 2 SMS)
   - 3D. Post-Workshop for Attendees (4 emails, 2 SMS)
   - 3E. Post-Workshop for No-Shows (2 emails, 1 SMS)
   - 3F. Upsell Sequence (3 emails, 1 SMS)
   - 3G. Referral Program (1 email, 1 SMS)
4. [Chatbot / Conversation AI Training Document](#4-chatbot--conversation-ai-training-document)
5. [Implementation Checklist](#5-implementation-checklist)

---

## 1. GHL Sub-Account Status & Setup

### Existing Sub-Accounts (6 confirmed)

| # | Name | Location ID | PIT Token | Status |
|---|------|------------|-----------|--------|
| 1 | WorkHardAI.com | QQDvReRmpgEKT36KdQaw | pit-420f0b60-... | Active |
| 2 | Call2Calendar | ASWu8vCR1BtyoXrxuD61 | pit-a5fce109-... | Active |
| 3 | PoolCleaningDude | GRCLPh6B7KwWCf8PRIUt | pit-7cbfd383-... | Active |
| 4 | Tri-State Aquatic | A0e67CElQk4EoVK0XY2K | pit-c403ee83-... | Active (empty response) |
| 5 | Christmas Lights Dude | vhKlz2Ta8FcfxHQbv70t | pit-0372d099-... | Active |
| 6 | 302 Photo Booth | Y3PMWBSLuLOXMQLs4qhV | pit-3f64af0b-... | Active (empty response) |

### LearnAndLeverageAI Sub-Account: DOES NOT EXIST

**No sub-account exists for LearnAndLeverageAI.** PIT tokens are location-scoped, so we cannot search across the agency from existing tokens. None of the 6 existing sub-accounts are for LLAI.

### What Brandon Needs to Create (5 minutes in GHL dashboard)

1. **Log into GHL agency account** at app.gohighlevel.com
2. **Settings > Sub-Accounts > Create Sub-Account**
3. **Sub-account details:**
   - **Name:** LearnAndLeverageAI
   - **Email:** brandon@learnandleverageai.com (or brandonbot67@gmail.com)
   - **Phone:** (302) 416-6285 (or dedicated workshop number)
   - **Address:** 8 The Green, Ste B, Dover, DE 19901
   - **Website:** https://learnandleverageai.com
   - **Timezone:** America/New_York (EST)
   - **Industry:** Education / Training
4. **After creation:** Generate a Private Integration Token (PIT) for API access
   - Settings > Integrations > Private Integrations > Create
   - Name: "Claude Code Automation"
   - Grant all scopes (contacts, opportunities, workflows, calendars, conversations)
   - Copy the PIT token
5. **Provide Claude Code with:**
   - Location ID (visible in URL after creation)
   - PIT token
   - Both get added to `~/shared-brain/CREDENTIALS.md`

### Alternative: Repurpose WorkHardAI Sub-Account

If Brandon prefers not to create a new sub-account (GHL plan limits), the WorkHardAI sub-account could be repurposed since it shares the same email and phone. However, a dedicated sub-account is strongly recommended to keep workshop contacts, pipelines, and automations cleanly separated.

---

## 2. Pipeline Design (8 Stages)

### Pipeline Name: "Workshop Attendee Journey"

```
Stage 1: New Lead
  └─ Trigger: Visits landing page, signs up for email list, or captured via Meta ad
  └─ Action: Enters Lead Nurture sequence (3 emails + 1 SMS)

Stage 2: Registered
  └─ Trigger: Completes registration form on /workshops page
  └─ Action: Registration Confirmation (1 email + 1 SMS with calendar invite)
  └─ Action: Enters Pre-Workshop Reminder sequence

Stage 3: Confirmed
  └─ Trigger: Opens confirmation email OR clicks calendar invite link
  └─ Action: Tagged "confirmed" — higher priority for reminder sequence

Stage 4: Reminded
  └─ Trigger: Pre-Workshop Reminder sequence completed (all 3 emails + 2 SMS sent)
  └─ Action: Await workshop day

Stage 5: Attended
  └─ Trigger: Manually marked by Brandon at check-in OR QR code scan
  └─ Action: Enters Post-Workshop Attendee sequence (4 emails + 2 SMS)
  └─ Action: Post-workshop survey sent 2 hours after workshop ends

Stage 6: Post-Workshop
  └─ Trigger: Post-workshop sequence in progress
  └─ Action: Survey data collected, testimonial requested, referral ask sent
  └─ Note: Contacts NOT marked "Attended" get the No-Show sequence instead

Stage 7: Customer
  └─ Trigger: Stripe webhook — purchased AI Starter Pack, Advanced Workshop, or Consulting
  └─ Action: Tagged with product purchased
  └─ Action: Enters Upsell sequence for NEXT tier (if applicable)
  └─ Action: Removed from generic follow-up sequences

Stage 8: Referrer
  └─ Trigger: Referred someone who registers (tracked via referral code or UTM)
  └─ Action: $50 credit applied
  └─ Action: Thank-you notification sent
  └─ Action: Tagged "referrer" for VIP treatment
```

### Pipeline Stages (GHL Configuration)

| Position | Stage Name | Show in Funnel | Show in Pie Chart |
|----------|-----------|----------------|-------------------|
| 0 | New Lead | Yes | Yes |
| 1 | Registered | Yes | Yes |
| 2 | Confirmed | Yes | Yes |
| 3 | Reminded | Yes | Yes |
| 4 | Attended | Yes | Yes |
| 5 | Post-Workshop | Yes | Yes |
| 6 | Customer | Yes | Yes |
| 7 | Referrer | Yes | Yes |

### Additional Stages (Loss Tracking)

| Position | Stage Name | Show in Funnel | Show in Pie Chart |
|----------|-----------|----------------|-------------------|
| 8 | No-Show | Yes | Yes |
| 9 | Unresponsive | Yes | No |
| 10 | Opted Out | No | No |

### Contact Tags Strategy

| Tag | Applied When | Purpose |
|-----|-------------|---------|
| `workshop-lead` | Any lead captured | Master list |
| `registered-[DATE]` | Registration completed | Track per-workshop |
| `confirmed` | Opened confirmation or clicked calendar | Show rate prediction |
| `attended-[DATE]` | Checked in at event | Segment for follow-up |
| `no-show-[DATE]` | Registered but did not attend | Rescue sequence |
| `purchased-starter-pack` | Bought $497 pack | Revenue tracking |
| `purchased-advanced` | Bought $997 intensive | Revenue tracking |
| `purchased-corporate` | Corporate training deal | Revenue tracking |
| `purchased-consulting` | Consulting engagement | Revenue tracking |
| `referrer` | Referred at least 1 person | VIP treatment |
| `corporate-lead` | Director/VP title or team interest | High-value pipeline |
| `ai-skill-[1-10]` | Self-assessment score | Curriculum customization |
| `challenge-[type]` | Biggest challenge selection | Sales follow-up |
| `hot-lead` | VP/Director title + AI skill < 4 | Priority outreach |

### Custom Fields (Contact Record)

| Field Name | Type | Purpose |
|-----------|------|---------|
| Company Name | Text | Employer identification |
| Job Title | Text | Seniority signal |
| AI Skill Before | Number (1-10) | Pre-workshop self-assessment |
| AI Skill After | Number (1-10) | Post-workshop self-assessment (from Typeform) |
| Biggest Challenge | Dropdown | Registration form Q7 |
| Workshop Date | Date | Which session they registered for |
| Referral Source | Text | How they heard about us |
| Referral Code | Text | Their unique referral code |
| Purchase History | Multi-select | What they have bought |
| NPS Score | Number (1-10) | Post-workshop survey |
| Corporate Contact Name | Text | From post-survey Q8 |
| Corporate Contact Email | Email | From post-survey Q8 |

---

## 3. Email/SMS Sequences (All Copy)

**Brand voice guidelines:**
- From Brandon personally (not "LearnAndLeverageAI" or "our team")
- Knowledgeable but accessible — no jargon
- Practical and outcome-focused
- Conversational, like a smart friend explaining something
- Short paragraphs, direct language
- Always end with a clear next step

**Merge fields used:**
- `{{contact.first_name}}` — First name
- `{{contact.company_name}}` — Company name
- `{{custom.workshop_date}}` — Workshop date
- `{{custom.workshop_time}}` — Workshop time
- `{{custom.workshop_venue}}` — Venue name and address
- `{{custom.registration_link}}` — Registration URL
- `{{custom.zoom_link}}` — N/A (in-person)
- `{{custom.referral_code}}` — Unique referral code

---

### 3A. Lead Nurture Sequence (3 Emails + 1 SMS)

**Trigger:** Contact enters "New Lead" stage (captured via landing page email list, Meta ad, or organic)
**Goal:** Educate about the workshop value and drive registration for the free Thursday evening session
**Timing:** Email 1 immediately, Email 2 at +2 days, SMS at +3 days, Email 3 at +5 days

---

#### Lead Nurture — Email 1: "The AI Gap Is Real"
**Send:** Immediately after capture
**Subject:** Your coworkers are using AI. Here is what they are not telling you.
**Preview text:** It is not about being "tech-savvy" — it is about knowing where to start.

---

Hi {{contact.first_name}},

I want to share something I keep hearing from professionals just like you.

Last month, a VP at a major bank here in Delaware told me: "I know AI matters, but I don't even know the difference between ChatGPT and Claude. I feel like everyone else figured this out except me."

She is not alone. I hear some version of this every single week.

Here is the truth: most people who say they "use AI" are doing the bare minimum. They have typed a few questions into ChatGPT and called it a day. That is not using AI — that is Googling with extra steps.

The real advantage comes from knowing how to make AI work for YOUR specific job. And that is a skill you can learn in a few hours, not a few months.

I run 5 businesses almost entirely on AI. Not because I am some tech genius — because I learned the right frameworks and applied them to real work.

I am hosting a free, hands-on workshop here in Wilmington where I will teach you exactly how to do the same thing. No slides full of buzzwords. You will walk out with 3 AI tools actually working for your job.

**Thursday, {{custom.workshop_date}} | 6:00 PM - 8:00 PM | {{custom.workshop_venue}}**

[Register for free — limited to 25 seats]({{custom.registration_link}})

This is not a webinar. Not a sales pitch. You sit down, open your laptop, and I walk you through it step by step.

Talk soon,
Brandon

P.S. — Bring your work laptop. You will need it.

---

#### Lead Nurture — Email 2: "What You Will Actually Walk Away With"
**Send:** +2 days after Email 1
**Subject:** 3 things you will have working by Thursday evening
**Preview text:** This is not a lecture. You leave with tools running.

---

Hi {{contact.first_name}},

People ask me what they will actually get out of the workshop. Fair question — there are a lot of AI events that are all talk and no action.

Here is what you will have working on your laptop before you leave the room:

**1. An AI assistant that knows your job.**
Not a generic chatbot. I will show you how to set up ChatGPT or Claude with context about YOUR role, YOUR industry, and YOUR daily tasks. You will ask it to draft an email, analyze data, or summarize a document — and it will actually be good.

**2. A prompt library for your specific work.**
Most people get bad results from AI because they ask bad questions. I will give you a framework for writing prompts that get useful output every time. You will practice on real tasks from your actual job during the workshop.

**3. One automation that saves you time every week.**
I will show you how to connect AI to your existing workflow — whether that is summarizing meeting notes automatically, generating reports, or handling repetitive email. You will set it up in the room and take it home working.

This is the workshop I wish existed when I started. No theory. No hype. Just practical skills you use Monday morning.

**Thursday, {{custom.workshop_date}} | 6:00 PM - 8:00 PM | {{custom.workshop_venue}}**
**Free. 25 seats. Coffee and snacks included.**

[Save my spot]({{custom.registration_link}})

— Brandon

---

#### Lead Nurture — SMS 1: "Quick Invite"
**Send:** +3 days after capture
**Message:**

Hey {{contact.first_name}}, it's Brandon from LearnAndLeverageAI. I'm hosting a free hands-on AI workshop in Wilmington on {{custom.workshop_date}} — no tech experience needed. You'll walk out with 3 AI tools working for your job. Only 25 seats. Want me to save you a spot? {{custom.registration_link}}

---

#### Lead Nurture — Email 3: "The Real Cost of Waiting"
**Send:** +5 days after capture
**Subject:** The professionals who wait on AI are going to regret it
**Preview text:** This is not about replacing you. It is about what happens if you do not adapt.

---

Hi {{contact.first_name}},

I am going to be blunt with you because I think you can handle it.

AI is not coming for your job. But someone who knows how to use AI might.

McKinsey released a study showing that professionals who use AI effectively are 40% more productive than those who do not. That is not a small edge — that is the difference between getting promoted and getting managed out.

The good news? The bar is still incredibly low. Most people at your company are not using AI at all, or they are using it badly. If you spend 2 hours learning how to use it properly, you will be ahead of 90% of your colleagues.

That is exactly what this workshop is designed to do.

I have spent the last 2 years building businesses almost entirely on AI — a voice agent company, a content creation platform, multiple service businesses. I have made every mistake so you do not have to.

On {{custom.workshop_date}}, I am bringing everything I have learned into a room with 25 professionals and walking you through it hands-on.

**It is free. You just have to show up.**

Here is what we will cover:
- What AI actually is (and is not) — in plain English
- How to write prompts that get useful results on the first try
- AI agents and automation — the stuff that saves real time
- Build your personal AI toolkit — 3 tools set up and working before you leave

[Register here — only a few seats left]({{custom.registration_link}})

If your company wants you to learn AI but has not given you any training, this is the answer. I even have a template email you can forward to your manager to get this counted as professional development.

See you Thursday,
Brandon

---

### 3B. Registration Confirmation (1 Email + 1 SMS)

**Trigger:** Contact completes registration form (moves to "Registered" stage)
**Goal:** Confirm registration, deliver calendar invite, set expectations, reduce no-show risk
**Timing:** Immediately after registration

---

#### Registration Confirm — Email 1: "You're In"
**Send:** Immediately
**Subject:** You are registered! Here is everything you need for {{custom.workshop_date}}
**Preview text:** Calendar invite attached. Here is what to bring.

---

Hi {{contact.first_name}},

You are officially registered for the AI Hands-On Workshop. I am looking forward to meeting you.

Here are the details:

**What:** AI Hands-On: Walk Out With 3 Tools Working For Your Job
**When:** {{custom.workshop_date}}, 6:00 PM - 8:00 PM EST
**Where:** {{custom.workshop_venue}}
**Cost:** Free
**Parking:** Available on-site (free)

**Add to your calendar:** [Click here to add this event to Google Calendar / Outlook / Apple Calendar]

---

**What to bring:**

1. **Your work laptop** (fully charged) — you will be setting up AI tools during the session
2. **A charger** — we will have power strips, but bring your own just in case
3. **A specific work task** you want AI help with — we will use real examples from your job during the exercises
4. **An open mind** — no tech experience required, I promise

**What is provided:**

- Printed workbook with all exercises
- Coffee, water, and light snacks
- Wi-Fi (you will need it — we use AI tools live)
- Resource guide with QR codes to every tool we cover

---

**What to expect:**

- **First Hour:** What AI actually is — demystified, no buzzwords. Live demos. Then prompt engineering for YOUR job — hands-on exercises with your real tasks.
- **Second Hour:** AI agents and automation — see how AI handles repetitive work (I will demo my own tools). Then build your toolkit — you set up AI tools on your laptop. You leave with them working.

This is a small group (25 people max) so you will get individual attention. If you get stuck on anything, I will be right there to help.

**One favor:** If something comes up and you cannot make it, please let me know so I can give your seat to someone on the waitlist. Just reply to this email.

See you on {{custom.workshop_date}},
Brandon

P.S. — Wondering if your company will cover this as professional development? I attached a template email you can forward to your manager. Even though the workshop is free, it helps to have it on record.

---

**[Attachment: "Get Your Company to Pay" email template — see Section 4D of PRD]**

---

#### Registration Confirm — SMS 1: "Confirmed"
**Send:** Immediately after registration
**Message:**

You're confirmed for the AI Workshop on {{custom.workshop_date}} at 6:00 PM! Location: {{custom.workshop_venue}}. Bring your laptop + charger. I'll send a reminder the day before. — Brandon

---

### 3C. Pre-Workshop Reminders (3 Emails + 2 SMS)

**Trigger:** Time-based from registration date, counting down to workshop date
**Goal:** Maximize show rate. Target: 70%+ of registered attendees show up.
**Timing:** 7 days before, 3 days before, morning-of

---

#### Pre-Workshop Reminder — Email 1: "One Week Away"
**Send:** 7 days before workshop
**Subject:** One week from Thursday — here is how to prepare
**Preview text:** A quick 5-minute prep task that will make the workshop 10x more useful for you.

---

Hi {{contact.first_name}},

The workshop is one week from this Thursday. Quick update and one thing you can do now to get more out of it.

**Your prep task (5 minutes):**

Think of 2-3 tasks you do at work every week that feel repetitive, tedious, or time-consuming. Write them down. Examples:

- Summarizing meeting notes
- Drafting status update emails
- Reviewing long documents
- Creating reports from data
- Writing proposals or SOWs
- Responding to common client questions

We are going to use YOUR actual tasks as practice material during the workshop. The more specific you are, the more useful the output will be.

You do not need to do anything else. I handle the rest.

**Quick logistics:**
- **Date:** {{custom.workshop_date}}, 6:00 PM - 8:00 PM
- **Location:** {{custom.workshop_venue}}
- **Bring:** Laptop + charger + those 2-3 tasks you wrote down
- **Parking:** Free, on-site

See you soon,
Brandon

---

#### Pre-Workshop Reminder — Email 2: "Three Days Out"
**Send:** 3 days before workshop
**Subject:** This Thursday — 3 quick things before we start
**Preview text:** Parking info, what to expect, and the one thing most people forget.

---

Hi {{contact.first_name}},

We are 3 days out. Here is what you need to know:

**1. Log in to your AI tools BEFORE Thursday.**
If you already have a ChatGPT or Claude account, make sure you can log in. If you do not have one yet, no worries — I will walk you through setup in the first 15 minutes. But having an account ready saves time.

- ChatGPT: https://chat.openai.com (free account works)
- Claude: https://claude.ai (free account works)

**2. Parking and arrival.**
{{custom.workshop_venue}} has free parking. Doors open at 5:45 PM. We start promptly at 6:00 PM. Grab coffee when you arrive — it is on me.

**3. The thing most people forget: bring a charger.**
We will have power strips at every table, but your laptop will be working hard for 2 hours. Bring your charger.

I have been doing these workshops for a while now, and the people who get the most out of them are the ones who come with a specific problem they want AI to solve. Even if it is just "I spend 2 hours a week on status update emails" — that is enough for us to work with.

Looking forward to it,
Brandon

---

#### Pre-Workshop Reminder — SMS 1: "3 Days Out"
**Send:** 3 days before workshop
**Message:**

Hey {{contact.first_name}}! AI Workshop is this Thursday at 6:00 PM, {{custom.workshop_venue}}. Quick reminder: bring your laptop + charger. If you can, log into ChatGPT or Claude beforehand (free accounts work). See you there! — Brandon

---

#### Pre-Workshop Reminder — Email 3: "Day Of"
**Send:** Day of workshop, 12:00 PM
**Subject:** See you tonight! Here is the address
**Preview text:** Doors open at 5:45 PM. Coffee is ready.

---

Hi {{contact.first_name}},

Today is the day! Here is everything you need:

**Address:** {{custom.workshop_venue}}
**Doors open:** 5:45 PM
**We start:** 6:00 PM sharp
**Bring:** Laptop, charger, and those work tasks you want AI help with

I will be there setting up early. If you have any trouble finding the room, just text me at (302) 416-6285.

The Wi-Fi network and password will be on a card at your seat.

See you soon,
Brandon

---

#### Pre-Workshop Reminder — SMS 2: "Day Of"
**Send:** Day of workshop, 12:00 PM
**Message:**

Today's the day! AI Workshop at {{custom.workshop_venue}}, doors at 5:45 PM, start at 6:00 PM. Bring laptop + charger. Text me at (302) 416-6285 if you need help finding us. See you tonight! — Brandon

---

### 3D. Post-Workshop Sequence — Attendees (4 Emails + 2 SMS)

**Trigger:** Contact marked "Attended" (moves to "Post-Workshop" stage)
**Goal:** Deliver resources, collect testimonial, ask for referral, present upsell offers
**Timing:** 2 hours after, +1 day, +3 days, +7 days

---

#### Post-Workshop Attendee — Email 1: "Thank You + Resources"
**Send:** 2 hours after workshop ends (approx. 10:00 PM same day)
**Subject:** Thank you — here are your resources + a quick favor
**Preview text:** Slides, prompt library, tool links, and a 2-minute survey.

---

Hi {{contact.first_name}},

Thank you for spending your Thursday evening learning AI with me. I hope you walked away feeling like the 2 hours were worth it.

Here is everything from today:

**Your resources:**
- [Workshop slides (PDF)](link)
- [Prompt library — 50+ prompts organized by job function](link)
- [AI Tool Quick-Start Guides (PDF)](link)
- [Tool links page with QR codes](link)

**Quick favor (2 minutes):**
I am always trying to make these workshops better. Would you take a 2-minute survey? There are only 10 questions, and your honest feedback helps me know what to keep and what to change.

[Take the 2-minute survey](typeform-link)

The survey also asks about your AI skill level again — I use the before/after comparison to measure whether the workshop actually delivered value. Your registration said you rated yourself a {{custom.ai_skill_before}} out of 10. I am curious where you would rate yourself now.

**The most important thing you can do this week:**
Use what you learned on Monday morning. Seriously. Open ChatGPT or Claude first thing and use it for a real task. The biggest drop-off happens when people wait "until they have time." You have time Monday. Use it.

If you get stuck on anything — anything at all — reply to this email and I will help you. That offer does not expire.

Thanks again,
Brandon

---

#### Post-Workshop Attendee — SMS 1: "Thank You + Survey"
**Send:** 3 hours after workshop ends
**Message:**

Thanks for coming today, {{contact.first_name}}! I just sent your resource pack + slides to your email. Quick favor — can you take a 2-min survey? It really helps me improve: [survey-link] — Brandon

---

#### Post-Workshop Attendee — Email 2: "The Monday Challenge"
**Send:** +1 day (Sunday evening, 7 PM)
**Subject:** Your Monday morning AI challenge
**Preview text:** One specific thing to try tomorrow that takes 10 minutes.

---

Hi {{contact.first_name}},

Tomorrow morning, before you check email, I want you to try this:

**The 10-Minute Monday Challenge:**

1. Open ChatGPT or Claude
2. Paste this prompt:

> "I am a [your job title] at [your company]. My biggest time-waster this week is [that task you identified at the workshop]. Help me do it in half the time. Ask me clarifying questions first."

3. Answer the follow-up questions it asks
4. Let it help you

That is it. 10 minutes. If it saves you even 30 minutes this week, you just got a 3x return on your time investment.

I have seen people use this exact approach to:
- Cut weekly report writing from 3 hours to 45 minutes
- Draft client proposals in 20 minutes instead of 2 hours
- Summarize 50-page documents in 2 minutes
- Generate meeting agendas that actually keep meetings on track

The key is doing it NOW, not "when you have time."

Hit reply and tell me how it went. I read every response.

— Brandon

---

#### Post-Workshop Attendee — Email 3: "Testimonial Ask + Deeper Offers"
**Send:** +3 days after workshop
**Subject:** Quick question + something for people who want to go deeper
**Preview text:** Would you recommend this to a colleague? Plus: your options for continued learning.

---

Hi {{contact.first_name}},

Two things today:

**1. Would you recommend this workshop?**

If you found the workshop valuable, the single biggest thing you can do to help is tell one person about it. Could be a colleague, a friend, someone on your team.

Here is a link they can use to register for the next session: {{custom.registration_link}}

If you do recommend someone who registers, I will give you $50 off any future offering. Just have them mention your name when they sign up.

And if you are open to it — would you write a quick 2-3 sentence testimonial I can use on the website? Just reply to this email with what you would tell a coworker about the experience. Nothing formal.

**2. For people who want to go deeper:**

Thursday was designed to give you a foundation. If you want more, here is what I offer:

**AI Starter Pack — $497**
Everything from Thursday, plus:
- Recorded replay of the full workshop (re-watch at your pace)
- Complete prompt library (50+ prompts by job function)
- 30-minute 1-on-1 call with me to configure AI for YOUR specific role
- 30 days of email support (whenever you get stuck, I help)
- AI Tool Quick-Start Guides (step-by-step PDFs)
- Access to private community (peer support + weekly tips from me)

The 1-on-1 call is where the real magic happens. I look at your actual workflow and show you exactly where AI fits.

[Get the AI Starter Pack — $497](stripe-link)

**2-Day Advanced Intensive — $997**
For people who want to build real systems:
- Saturday + Sunday, 9 AM - 4 PM each day
- Capped at 10 people (personalized attention)
- Day 1: Advanced prompt engineering, AI agents, workflow automation
- Day 2: Build YOUR custom AI system — you leave with automations running
- 15-minute 1-on-1 working session with me during Day 2
- Everything in the Starter Pack included
- 60 days of email support
- Lunch provided both days

[Join the Advanced Intensive — $997](stripe-link)

**Corporate Team Training — $5,000-$10,000/day**
Want your whole team trained? I come to your office with a custom curriculum for your industry. For a team of 20, that is $250-$500 per person — far less than hiring a big consulting firm.

[Schedule a call to discuss team training](calendar-link)

No pressure on any of this. The resources I sent Thursday are yours to keep regardless.

— Brandon

---

#### Post-Workshop Attendee — SMS 2: "Referral Nudge"
**Send:** +4 days after workshop
**Message:**

Hey {{contact.first_name}}, quick question — know anyone at work who would benefit from the AI workshop? If they register and mention your name, you both get $50 off your next purchase. Share this link: {{custom.registration_link}} — Brandon

---

#### Post-Workshop Attendee — Email 4: "Referral Ask + Next Workshop"
**Send:** +7 days after workshop
**Subject:** The next workshop is {{custom.next_workshop_date}} — and a way to save $50
**Preview text:** Bring a coworker, save $50. Plus a sneak peek at what is coming.

---

Hi {{contact.first_name}},

It has been a week since the workshop. How are you doing with AI?

If you have been using what you learned — even a little — I want to hear about it. Seriously, hit reply. The wins people share are the best part of my week.

**Two quick things:**

**1. The next workshop is {{custom.next_workshop_date}}.**
If you know someone who needs this — a colleague, a friend, someone on your team — the next session is open for registration. Send them this link: {{custom.registration_link}}

**Referral bonus:** If they register and mention your name, you BOTH get $50 off any paid offering (Starter Pack, Advanced Workshop, etc.). No limit — refer 5 people, save $250.

**2. What is coming next:**
I am building out a full AI training program for professionals in the Delaware area. That includes:
- Monthly workshops (free introductory + paid advanced)
- A 2-day intensive for people who want to build real AI systems
- Corporate team training (on-site at your office)
- 1-on-1 AI consulting for businesses that want implementation, not just education

If any of that interests you, just reply and tell me what you are most interested in. I will make sure you hear about it first.

Thanks for being part of this,
Brandon

---

### 3E. Post-Workshop — No-Shows (2 Emails + 1 SMS)

**Trigger:** Contact is in "Registered" stage but NOT moved to "Attended" after workshop date
**Goal:** Re-engage, offer next workshop date, maintain relationship
**Timing:** Same evening as workshop, +3 days

---

#### No-Show — Email 1: "We Missed You"
**Send:** Morning after workshop day (9:00 AM next day)
**Subject:** We missed you today — here is what happened
**Preview text:** No guilt trip. Life happens. Here is your next opportunity.

---

Hi {{contact.first_name}},

I noticed you were not able to make it to the workshop today. No worries at all — life happens and I completely understand.

I wanted to let you know what you missed so you can decide if the next one is worth putting on your calendar:

**What we covered:**
- Demystified AI in plain English (no buzzwords, no hype)
- Hands-on prompt engineering — attendees practiced with their real work tasks
- Live demo of AI agents handling repetitive work automatically
- Everyone set up 3 AI tools on their laptop and left with them working

**What attendees said:**
_(This section will be populated with real quotes after the first workshop)_

**The next workshop is {{custom.next_workshop_date}}.**
Same format, same location, still free. I would love to see you there.

[Register for {{custom.next_workshop_date}}]({{custom.registration_link}})

If Thursday evenings do not work for your schedule, let me know. I am considering adding other session times based on demand.

— Brandon

---

#### No-Show — SMS 1: "Next Date"
**Send:** +1 day after workshop
**Message:**

Hey {{contact.first_name}}, missed you at the AI workshop yesterday! The next one is {{custom.next_workshop_date}} — same free format. Want me to save you a spot? {{custom.registration_link}} — Brandon

---

#### No-Show — Email 2: "Last Chance for This Month"
**Send:** +3 days after workshop
**Subject:** Last call — next AI workshop is {{custom.next_workshop_date}}
**Preview text:** Same free workshop. Same hands-on format. A few seats left.

---

Hi {{contact.first_name}},

Quick follow-up — the next free AI workshop is {{custom.next_workshop_date}} at {{custom.workshop_venue}}.

If the timing did not work last time, I get it. Here is what I can tell you: the people who came last Thursday walked out with working AI tools and a completely different perspective on how AI fits into their job.

One attendee told me: "I went from feeling behind to feeling like I have a genuine advantage."

That is exactly the outcome I design for.

**Thursday, {{custom.next_workshop_date}} | 6:00 PM - 8:00 PM | {{custom.workshop_venue}}**
**Free. 25 seats. Laptop required.**

[Register now]({{custom.registration_link}})

If workshops are not your thing and you would rather do a 1-on-1 session, I offer those too. Just reply and we will figure something out.

— Brandon

---

### 3F. Upsell Sequence (3 Emails + 1 SMS)

**Trigger:** 7 days after workshop attendance AND contact has NOT purchased anything
**Goal:** Convert attendees to paid offerings — AI Starter Pack ($497), Advanced Workshop ($997), Corporate Training, Consulting
**Timing:** +7 days, +10 days, +14 days after workshop

---

#### Upsell — Email 1: "The AI Starter Pack"
**Send:** +7 days after workshop
**Subject:** The next step after the workshop (and a question for you)
**Preview text:** If you have been using AI this week, here is how to 10x it.

---

Hi {{contact.first_name}},

It has been a week since the workshop. I have a question: have you used AI at work this week?

If the answer is yes — even once — congratulations. You are already ahead of most people. The foundation we built on Thursday is working.

If the answer is no... that is exactly why I created the AI Starter Pack.

Here is the honest truth about learning AI: the workshop gives you the knowledge, but applying it consistently requires support. That is why 40% of attendees end up getting the Starter Pack — it bridges the gap between "I learned it" and "I use it every day."

**The AI Starter Pack — $497**

Here is what is inside:

**The 30-minute 1-on-1 call with me** (this is the most valuable part)
I look at your actual daily workflow — your emails, your reports, your meetings — and show you exactly where AI plugs in. You are not guessing anymore. You have a specific plan.

**Recorded workshop replay**
Re-watch any section at your own pace. Pause, rewind, practice. Especially useful for the prompt engineering section.

**Prompt library (50+ prompts by job function)**
Finance, pharma, marketing, operations, HR — organized by department. Copy, paste, customize, done.

**30 days of email support**
When you get stuck (and you will get stuck — everyone does), reply to me and I will help. No chatbot. No support ticket. Me.

**AI Tool Quick-Start Guides**
Step-by-step PDFs for ChatGPT, Claude, Copilot, and more. Bookmark them. Reference them daily.

**Private community access**
Other professionals doing exactly what you are doing. Share wins, ask questions, learn from each other. I drop tips weekly.

[Get the AI Starter Pack — $497](stripe-link)

This is not a course you buy and never open. The 1-on-1 call alone makes sure you implement. That is the whole point.

— Brandon

P.S. — If $497 is a stretch, many companies cover this under professional development budgets. I have a template email you can send to your manager. Just reply and I will send it over.

---

#### Upsell — SMS 1: "Quick Offer"
**Send:** +8 days after workshop
**Message:**

Hey {{contact.first_name}}, been using AI this week? If you want help applying it to your specific role, the AI Starter Pack includes a 30-min 1-on-1 call with me + 30 days of support for $497. Details: [link] — Brandon

---

#### Upsell — Email 2: "The Advanced Workshop"
**Send:** +10 days after workshop
**Subject:** For the 20% who want to go way beyond the basics
**Preview text:** 2 days. 10 people. You leave with a custom AI system built for your role.

---

Hi {{contact.first_name}},

The free workshop was designed to give everyone a foundation. But I know some of you are thinking: "That was great. Now I want MORE."

If that is you, I built something specifically for people who are ready to go deeper.

**The 2-Day Advanced AI Intensive — $997**
**Next session: [DATE] | Saturday + Sunday, 9 AM - 4 PM | {{custom.workshop_venue}}**

Here is how it is different from the free workshop:

**It is small.** Capped at 10 people. No one gets lost. I work with you individually.

**Day 1 goes WAY beyond the basics.**
- Advanced prompt engineering (chaining, system prompts, few-shot learning)
- AI agents — what they are, how they work, and how to build one
- Workflow automation — connecting AI to your actual tools (email, calendar, documents)
- Real-world case studies from my businesses

**Day 2 is YOUR build day.**
- You bring a problem. I help you build the solution.
- Could be: automating weekly reports, building a custom chatbot for your team, creating an AI research assistant, setting up automated email drafting
- 15-minute 1-on-1 working session to nail your specific use case
- You leave with something WORKING, not just knowledge

**Everything from the Starter Pack is included:**
- Workshop replay, prompt library, guides, community access
- 60 days of email support (double the Starter Pack)
- Lunch provided both days

**10 seats. That is it.**

[Reserve your seat — $997](stripe-link)

I know $997 is real money. Here is how I think about it: if the system you build on Day 2 saves you 5 hours a week, that is $997 back in about 3 weeks (assuming a $65/hour value on your time). After that, it is pure upside.

— Brandon

---

#### Upsell — Email 3: "Corporate Training + Consulting"
**Send:** +14 days after workshop
**Subject:** Something I do not talk about much (but your company might need)
**Preview text:** If you are a manager, director, or business owner — read this.

---

Hi {{contact.first_name}},

I mostly talk about individual workshops because that is what most people need. But I want to make sure you know about two other things I do, in case either one fits your situation.

**1. Corporate Team Training — $5,000-$10,000/day**

If you are a manager, director, or executive and you have been thinking "my whole team needs this," here is the offer:

I come to your office with a custom curriculum designed for your industry and your team's skill level. Same hands-on format as the workshop, but tailored to your company's tools, processes, and goals.

For a team of 20, that works out to $250-$500 per person — a fraction of what big consulting firms charge (Marketing AI Institute charges $75K+).

Your team walks out with:
- AI tools set up for their specific roles
- A shared prompt library customized for your department
- An automation playbook for your most common workflows
- A training manual they can reference going forward

**2. AI Consulting — starting at $4,997**

For business owners and executives who do not want to learn AI — they want someone to DO it for them.

I assess your operations, identify where AI saves time and money, build and deploy the solutions, and train your staff to use them. 90 days of support included.

This is what I do with my own businesses. I built a voice agent that answers calls 24/7, content systems that generate social media automatically, and workflow automations that replaced manual processes entirely. I can do the same for yours.

If either of these interests you, just reply to this email or book a call here: [calendar-link]

No pressure. I just wanted to make sure you had the full picture.

— Brandon

---

### 3G. Referral Program (1 Email + 1 SMS)

**Trigger:** Fires as part of Post-Workshop sequence (embedded in Email 4), but also available as a standalone trigger
**Goal:** Generate word-of-mouth registrations with incentive
**Timing:** +5 days after workshop

---

#### Referral — Email 1: "Bring a Coworker, Save $50"
**Send:** +5 days after workshop (or standalone trigger)
**Subject:** Know someone who needs this? You both save $50.
**Preview text:** Share the workshop. Get rewarded. Simple.

---

Hi {{contact.first_name}},

You came to the workshop. You saw the value. Now here is a way to share it AND get rewarded:

**The LearnAndLeverageAI Referral Program**

1. Share this link with a colleague, friend, or anyone you think would benefit: {{custom.registration_link}}?ref={{custom.referral_code}}

2. When they register and mention your name (or use your link), you BOTH get $50 off any paid offering — AI Starter Pack, Advanced Workshop, Corporate Training, or Consulting.

3. There is no limit. Refer 5 people, save $250. Refer 10, save $500.

**Why I do this:**
The best marketing I have ever had is someone telling their coworker "you need to go to this workshop." That is worth more to me than any ad. The $50 is my way of saying thank you.

**Your personal referral link:**
{{custom.registration_link}}?ref={{custom.referral_code}}

**Your referral code (if they register in person):**
{{custom.referral_code}}

Just share the link or tell them to mention your name at registration. I track the rest.

Thanks for spreading the word,
Brandon

---

#### Referral — SMS 1: "Referral Link"
**Send:** +5 days after workshop
**Message:**

Hey {{contact.first_name}}! If you know anyone who'd benefit from the AI workshop, share this link: {{custom.registration_link}}?ref={{custom.referral_code}} — they get a free seat, you both get $50 off any paid offering. Thanks for spreading the word! — Brandon

---

## 4. Chatbot / Conversation AI Training Document

### Knowledge Base for GHL Conversation AI + Voice AI

This document trains the GHL chatbot and voice AI agent to answer questions about the LearnAndLeverageAI workshop business. The bot should sound like Brandon — conversational, knowledgeable, practical, no jargon.

---

### Bot Identity & Tone

**Name:** Brandon's AI Assistant (introduce as: "Hi, I'm Brandon's assistant. I can answer your questions about the AI workshops and help you register.")

**Tone:**
- Friendly and helpful, never salesy or pushy
- Answer questions directly, then offer next steps
- Use plain English — no AI jargon unless the person brings it up
- If unsure, say: "That's a great question — let me have Brandon get back to you personally. What's the best way to reach you?"
- Never make up information. If it is not in this knowledge base, hand off to Brandon.

**Handoff trigger:** If the person asks to speak to a human, says "talk to Brandon," or asks about corporate training pricing above $10K, hand off immediately. Say: "Absolutely — let me connect you with Brandon directly. He will reach out within a few hours."

---

### Workshop FAQ

**Q: What is the workshop about?**
A: It is a hands-on, in-person workshop where you learn to use AI tools for your job. You will walk out with 3 AI tools set up and working on your laptop. It covers what AI actually is (in plain English), how to write prompts that get useful results, AI automation, and building your personal toolkit. It is designed for professionals who feel behind on AI and want practical skills, not theory.

**Q: How much does it cost?**
A: The introductory workshop is completely free. There is no catch — Brandon runs it as a free community event to help professionals in the Delaware area get started with AI. Future workshops may be paid ($297-$497), but the first session is free.

**Q: When is the next workshop?**
A: The next workshop is on [DATE] from 6:00 PM to 8:00 PM. It is a Thursday evening, so it does not conflict with your work schedule.

**Q: Where is it held?**
A: The workshop is held at [VENUE NAME AND ADDRESS] in Wilmington, Delaware. There is free parking available on-site.

**Q: How do I register?**
A: You can register at learnandleverageai.com/workshops. It takes about 90 seconds — just your name, email, phone, company, job title, and a couple of quick questions. Registration is free and confirms your seat.

**Q: How many seats are available?**
A: The workshop is limited to 25 people to keep it hands-on and personal. Once it is full, you will be added to the waitlist for the next session.

**Q: Do I need any tech experience?**
A: Not at all. This workshop is specifically designed for people who are NOT tech experts. Brandon assumes you are starting from zero. If you can use email and a web browser, you have all the skills you need. About half of attendees have never used ChatGPT or any AI tool before.

**Q: What should I bring?**
A: Bring your laptop (fully charged), a charger, and ideally a specific work task you would like AI help with. A printed workbook, coffee, snacks, and Wi-Fi will be provided.

**Q: Does my laptop need anything special installed?**
A: No. Everything we use is web-based — just a modern browser (Chrome, Edge, Safari, Firefox). You do not need to install any software. If you already have a ChatGPT or Claude account, log in beforehand to save time, but it is not required.

**Q: What will I actually learn?**
A: The workshop covers 4 main areas over 2 hours:
1. What AI actually is — demystified, no buzzwords, live demos
2. Prompt engineering — how to ask AI the right questions to get useful results for YOUR job
3. AI agents and automation — how AI can handle repetitive work (live demos of real tools)
4. Build your toolkit — you set up 3 AI tools on your laptop and leave with them working

You will practice with real tasks from your actual job, not hypothetical examples.

**Q: Who teaches the workshop?**
A: Brandon Calloway. He runs 5 businesses almost entirely on AI — including a voice agent company, a content creation platform, and multiple service businesses. He is not a professor teaching theory. He is a business owner who uses AI every day and teaches you what actually works.

**Q: Is this a sales pitch?**
A: No. The workshop is genuine education. Brandon does offer additional resources and services for people who want to go deeper after the workshop (AI Starter Pack, advanced workshops, consulting), but the free session itself is a complete, standalone experience. You walk out with skills and tools regardless of whether you buy anything.

**Q: Can my company pay for this?**
A: The workshop itself is free, so there is nothing to pay for. However, if you are interested in the AI Starter Pack ($497), Advanced Workshop ($997), or Corporate Team Training ($5,000-$10,000/day), those can absolutely be covered by your company's professional development or training budget. Brandon has a template email you can forward to your manager to request approval. Just ask and he will send it to you.

**Q: What if I cannot make it after I register?**
A: No problem. Just let us know so we can give your seat to someone on the waitlist. Reply to your confirmation email or text Brandon at (302) 416-6285. There is no cancellation penalty since the workshop is free.

**Q: Is there parking?**
A: Yes. Free parking is available at the venue.

**Q: Will there be food?**
A: Coffee, water, and light snacks are provided. The workshop is 2 hours (6:00 PM - 8:00 PM), so you will be done at a reasonable time.

**Q: Is there a virtual or online option?**
A: Not at this time. The workshop is designed to be in-person and hands-on. Brandon helps people individually during the session, which does not translate well to a virtual format. If you are interested in remote options, let us know and we will add you to the waitlist for when online sessions become available.

**Q: What happens after the workshop?**
A: You receive an email with all the resources — slides, prompt library, tool guides, and links to everything we covered. You also get an invitation to a 2-minute survey (it helps Brandon improve the workshop). If you want ongoing support, the AI Starter Pack includes 30 days of email support and a 1-on-1 call with Brandon.

**Q: I already use ChatGPT. Is this too basic for me?**
A: Most people who "use ChatGPT" are barely scratching the surface. The workshop goes well beyond basic Q&A — you will learn prompt engineering frameworks, system prompts, AI agents, and automation. Even experienced users consistently tell us they learned techniques they had no idea existed. If you rate your AI skills above a 7 out of 10, the Advanced Workshop ($997) might be a better fit.

**Q: Can I bring a colleague or friend?**
A: Absolutely. Have them register at learnandleverageai.com/workshops. If you refer someone who registers, you both get $50 off any paid offering through our referral program.

**Q: What is the AI Starter Pack?**
A: It is a $497 package for people who want ongoing support after the workshop. It includes: a recorded replay of the full workshop, a 50+ prompt library organized by job function, a 30-minute 1-on-1 call with Brandon to configure AI for your specific role, 30 days of email support, AI tool quick-start guides, and access to a private community. The 1-on-1 call is the most valuable part — Brandon looks at your actual workflow and shows you exactly where AI fits.

**Q: What is the Advanced Workshop?**
A: It is a 2-day weekend intensive (Saturday + Sunday, 9 AM - 4 PM) for $997, capped at 10 people. Day 1 covers advanced prompt engineering, AI agents, and workflow automation. Day 2 is a build day — you bring a problem, Brandon helps you build the AI solution. You leave with something working, not just knowledge. Includes everything in the Starter Pack, 60 days of support, a personal working session with Brandon, and lunch both days.

**Q: Do you offer corporate training?**
A: Yes. Brandon offers on-site corporate team training at $5,000/day for teams under 15 people and $10,000/day for teams of 15-30. The curriculum is customized for your industry and your team's skill level. For a team of 20, that works out to $250-$500 per person — significantly less than enterprise training providers. To discuss corporate training, book a call with Brandon at [calendar-link] or reply here and he will reach out.

**Q: Do you offer consulting?**
A: Yes. For business owners and executives who want AI implemented (not just taught), Brandon offers AI Consulting starting at $4,997. This includes an operations audit, a custom AI roadmap, implementation of AI solutions, staff training, and 90 days of support. Brandon does this with his own businesses — he has built voice agents, content systems, and workflow automations. To discuss consulting, book a call at [calendar-link].

**Q: Where can I learn more about Brandon?**
A: You can visit learnandleverageai.com for Brandon's full bio and background. He runs multiple businesses including Call2Calendar (AI voice agents), a content creation platform, pool service and landscaping companies, and a photo booth rental business — all significantly automated with AI. He teaches from direct experience, not academic knowledge.

---

### Objection Handling

**"I am not tech-savvy."**
That is exactly who this workshop is for. Half the people in the room will feel the same way. Brandon assumes zero prior experience and walks you through everything step by step. If you can use email, you can do this.

**"I do not have time."**
It is 2 hours on a Thursday evening — 6:00 PM to 8:00 PM. If AI saves you even 2 hours a week at work (which is conservative), you make that time back within a week. And it is free, so there is zero financial risk.

**"My company should be training me on this."**
You are right — they should be. But most companies have not figured out AI training yet. This workshop fills that gap. And if your company wants to send your whole team, Brandon offers corporate training too.

**"I already tried ChatGPT and it was not that useful."**
That is incredibly common. The issue is almost never the tool — it is how you use it. The prompt engineering section of the workshop specifically addresses this. You will learn frameworks for getting useful output every time, not generic chatbot responses.

**"Can I just watch it online?"**
Not currently. The hands-on, in-person format is what makes this workshop different. Brandon helps people individually during the session. We may offer virtual options in the future — want to be notified when we do?

**"Is this going to try to sell me something?"**
Brandon does offer additional resources for people who want more (AI Starter Pack, advanced workshops, consulting). He will briefly mention them at the end of the session. But the workshop itself is packed with genuine education and a brief "here's what is available if you want to continue." You walk out with real skills regardless.

**"$497 / $997 seems expensive."**
Consider the value of your time. If the AI Starter Pack's 1-on-1 call helps you save 3 hours a week, that is 156 hours a year. At even $50/hour, that is $7,800 in time saved from a $497 investment. Many companies cover this under professional development budgets — Brandon has a template email you can send to your manager.

---

### Booking & Registration Flow

When someone wants to register, guide them through:

1. "Great! I can help you register. The next workshop is [DATE] at [VENUE]. It's free and limited to 25 seats."
2. "To save your spot, just head to learnandleverageai.com/workshops and fill out the short form — it takes about 90 seconds."
3. "Or if you'd prefer, I can take your information right now. I just need your full name, email, phone number, company name, job title, and how you would rate your AI skills from 1 to 10."
4. After collecting info: "You're all set! You'll receive a confirmation email with all the details and a calendar invite. See you on [DATE]!"

### Escalation Rules

Hand off to Brandon (do NOT attempt to answer) when:
- The person asks about custom consulting engagements over $10,000
- The person is a C-suite executive (CEO, CTO, COO, CFO) at a company with 100+ employees
- The person asks about partnerships, sponsorships, or speaking engagements
- The person is upset, angry, or making a complaint
- The person asks the same question 3+ times (indicates confusion the bot cannot resolve)
- The person explicitly asks to speak to a human

**Escalation response:** "That's a great question and I want to make sure you get the best answer. Let me have Brandon reach out to you personally — he's usually very quick. What's the best way to reach you — email or phone?"

---

## 5. Implementation Checklist

### Phase 1: Sub-Account Setup (Brandon — 10 minutes)
- [ ] Create LearnAndLeverageAI sub-account in GHL
- [ ] Generate PIT token with all scopes
- [ ] Share Location ID + PIT token with Claude Code
- [ ] Connect Twilio for SMS (or use GHL's built-in phone)
- [ ] Connect Stripe for payment tracking
- [ ] Set timezone to America/New_York

### Phase 2: Pipeline Configuration (Claude Code via API — 15 minutes)
- [ ] Create "Workshop Attendee Journey" pipeline with 8 stages + 3 loss stages
- [ ] Create all custom fields (Company Name, Job Title, AI Skill Before, AI Skill After, etc.)
- [ ] Create all contact tags
- [ ] Set up pipeline automations (stage change triggers)

### Phase 3: Email/SMS Sequences (Claude Code via API — 30 minutes)
- [ ] Create Lead Nurture workflow (3 emails + 1 SMS, trigger: New Lead stage)
- [ ] Create Registration Confirmation workflow (1 email + 1 SMS, trigger: Registered stage)
- [ ] Create Pre-Workshop Reminders workflow (3 emails + 2 SMS, trigger: time-based from registration)
- [ ] Create Post-Workshop Attendee workflow (4 emails + 2 SMS, trigger: Attended stage)
- [ ] Create Post-Workshop No-Show workflow (2 emails + 1 SMS, trigger: Registered + not Attended after date)
- [ ] Create Upsell workflow (3 emails + 1 SMS, trigger: 7 days post-attendance + no purchase)
- [ ] Create Referral Program workflow (1 email + 1 SMS, trigger: 5 days post-attendance)

### Phase 4: Chatbot Setup (Claude Code via API — 15 minutes)
- [ ] Enable GHL Conversation AI on the sub-account
- [ ] Upload knowledge base from Section 4 of this document
- [ ] Configure bot identity (name, tone, escalation rules)
- [ ] Test 10 common questions
- [ ] Configure web chat widget for learnandleverageai.com/workshops

### Phase 5: Integrations (Claude Code — 20 minutes)
- [ ] Stripe webhook → GHL (payment confirmed → move to Customer stage, add purchase tag)
- [ ] Registration form submission → GHL (new contact → Registered stage, trigger confirmation)
- [ ] Typeform webhook → GHL (post-workshop survey → update AI Skill After, NPS, etc.)
- [ ] Meta Pixel → GHL (track ad-to-registration attribution)
- [ ] Calendar invite generation (Google Calendar API or GHL native)

### Phase 6: Testing (Claude Code — 30 minutes)
- [ ] Test full registration flow (form → confirmation email + SMS → calendar invite)
- [ ] Test reminder sequence timing (mock date triggers)
- [ ] Test post-workshop attendee flow (mark attended → emails fire)
- [ ] Test no-show flow (registered + not attended → no-show emails fire)
- [ ] Test upsell flow (7 days post-attendance → upsell emails fire)
- [ ] Test Stripe webhook (purchase → Customer stage + correct tag)
- [ ] Test chatbot with 10 FAQ questions
- [ ] Test SMS delivery (confirm Twilio/GHL number active)
- [ ] Test email deliverability (SPF, DKIM, DMARC for sending domain)

### Phase 7: Go Live
- [ ] Enable all workflows
- [ ] Embed registration form on /workshops page
- [ ] Embed chat widget on /workshops page
- [ ] Monitor first 24 hours of lead flow
- [ ] Verify all merge fields populate correctly with real data

---

## Sequence Summary

| Sequence | Emails | SMS | Total Touches | Trigger |
|----------|--------|-----|---------------|---------|
| Lead Nurture | 3 | 1 | 4 | New Lead stage |
| Registration Confirm | 1 | 1 | 2 | Registered stage |
| Pre-Workshop Reminders | 3 | 2 | 5 | Time-based (7d, 3d, morning-of) |
| Post-Workshop (Attendees) | 4 | 2 | 6 | Attended stage |
| Post-Workshop (No-Shows) | 2 | 1 | 3 | Registered + not Attended |
| Upsell | 3 | 1 | 4 | +7 days post-attendance, no purchase |
| Referral Program | 1 | 1 | 2 | +5 days post-attendance |
| **TOTAL** | **17** | **9** | **26** | |

---

## Appendix: GHL API Endpoints for Implementation

Once the PIT token is available, these are the key API calls:

```bash
# Base URL
BASE="https://services.leadconnectorhq.com"
PIT="pit-XXXXX"  # LearnAndLeverageAI PIT
LOC="XXXXX"      # LearnAndLeverageAI Location ID

# Create pipeline
curl -X POST "$BASE/opportunities/pipelines" \
  -H "Authorization: Bearer $PIT" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{"locationId":"'$LOC'","name":"Workshop Attendee Journey","stages":[...]}'

# Create custom field
curl -X POST "$BASE/locations/$LOC/customFields" \
  -H "Authorization: Bearer $PIT" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{"name":"AI Skill Before","fieldKey":"ai_skill_before","dataType":"NUMBER"}'

# Create/update contact
curl -X POST "$BASE/contacts/" \
  -H "Authorization: Bearer $PIT" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{"locationId":"'$LOC'","firstName":"...","email":"...","phone":"..."}'

# Add contact to pipeline
curl -X POST "$BASE/opportunities/" \
  -H "Authorization: Bearer $PIT" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{"pipelineId":"...","pipelineStageId":"...","locationId":"'$LOC'","contactId":"..."}'
```

Note: GHL Workflows (email/SMS sequences) must be built in the GHL UI or via the Workflows API (v2). The copy in this document is ready to paste directly into GHL workflow email/SMS action steps.

---

*Document created by Claude Code on 2026-03-21. Ready for implementation once Brandon creates the GHL sub-account and provides the PIT token.*

---

## LIVE PIPELINE IDS (Created March 21, 2026)

| Stage | Name | ID |
|-------|------|----|
| 0 | New Lead | cda116cd-7fa9-428f-9e44-073d9de85036 |
| 1 | Registered | 3f82160e-c558-4e41-b26b-4a51f26564a0 |
| 2 | Confirmed | 5707861a-8cb0-4f16-a8d4-813cf903549a |
| 3 | Reminded | 5a6dc001-05ec-4e0f-8d50-7839ba078dcc |
| 4 | Attended | 6fd9ff1f-f8a2-4ee1-aebe-c26c90b85c39 |
| 5 | Post-Workshop | 53413d70-6d4a-4522-bbb1-af525b7f6a96 |
| 6 | Customer | 6976b057-fe37-4643-aab9-e966bd8400ba |
| 7 | Referral | d5ee99e0-021a-4bcb-b174-3e4f53df2969 |

**Pipeline ID:** Lb2EtR2nnxlLGRWCwBpD
**Location ID:** AVkeTAjBMKyrH5q0f7bQ
