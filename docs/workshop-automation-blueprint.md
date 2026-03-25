# AI Workshop Business: Full Automation Blueprint

**Goal:** Brandon only shows up to teach. Everything else is automated.

**Date:** 2026-03-21
**Project:** LearnAndLeverageAI

---

## Executive Summary

This blueprint maps every function of an in-person AI workshop business to specific tools, costs, and autonomy levels. The total monthly tool cost ranges from **$574/mo** (lean) to **$1,394/mo** (full stack). Brandon's only manual tasks: deliver the workshop and approve high-stakes decisions (ad budgets, new city launches). Everything else runs on autopilot via AI agents, GHL workflows, and integration platforms.

### Monthly Cost Summary (Full Stack)

| Category | Tools | Monthly Cost |
|----------|-------|-------------|
| CRM/Sales/Comms | GoHighLevel (Unlimited + AI) | $394 |
| Cold Email | Instantly.ai (Hypergrowth) | $97 |
| Automation Glue | Make.com (Pro) | $16 |
| Payments | Stripe | ~2.9% + $0.30/txn |
| Transactional Email | SendGrid (Essentials) | $20 |
| Slide Decks | Gamma.app (Pro) | $15 |
| Design/Workbooks | Canva Pro | $13 |
| Accounting | QuickBooks Simple Start | $38 |
| Surveys | Typeform (Basic) | $25 |
| Web Hosting | Vercel (Pro) | $20 |
| SEO Data | DataForSEO (existing) | ~$50 |
| AI Agents | Claude Code + OpenClaw (existing) | $0 incremental |
| Domain/DNS | Existing | $0 |
| **TOTAL** | | **~$688/mo + payment processing** |

---

## 1. Lead Generation & Marketing Automation

### 1A. Automated Social Content Creation

**Tool:** OpenClaw agents (Marlo) + Claude Code

**How it works:**
- OpenClaw's Marlo agent generates weekly content batches: 5 LinkedIn posts, 5 X/Twitter posts, 3 Facebook posts, 2 Reddit threads
- Content follows the brand voice guidelines already established in `marketing/brand-voice-qa-report.md`
- Claude Code generates long-form blog posts for SEO (targeting "AI workshops near [city]" keywords)
- Content calendar maintained in Google Sheets via Google Workspace MCP
- Posts are staged in a content queue; Buffer or GHL Social Planner handles scheduling and auto-posting

**Cost:** $0 incremental (agents already running on existing Claude/OpenClaw subscriptions)

**Autonomy Level:** 95% autonomous
- Fully automated: content generation, scheduling, posting
- Human review: Brandon skims weekly content batch (5 min) — optional, not required

**Specific Workflow:**
1. Every Monday at 6 AM: Marlo generates the week's content batch
2. Content is written to `~/projects/workbench/learnandleverageai/marketing/weekly-posts/`
3. Make.com scenario picks up new posts and pushes to Buffer/GHL Social Planner
4. Posts auto-publish on schedule throughout the week
5. Engagement metrics auto-collected weekly via GHL reporting

---

### 1B. Meta Ad Campaign Management

**Tool:** GHL + Claude Code for creative generation + Meta Ads API

**How it works:**
- Claude Code generates ad creatives (copy + image prompts for fal.ai/HeyGen)
- Ad sets configured in Meta Ads Manager with dayparting (already proven with Call2Calendar)
- GHL tracks leads from Meta ads via UTM parameters into the workshop pipeline
- Automated A/B testing: Claude Code analyzes performance weekly and generates new creative variants
- Budget rules set in Meta: auto-pause underperforming ads, scale winners

**Cost:** Ad spend is variable (recommend $500-$2,000/mo per city). Tool cost = $0 incremental.

**Autonomy Level:** 80% autonomous
- Fully automated: creative generation, A/B testing, lead capture, follow-up
- Human review: Brandon approves monthly ad budget, reviews ROAS weekly (5 min)

---

### 1C. Cold Email Outreach (Instantly.ai)

**Tool:** Instantly.ai (Hypergrowth plan — $97/mo)

**How it works:**
- Already have 15 sending accounts across 3 domains warming up
- Target: local business owners within 50-mile radius of workshop city
- Lead sourcing: Outscraper or Instantly's built-in B2B SuperSearch database scrapes local contractors, plumbers, electricians, HVAC companies, etc.
- Claude Code writes personalized cold email sequences (3-5 email sequence per campaign)
- Sequences reference local pain points: "I noticed [Business Name] in [City] is still taking calls manually..."
- Replies auto-routed to GHL via webhook for pipeline management
- AI Reply Agent handles initial responses, books calls/registrations

**Cost:** $97/mo (Instantly Hypergrowth)

**Autonomy Level:** 90% autonomous
- Fully automated: lead scraping, email personalization, sending, warmup, reply handling
- Human review: Brandon approves new city target lists before launch (one-time per city)

**Capacity:** 15 accounts x 30 emails/day = 450 cold emails/day = ~13,500/month

---

### 1D. Automated LinkedIn Engagement

**Tool:** Claude Code + GHL + manual posting (LinkedIn API restrictions prevent full automation)

**How it works:**
- Claude Code generates LinkedIn posts optimized for the algorithm (carousels, text posts, polls)
- Posts queued in GHL Social Planner or Buffer for auto-publishing
- Comment engagement: Claude Code drafts thoughtful comments on target prospects' posts
- Connection requests sent manually or via tools like Dripify/Expandi ($39-$99/mo if desired)
- Brandon's profile is the face; content makes him look like a thought leader without writing anything

**Cost:** $0 (manual posting) to $79/mo (Expandi for connection automation)

**Autonomy Level:** 70% autonomous
- Fully automated: content creation, scheduling, comment drafting
- Semi-automated: connection requests (LinkedIn actively polices automation)
- Human review: Brandon posts to LinkedIn once/day (30 seconds — just hit "post" on pre-written content)

---

### 1E. SEO Content for "AI Workshops Near [City]"

**Tool:** Claude Code + DataForSEO (existing) + Vercel (existing)

**How it works:**
- DataForSEO identifies keyword opportunities: "AI workshop [city]", "AI training for businesses [city]", "learn AI [city]"
- Claude Code generates city-specific landing pages with local schema markup, testimonials, venue photos
- Pages auto-deployed to Vercel as part of the Next.js site
- Each city gets its own `/workshops/[city-name]` URL with unique content
- Programmatic SEO: one template, N cities — same pattern already proven with NeedSeptic (9,121 listings)

**Cost:** ~$50/mo (DataForSEO existing balance)

**Autonomy Level:** 95% autonomous
- Fully automated: keyword research, content generation, page creation, deployment
- Human review: none needed (same pattern as NeedSeptic directory)

**Scale Impact:** Can generate 50+ city pages in a single session. Each page targets 10-20 local keywords.

---

### 1F. Landing Page Creation & Optimization

**Tool:** Claude Code + Vercel + PostHog (existing)

**How it works:**
- Claude Code builds and iterates on landing pages in the existing Next.js codebase
- PostHog tracks conversion rates, scroll depth, click-through
- OpenClaw agents analyze PostHog data and suggest copy/layout changes
- A/B testing via Vercel Edge Config or simple feature flags
- New workshop landing pages spun up per city in under 30 minutes

**Cost:** $20/mo (Vercel Pro)

**Autonomy Level:** 90% autonomous
- Fully automated: page creation, analytics, optimization suggestions
- Human review: Brandon approves major design changes (optional)

---

## 2. Sales & Registration

### 2A. CRM, Pipeline & Booking (GoHighLevel)

**Tool:** GoHighLevel Unlimited ($297/mo) + AI Employee Add-On ($97/mo)

**How it works:**
- **Pipeline stages:** New Lead → Registered → Reminded → Attended → Follow-Up → Customer → Upsell
- Leads flow in from: Meta ads, cold email replies, website forms, LinkedIn, SEO pages
- Each lead auto-tagged with source, city, and workshop date
- GHL calendar integration for workshop scheduling
- Automated pipeline movement based on actions (registered, opened emails, clicked links, attended)

**Cost:** $394/mo (GHL Unlimited + AI Add-On)

**Autonomy Level:** 95% autonomous
- Fully automated: lead capture, tagging, pipeline management, calendar
- Human review: none for standard flow

**GHL Pipeline Setup for Workshops:**
```
Stage 1: New Lead (auto-created from any source)
Stage 2: Engaged (opened email or clicked link)
Stage 3: Registered (completed registration form)
Stage 4: Reminded (received pre-workshop sequence)
Stage 5: Attended (marked via check-in)
Stage 6: Post-Workshop (entered follow-up sequence)
Stage 7: Customer (purchased AI Starter Pack or service)
Stage 8: Upsell (entered ongoing service pipeline)
```

---

### 2B. Automated Email/SMS Sequences

**Tool:** GHL Workflows + SendGrid (transactional backup)

**How it works:**
- **Pre-registration nurture:** 3-email sequence educating leads about AI for their industry
- **Registration confirmation:** Immediate email + SMS with workshop details, calendar invite
- **Reminder sequence:** 7 days, 3 days, 1 day, 2 hours before workshop
- **Post-workshop:** 4-email + 3-SMS follow-up sequence (already built by Cash)
- **No-show recovery:** Separate sequence offering replay or next workshop date
- **Upsell sequence:** 14-day drip for attendees who didn't buy, offering AI Starter Pack then Concierge

All sequences built as GHL Workflows with branching logic based on attendee behavior.

**Cost:** Included in GHL ($394/mo) + SendGrid Essentials ($20/mo for transactional)

**Autonomy Level:** 100% autonomous once built
- Fully automated: every email, SMS, and timing decision
- Human review: none (sequences fire based on triggers)

**Key Sequences to Build:**

| Sequence | Emails | SMS | Trigger |
|----------|--------|-----|---------|
| Lead Nurture | 3 | 1 | New lead captured |
| Registration Confirm | 1 | 1 | Form submitted |
| Pre-Workshop Reminders | 4 | 3 | Registration + time-based |
| Day-Of | 1 | 2 | Workshop day |
| Post-Workshop (buyers) | 3 | 1 | Purchase confirmed |
| Post-Workshop (non-buyers) | 5 | 3 | Attended, no purchase |
| No-Show Recovery | 3 | 2 | Did not attend |
| Upsell to Concierge | 4 | 2 | 14 days post-purchase |

---

### 2C. AI Chatbot & Voice AI

**Tool:** GHL Conversation AI + GHL Voice AI

**How it works:**
- **Website chatbot:** Trained on workshop details, pricing, schedule, FAQ
  - Answers questions 24/7
  - Books registrations directly
  - Captures lead info
  - Hands off to human only for complex custom requests
- **Voice AI (inbound calls):**
  - Answers calls to the workshop phone number
  - Provides workshop info, dates, pricing
  - Books registrations
  - Routes to Brandon's phone only if caller insists on speaking to a human
  - Uses ElevenLabs-quality voices (built into GHL)

**Cost:** Included in AI Employee Add-On ($97/mo) + usage (~$0.13/min voice, $0.02/message chat)
- Estimated usage: 200 chat messages/mo ($4) + 100 voice minutes/mo ($13) = ~$17/mo usage

**Autonomy Level:** 95% autonomous
- Fully automated: answering questions, booking, lead capture
- Human escalation: only when caller demands human (< 5% of interactions)

---

### 2D. Payment Processing

**Tool:** Stripe (already partially set up)

**How it works:**
- Workshop tickets: Stripe Checkout with Payment Links (no code needed)
- AI Starter Pack ($497): Stripe Checkout (already built in codebase)
- Concierge services: Stripe invoicing for custom quotes
- Payment plans: Stripe's built-in installment support (e.g., 2x $249 for Starter Pack)
- Automated receipts via Stripe
- Webhook to GHL: payment confirmed → move lead to "Customer" stage → trigger post-purchase sequence

**Cost:** 2.9% + $0.30 per transaction (no monthly fee)

**Autonomy Level:** 100% autonomous
- Fully automated: checkout, receipts, webhook triggers, pipeline updates
- Human review: none

---

### 2E. Waitlist Management

**Tool:** GHL + Custom waitlist logic in Next.js

**How it works:**
- When a workshop hits capacity, registration form switches to waitlist mode
- Waitlisted leads enter separate GHL pipeline stage
- If spots open (cancellations), automated email/SMS offers the spot (first-come, first-served with 24hr expiry)
- Waitlisted leads auto-enrolled in next workshop date notifications
- Priority access for waitlisted leads to future workshops

**Cost:** $0 incremental (GHL + existing site)

**Autonomy Level:** 100% autonomous

---

### 2F. Post-Workshop Upsell Sequences

**Tool:** GHL Workflows

**How it works:**
- **Tier 1 → Tier 2 upsell:** Attendees who bought AI Starter Pack ($497) get a 14-day sequence pitching Standard Automation ($1,000-$3,500)
- **Tier 2 → Tier 3 upsell:** Standard Automation buyers get pitched on Full Operations ($5,000-$15,000)
- **Monthly retainer pitch:** All customers get offered $99-$299/mo ongoing support
- Upsell triggers based on engagement: opened emails, clicked links, visited pricing page
- GHL tracks lifetime value per customer

**Cost:** $0 incremental (GHL Workflows)

**Autonomy Level:** 100% autonomous once sequences are built

---

## 3. Operations & Logistics

### 3A. Venue Booking Automation

**Tool:** Claude Code + GHL + Google Workspace + Make.com

**How it works:**
- **Venue database:** Google Sheet with vetted venues per city (capacity, cost, AV equipment, contact, availability patterns)
- **Booking template:** Claude Code generates personalized venue inquiry emails from a template
- **Booking workflow:**
  1. When a new workshop is scheduled, Make.com triggers venue outreach
  2. Templated email sent to top 3 venues in that city via SendGrid
  3. Responses tracked in GHL or Google Sheet
  4. Confirmation auto-generates calendar events, attendee notifications
- **Venue requirements checklist:** Auto-sent to confirmed venue (AV needs, room layout, parking info, Wi-Fi requirements)

**Cost:** $16/mo (Make.com Pro plan)

**Autonomy Level:** 75% autonomous
- Fully automated: email generation, sending, tracking, checklist delivery
- Human review: Brandon confirms venue selection from options (1 min decision)

**Venue Inquiry Template (auto-generated per city):**
```
Subject: AI Workshop Venue Inquiry — [Date] — [City]

Hi [Venue Contact],

I'm hosting a half-day AI workshop for local business owners on [Date]
and I'm looking for a space that fits 20-40 attendees with:
- Projector/screen setup
- Reliable Wi-Fi
- Classroom or U-shape seating
- Parking for attendees

Could you share availability and pricing for [Date]?
We typically run 9 AM to 1 PM.

Best,
Brandon Calloway
LearnAndLeverageAI.com
```

---

### 3B. Attendee Communication

**Tool:** GHL Workflows + SendGrid

**How it works (fully automated sequence):**

| Timing | Channel | Content |
|--------|---------|---------|
| Immediately | Email + SMS | Registration confirmation + calendar invite (.ics) |
| 7 days before | Email | "What to bring" + pre-work assignment |
| 3 days before | Email | Venue details, parking, agenda preview |
| 1 day before | SMS | "See you tomorrow at [Venue]! Parking info: [link]" |
| 2 hours before | SMS | "Starting in 2 hours! [Address]. Reply if you need directions." |
| Day of (end) | Email | Thank you + survey link + offer |
| 1 day after | Email | Resources, slides, recordings |
| 3 days after | Email | Testimonial request |
| 7 days after | Email | "How's it going?" check-in + upsell |

**Cost:** $0 incremental (GHL + SendGrid already counted)

**Autonomy Level:** 100% autonomous once built

---

### 3C. Materials Preparation

**Tool:** Claude Code + Gamma.app + Canva Pro

**How it works:**
- **Workbooks/Handouts:** Claude Code generates workshop workbook content (exercises, checklists, resource lists) → exported to Google Docs or Canva for formatting
- **Slide decks:** Gamma.app generates presentation from outline in under 60 seconds, with professional design
- **Customization per workshop:** Claude Code updates slides with city-specific examples, attendee industry mix, and current AI tools/pricing
- **Print-ready PDFs:** Canva Pro exports workbooks as print-ready PDFs
- **Materials inventory:** Google Sheet tracks what needs printing, how many copies, which venue

**Cost:** $15/mo (Gamma Pro) + $13/mo (Canva Pro) = $28/mo

**Autonomy Level:** 85% autonomous
- Fully automated: content generation, slide creation, PDF export
- Human review: Brandon reviews final deck before each workshop (15 min)

---

### 3D. Feedback Collection & Analysis

**Tool:** Typeform + Claude Code for analysis

**How it works:**
- **Post-workshop survey:** Typeform survey auto-sent via GHL 2 hours after workshop ends
- **Questions include:** NPS score, most valuable section, improvement suggestions, testimonial consent, interest in advanced services
- **Analysis:** Claude Code pulls survey responses via Typeform API, generates sentiment analysis report, identifies patterns across workshops
- **Action items:** Auto-generated improvement suggestions fed back into curriculum updates

**Cost:** $25/mo (Typeform Basic)

**Autonomy Level:** 90% autonomous
- Fully automated: survey distribution, response collection, analysis, reporting
- Human review: Brandon reads summary report (5 min per workshop)

---

### 3E. Testimonial Automation

**Tool:** GHL Workflows + Typeform + Claude Code

**How it works:**
1. Post-workshop survey includes: "Would you recommend this workshop?" + "Can we use your feedback as a testimonial?"
2. If NPS >= 9 AND testimonial consent = yes:
   - Auto-send follow-up email requesting a short video testimonial (with Loom link) or written quote
   - Reminder sent 3 days later if no response
3. Collected testimonials auto-added to:
   - Website testimonials section (via CMS or hardcoded)
   - Google Business Profile (with review link)
   - Social media posts (Claude Code formats testimonial into social post)
   - Cold email sequences (social proof)
4. Video testimonials auto-uploaded and embedded on landing pages

**Cost:** $0 incremental

**Autonomy Level:** 90% autonomous
- Fully automated: request, remind, collect, deploy to website/social
- Human review: Brandon approves which testimonials go on the site (2 min)

---

## 4. Curriculum Development

### 4A. AI-Assisted Curriculum Updates

**Tool:** Claude Code + Web Search

**How it works:**
- **Monthly curriculum review:** Claude Code searches for new AI tools, pricing changes, capability updates relevant to workshop content
- Generates a "Curriculum Update Report" comparing current deck content to latest AI landscape
- Flags outdated information: "Slide 14 references ChatGPT-4o pricing at $20/mo — it's now $25/mo"
- Suggests new demos, tools, or examples to add
- Updates workbook resource lists automatically

**Cost:** $0 incremental

**Autonomy Level:** 85% autonomous
- Fully automated: research, comparison, flagging, suggestion generation
- Human review: Brandon approves curriculum changes before next workshop (15 min)

---

### 4B. Automated Workbook Generation

**Tool:** Claude Code + Canva/Google Docs

**How it works:**
- Claude Code generates workbook content from workshop outline:
  - Step-by-step exercise instructions
  - "Try it yourself" practice prompts
  - Tool comparison charts
  - ROI calculator worksheets
  - Action plan templates
  - Resource links with QR codes
- Exported to Canva for professional formatting or Google Docs for quick iteration
- Customized per audience: contractor-focused, restaurant-focused, general small business

**Cost:** $0 incremental (Canva already counted)

**Autonomy Level:** 90% autonomous

---

### 4C. Slide Deck Creation

**Tool:** Gamma.app + Claude Code

**How it works:**
- Claude Code writes the slide outline with speaker notes
- Gamma.app renders it into a professional deck in 60 seconds
- City-specific customization: local business examples, local market data
- Export to PowerPoint for offline presenting or use Gamma's web presenter
- Versioning: each workshop gets a dated deck version

**Cost:** $0 incremental (Gamma already counted)

**Autonomy Level:** 90% autonomous

---

### 4D. Practice Exercise Generation

**Tool:** Claude Code

**How it works:**
- For each workshop topic, Claude Code generates:
  - 3 beginner exercises (guided, step-by-step)
  - 2 intermediate exercises (less hand-holding)
  - 1 advanced challenge (open-ended)
- Exercises tailored to attendee industries (pulled from registration data)
- Example: "You're an HVAC contractor. Write a prompt that generates a follow-up email for a customer whose AC unit you serviced last week."
- Answer keys generated for Brandon's reference

**Cost:** $0 incremental

**Autonomy Level:** 95% autonomous

---

### 4E. Resource List Curation

**Tool:** Claude Code + Web Search

**How it works:**
- Maintains a living "AI Tools for Small Business" resource list
- Auto-updated monthly with: new tools, price changes, discontinued tools, better alternatives
- Categorized by function: marketing, operations, customer service, finance
- Includes free tier availability, ease of use rating, and "best for" tags
- Formatted as a PDF handout + web page on learnandleverageai.com

**Cost:** $0 incremental

**Autonomy Level:** 95% autonomous

---

## 5. Financial & Admin

### 5A. Automated Invoicing & Receipts

**Tool:** Stripe + QuickBooks Simple Start

**How it works:**
- **Workshop tickets:** Stripe auto-generates receipts at purchase
- **Custom services (Concierge, etc.):** Stripe Invoicing sends professional invoices
- **QuickBooks integration:** Stripe transactions auto-sync to QuickBooks via native integration
- **Payment reminders:** Stripe auto-sends reminders for unpaid invoices (3 days, 7 days, 14 days)

**Cost:** $38/mo (QuickBooks Simple Start)

**Autonomy Level:** 100% autonomous

---

### 5B. Expense Tracking

**Tool:** QuickBooks + bank feed integration

**How it works:**
- Bank accounts and credit cards connected to QuickBooks
- Transactions auto-categorized (venue rental, travel, materials, software subscriptions)
- Receipt scanning via QuickBooks mobile app (snap photo → auto-matched to transaction)
- Monthly expense reports auto-generated

**Cost:** $0 incremental (QuickBooks already counted)

**Autonomy Level:** 90% autonomous
- Fully automated: transaction import, categorization, reporting
- Human review: Brandon reviews uncategorized transactions monthly (10 min)

---

### 5C. Revenue Reporting

**Tool:** QuickBooks + Google Sheets + Claude Code

**How it works:**
- QuickBooks tracks all revenue by source (workshop tickets, starter packs, services, retainers)
- Claude Code generates weekly revenue dashboards pulling from Stripe API + QuickBooks
- Metrics tracked: revenue per workshop, revenue per attendee, conversion rate, LTV, CAC
- Monthly P&L auto-generated in QuickBooks
- City-by-city profitability comparison once multi-city

**Cost:** $0 incremental

**Autonomy Level:** 95% autonomous

---

### 5D. Tax Documentation

**Tool:** QuickBooks + accountant access

**How it works:**
- QuickBooks categorizes all income and expenses throughout the year
- 1099 tracking for any contractors/speakers
- Quarterly estimated tax calculations auto-generated
- Year-end: export to accountant or TurboTax with one click
- Mileage tracking for travel to workshops (QuickBooks mobile)

**Cost:** $0 incremental

**Autonomy Level:** 85% autonomous (accountant handles filing)

---

## 6. Scaling to Multiple Cities

### 6A. City Replication Playbook (Minimal Manual Work)

**What happens when Brandon says "Launch in [New City]":**

| Step | Action | Who/What Does It | Time |
|------|--------|-------------------|------|
| 1 | Generate city landing page | Claude Code (auto-deploy to Vercel) | 5 min |
| 2 | Create local SEO content | Claude Code (5 blog posts + city page) | 15 min |
| 3 | Scrape local business leads | Outscraper/Instantly SuperSearch | 10 min |
| 4 | Launch cold email campaign | Instantly.ai (auto-sequence) | 5 min |
| 5 | Create Meta ad set for city | Claude Code + Meta API | 10 min |
| 6 | Set up GHL pipeline for city | GHL (duplicate existing pipeline) | 2 min |
| 7 | Send venue inquiry emails | Make.com + SendGrid (templated) | 2 min |
| 8 | Customize workshop deck | Claude Code + Gamma (local examples) | 10 min |
| 9 | Generate city-specific workbook | Claude Code + Canva | 10 min |
| **Total** | **New city fully launched** | **Mostly automated** | **~70 min** |

**Brandon's involvement: ZERO.** An agent handles the entire launch. Brandon just shows up to teach.

---

### 6B. Franchise / Licensing Model

**Option 1: Licensed Trainer Model ($2,000-$5,000 license fee + revenue share)**
- Brandon licenses his curriculum, brand, and systems to local trainers
- Trainers pay upfront license fee + 20-30% revenue share per workshop
- All marketing, registration, and follow-up handled by Brandon's automated systems
- Trainers just show up and teach using Brandon's materials
- Quality control via post-workshop surveys (auto-analyzed)

**Option 2: City Partner Model (50/50 split)**
- Local partner handles venue and local networking
- Brandon's systems handle everything else (marketing, registration, follow-up, payments)
- Revenue split 50/50
- Lower barrier to entry, faster expansion

**Option 3: Certification Program ($5,000-$10,000)**
- "Certified LearnAndLeverageAI Trainer" program
- 2-day train-the-trainer workshop (could be virtual)
- Graduates get: curriculum access, marketing templates, GHL sub-account, brand license
- Annual recertification ($1,000) keeps content current
- Brandon builds once, sells many times

**Recommended path:** Start with Option 2 (City Partner) for 2-3 cities to prove the model, then transition to Option 3 (Certification) for true scale.

---

### 6C. Train-the-Trainer via AI

**Tool:** Claude Code + HeyGen + LearnWorlds/Teachable

**How it works:**
- Claude Code generates the trainer manual (step-by-step guide for delivering each workshop module)
- HeyGen creates AI avatar training videos of Brandon explaining each section (already have HeyGen API key)
- Trainers access a self-paced online course (LearnWorlds or Teachable, $39-$99/mo)
- Quarterly live Q&A with Brandon (Zoom, 1 hour)
- Trainers certified after completing course + delivering a practice workshop (recorded and reviewed)

**Cost:** $39-$99/mo (course platform)

**Autonomy Level:** 80% autonomous
- Fully automated: course content, trainer onboarding, certification tracking
- Human review: Brandon reviews practice workshop recordings (30 min per trainer)

---

### 6D. Virtual / Hybrid Extension

**Tool:** Zoom + existing registration system + replay infrastructure

**How it works:**
- **Live virtual workshops:** Same curriculum, delivered via Zoom, $197-$297 ticket
- **Hybrid option:** In-person attendees + Zoom attendees simultaneously
- **Replay product:** Recorded workshops sold as $97-$197 self-paced course
- **Scaling math:**
  - In-person: capped at 20-40 per workshop (venue limited)
  - Virtual: unlimited attendees per session
  - Replay: unlimited, passive income forever
- Registration, payment, and follow-up all use the same GHL workflows

**Revenue multiplier:** One workshop becomes 3 revenue streams (live in-person, live virtual, replay).

---

## 7. Complete Tool Stack

### Already In Brandon's Stack (No New Purchases)

| Tool | Current Use | Workshop Use |
|------|-------------|-------------|
| GoHighLevel | 6 sub-accounts active | CRM, pipeline, email/SMS, chatbot, voice AI |
| Vercel | All web projects | Workshop landing pages, city pages |
| SendGrid | Transactional email | Confirmation, reminders, receipts |
| Stripe | Payment processing | Workshop tickets, starter packs |
| DataForSEO | SEO research | Local keyword research |
| PostHog | Analytics | Landing page optimization |
| Claude Code | Development + content | Everything: code, content, curriculum, analysis |
| OpenClaw | Autonomous agents | Marketing content, research, monitoring |
| HeyGen | AI video | Promo videos, trainer training |
| ElevenLabs | Voice/TTS | Audio content, voiceovers |
| fal.ai | Image/video generation | Ad creatives, social images |
| Google Workspace | Docs, Sheets, Calendar | Venue tracking, materials, scheduling |

### New Tools Needed

| Tool | Purpose | Cost | Priority |
|------|---------|------|----------|
| Instantly.ai (Hypergrowth) | Cold email at scale | $97/mo | HIGH — primary lead gen |
| Gamma.app (Pro) | Slide deck generation | $15/mo | MEDIUM — can use free tier initially |
| Canva Pro | Workbook/handout design | $13/mo | MEDIUM — can use free tier initially |
| QuickBooks Simple Start | Accounting/invoicing | $38/mo | HIGH — need financial tracking |
| Typeform (Basic) | Post-workshop surveys | $25/mo | MEDIUM — can use Google Forms free |
| Make.com (Pro) | Automation glue between tools | $16/mo | HIGH — connects everything |
| Buffer or Publer | Social media scheduling | $0-$15/mo | LOW — GHL Social Planner may suffice |

### Optional / Future Tools

| Tool | Purpose | Cost | When Needed |
|------|---------|------|-------------|
| Expandi/Dripify | LinkedIn automation | $79-$99/mo | When LinkedIn becomes primary channel |
| LearnWorlds/Teachable | Trainer certification course | $39-$99/mo | When launching franchise model |
| Outscraper | Local business lead scraping | $0.002/record | When scaling to new cities |
| Loom | Video testimonial collection | $0 (free tier) | Immediately (free) |
| Calendly/Cal.com | If GHL calendar insufficient | $0-$12/mo | Probably never (GHL has this) |

---

## 8. Autonomy Scorecard

| Business Function | Autonomy % | Brandon's Time/Month |
|-------------------|-----------|---------------------|
| Social media content | 95% | 0 min (optional 20 min review) |
| Meta ad management | 80% | 20 min (budget review) |
| Cold email outreach | 90% | 10 min (approve new city lists) |
| LinkedIn engagement | 70% | 15 min (post pre-written content) |
| SEO content | 95% | 0 min |
| Landing pages | 90% | 0 min |
| CRM/Pipeline | 95% | 0 min |
| Email/SMS sequences | 100% | 0 min |
| Chatbot/Voice AI | 95% | 0 min |
| Payments | 100% | 0 min |
| Waitlist | 100% | 0 min |
| Upsell sequences | 100% | 0 min |
| Venue booking | 75% | 5 min (confirm selection) |
| Attendee comms | 100% | 0 min |
| Materials prep | 85% | 15 min (review deck) |
| Feedback collection | 90% | 5 min (read summary) |
| Testimonials | 90% | 2 min (approve) |
| Curriculum updates | 85% | 15 min (approve changes) |
| Workbook generation | 90% | 0 min |
| Slide decks | 90% | 15 min (review) |
| Invoicing/receipts | 100% | 0 min |
| Expense tracking | 90% | 10 min (monthly review) |
| Revenue reporting | 95% | 5 min (read report) |
| Tax docs | 85% | 0 min (accountant handles) |
| New city launch | 90% | 0 min (agents handle it) |
| **TOTAL** | **~91%** | **~2.3 hours/month** |

**Brandon's actual time commitment per workshop:**
- Teaching the workshop: 4-5 hours (the ONLY non-automatable part)
- Admin/review overhead: ~30 min per workshop
- Monthly system oversight: ~2 hours

**Total time per month (assuming 2 workshops):** ~12 hours
- 10 hours teaching (the value-add)
- 2 hours oversight (skimmable)

---

## 9. Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Set up GHL sub-account for LearnAndLeverageAI workshops
- [ ] Build GHL pipeline (8 stages as defined above)
- [ ] Build all email/SMS sequences in GHL Workflows
- [ ] Set up Stripe checkout for workshop tickets
- [ ] Configure GHL Conversation AI chatbot
- [ ] Set up QuickBooks + connect Stripe

### Phase 2: Lead Generation (Week 2-3)
- [ ] Launch Instantly.ai cold email campaigns for first city
- [ ] Deploy 3 city-specific SEO landing pages
- [ ] Set up Meta ad campaigns with AI-generated creatives
- [ ] Build content calendar and auto-posting workflow
- [ ] Configure Make.com scenarios connecting all tools

### Phase 3: Operations (Week 3-4)
- [ ] Build venue database (Google Sheet) for target cities
- [ ] Create venue inquiry automation in Make.com
- [ ] Generate first workshop deck in Gamma.app
- [ ] Generate first workshop workbook
- [ ] Set up Typeform post-workshop survey
- [ ] Build testimonial collection workflow

### Phase 4: First Workshop (Week 4-5)
- [ ] Run first automated workshop end-to-end
- [ ] Collect feedback, analyze results
- [ ] Iterate on sequences and materials based on data

### Phase 5: Scale (Month 2+)
- [ ] Launch second city (using the 70-min playbook)
- [ ] Launch third city
- [ ] Evaluate franchise/licensing model
- [ ] Build trainer certification course if demand exists

---

## 10. Revenue Model

### Per Workshop Economics

| Item | Amount |
|------|--------|
| Ticket price (in-person) | $97-$197 |
| Attendees per workshop | 20-40 |
| **Ticket revenue** | **$1,940 - $7,880** |
| AI Starter Pack upsell ($497) | 15% conversion = 3-6 sales |
| **Upsell revenue** | **$1,491 - $2,982** |
| Service upsell ($1,000-$5,000) | 5% conversion = 1-2 sales |
| **Service revenue** | **$1,000 - $10,000** |
| **Total revenue per workshop** | **$4,431 - $20,862** |

### Per Workshop Costs

| Item | Amount |
|------|--------|
| Venue rental | $200-$500 |
| Printed materials | $50-$100 |
| Brandon's travel (if not local) | $0-$300 |
| Pro-rated tool costs (~$688/mo / 4 workshops) | $172 |
| Ad spend (allocated) | $250-$500 |
| **Total cost per workshop** | **$672 - $1,572** |

### Monthly Projections (4 workshops/month at scale)

| Scenario | Workshops | Revenue | Costs | Profit |
|----------|-----------|---------|-------|--------|
| Conservative | 2/mo | $8,862 | $3,032 | $5,830 |
| Moderate | 4/mo | $26,586 | $5,376 | $21,210 |
| Aggressive (multi-city) | 8/mo | $53,172 | $9,064 | $44,108 |

---

## 11. What Cannot Be Automated (Brandon's Core Value)

These are the things that REQUIRE Brandon and are his competitive moat:

1. **Teaching the workshop** — his personality, energy, and ability to read the room
2. **Live Q&A** — authentic, experience-based answers to attendee questions
3. **Relationship building** — handshakes, conversations, trust that leads to high-ticket sales
4. **Strategic decisions** — which cities to expand to, pricing changes, brand direction
5. **High-touch sales** — closing $5,000+ Concierge deals on the phone

Everything else listed in this document can and should run without him.

---

## Appendix: Integration Map

```
Lead Sources                    CRM & Pipeline              Fulfillment
─────────────                   ──────────────              ───────────
Meta Ads ──────┐
Cold Email ────┤
LinkedIn ──────┼──→ GHL CRM ──→ GHL Workflows ──→ Email/SMS Sequences
SEO Pages ─────┤      │              │                    │
Website Chat ──┤      │              │                    ├──→ Registration Confirm
Voice AI ──────┘      │              │                    ├──→ Pre-Workshop Reminders
                      │              │                    ├──→ Post-Workshop Follow-up
                      ▼              │                    └──→ Upsell Sequences
                  Pipeline           │
                  Tracking           ▼
                      │         Stripe Checkout ──→ QuickBooks
                      │              │
                      │              ▼
                      │         Receipt + Invoice
                      │
                      ▼
                  Analytics
                  (PostHog +
                   GHL Reports +
                   Claude Code)

Content Engine                  Operations
──────────────                  ──────────
Claude Code ──→ Blog Posts      Make.com ──→ Venue Booking
            ──→ Social Posts               ──→ Materials Prep
            ──→ Ad Creatives               ──→ Survey Distribution
            ──→ Email Copy                 ──→ Testimonial Collection
            ──→ Workbooks
            ──→ Slide Decks
Gamma.app ────→ Presentations
Canva Pro ────→ Formatted PDFs
HeyGen ───────→ Promo Videos
fal.ai ───────→ Ad Images
```
