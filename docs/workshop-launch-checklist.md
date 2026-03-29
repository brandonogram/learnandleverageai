# Workshop Launch Checklist — LIVE TRACKER

**Event:** Free AI Hands-On Workshop
**Date:** Thursday, April 2, 2026, 6:00-8:00 PM
**Venue:** Hilton Christiana, 100 Continental Dr, Newark, DE 19713
**Goal:** 25 attendees → $25K+ in on-the-spot upsells

Last audited: 2026-03-29 08:00 AM ET by Claude Code (cron ws-audit)

**AUDIT NOTES (Mar 29 8AM):** 4 days out. 2 registrations. $250.52 spent on Meta. Overnight session: deployed CRO fixes (venue photo, social proof bar, deadline extension to Apr 1, "Prompt Engineering" removed from agenda), created /ai-for-beginners SEO page, drafted 9 new outreach emails + 5 follow-ups + Craigslist/Reddit posts. 13 event calendar sites identified for submission. Git push access fixed (brandonbot67 invited as collaborator). All remaining unchecked items still need Brandon except event calendar submissions which Claude will do today.

**STATUS: 2 registrations. $250.52 spent (Meta $15/day + LinkedIn $25/day). 558 LPV. 4 days out. CRO fixes deployed. Outreach emails + event calendar submissions ready for today. Brandon's personal posts remain the highest-leverage unpulled action.**

---

## INFRASTRUCTURE

- [x] Landing page built (`/workshops`) — deployed to Vercel
- [x] Landing page CRO overhaul — form reduced 7→3 fields, value stack, Hormozi headline ✅ (Mar 23-24)
- [x] Landing page updated with confirmed venue + date + countdown timer ✅ (Mar 24)
- [x] Registration form working — 3 fields (name, email, phone) → GHL contact + pipeline ✅ (Mar 23)
- [x] Registration confirmation email + SMS — AgentMail + Twilio ✅ (Mar 22)
- [x] Confirmation email redesigned — clean left-aligned, amber CTA, calendar links ✅ (Mar 23-24)
- [x] Calendar links — Google Calendar + .ics download in success state + confirmation email ✅ (Mar 24)
- [x] State-aware SMS handler — lifecycle-based responses, conversation closers ✅ (Mar 24)
- [x] State-aware voice handler — caller lookup, personalized greeting ✅ (Mar 24)
- [x] Email auto-reply handler — AgentMail webhook, state-aware ✅ (Mar 24)
- [x] GHL phone lookup bug fixed — `number=` instead of `phone=` ✅ (Mar 24)
- [x] Anti-hallucination prompts on all handlers ✅ (Mar 24)
- [x] GHL sub-account, pipeline, custom fields, tags ✅ (Mar 22-23)
- [x] GHL email templates (17) + custom values (5) created via API ✅ (Mar 23)
- [x] GHL chat widget added to all pages ✅ (Mar 24)
- [x] Terms of Service page (`/terms`) ✅ (Mar 24)
- [x] Privacy Policy page (`/privacy`) ✅ (Mar 24)
- [x] Stripe products (5) + payment links (8) ✅ (Mar 22)
- [x] Meta Pixel + PostHog + GA4 analytics ✅ (Mar 22)
- [x] UTM parameter capture → GHL tags ✅ (Mar 22)
- [x] QR codes for upsell handout ✅ (Mar 22)
- [ ] GHL A2P registration — **IN PROGRESS** (Brandon started Mar 24, pending review)
- [ ] GHL phone number — BLOCKED by A2P approval
- [ ] GHL workflows (7) — NEEDS GHL UI (~45 min). Guide at `docs/ghl-api-setup-results.md`. **BRANDON.** CDP automation blocked by GHL. Priority: Pre-Workshop Reminders (before Apr 2), rest can be built after workshop.
- [ ] GHL Conversation AI chatbot — BLOCKED: UI-only config
- [ ] Post-workshop survey — BLOCKED: No Typeform creds. **BRANDON: 5 min in Typeform UI.**

## VENUE

- [x] Hilton Christiana CONFIRMED — April 2, 6-8:30 PM ✅ (Mar 24)
- [x] Classroom style, 25 people (30 max), LCD projector, screen, Wi-Fi, power ✅
- [x] Free parking (400+ spaces), complimentary water ✅
- [x] $307.50 total ($250 + 23% event fee). Payment due March 30. ✅
- [x] Contact: Theresa Langan, tlangan@hiltonchristiana.com, (302) 631-1543 ✅
- [x] **Hilton paid** ✅ (Mar 25)

## MARKETING

- [x] FB/X posts live (Mar 21)
- [x] Meta video ads (5 variants, 4 active) ✅ (Mar 22)
- [x] Meta ad campaign LIVE — $50/day, $156 spent, 6.5% CTR ✅
- [x] LinkedIn ad campaign LIVE — $25/day, Lead Gen Form, targeting JPMorgan/Capital One/DuPont/AstraZeneca managers+ in NCC ✅ (Mar 25)
- [x] LinkedIn posts written (5 posts) — `marketing/linkedin-posts-ready.md` ✅
- [x] Nextdoor posts written (2 posts) ✅
- [ ] **LinkedIn Post 1 POSTED** — Brandon edited copy, needs to paste and post. **BRANDON.** (30 sec)
- [ ] Nextdoor posts POSTED — **BRANDON.** (2 min)
- [ ] Facebook follow-up posts — **BRANDON.**
- [ ] Eventbrite listing — venue confirmed, can create now. reCAPTCHA may block automation.
- [x] Send venue update texts to Steven + Adam — SENT via Twilio ✅ (Mar 25)

## TRAINING MATERIALS

- [x] Training plan ✅
- [x] 2-hour workshop outline (simplified for beginners) ✅ (Mar 25)
- [x] Free session Gamma deck (28 slides) ✅
- [x] Paid workshop Gamma deck (55 slides) ✅
- [x] Speaker guides (free + paid) ✅
- [x] Workshop workbook + print-ready HTML ✅
- [x] Upsell handout + print-ready ✅
- [x] "Get company to pay" template ✅
- [x] AI tool reference card + print-ready ✅

## POST-WORKSHOP SYSTEMS

- [ ] Typeform survey — **BRANDON.** (5 min)
- [ ] GHL workflows for post-workshop sequences — **BRANDON.** (needs UI)

## META / FACEBOOK / INSTAGRAM

- [x] Facebook page created + configured ✅ (Mar 22)
- [x] FB cover photo uploaded via Chrome CDP ✅ (Mar 24)
- [x] Instagram @learnandleverageai — profile pic + bio ✅ (Mar 23)
- [x] Meta ad campaign LIVE ✅
- [ ] FB profile picture upload — **BRANDON** from phone (30 sec)
- [ ] FB CTA button — **BRANDON** (1 min)
- [ ] IG website + display name — **BRANDON** via mobile (2 min)

## VOICE / PHONE

- [x] Twilio number +13024166285 ✅
- [x] A2P 10DLC on Twilio ✅
- [x] Custom voice agent ✅
- [x] GHL Voice AI agent created via API ✅
- [ ] GHL A2P registration — **RESUBMITTED** Mar 26 with checkbox, consent language, DBA, compliance fixes. Pending review.
- [ ] GHL phone number — blocked by A2P

## CAMPAIGN PERFORMANCE (as of Mar 29 8AM audit)

**Meta Ads (all-time):**
- Impressions: 20,272 | Reach: 11,535 | Spend: $250.52
- Link clicks: 684 | Landing views: 558 | CPC: $0.19 | CTR: 6.5%
- Video views: 6,701
- **2 registrations** (Steven Tusio + Adam Bates)
- Cost per registration: $125.26
- Conversion rate: 0.36% (558 LPV → 2 registrations)
- Budget: reduced from $50/day to $15/day on Mar 27

**LinkedIn Ads (started Mar 25):**
- $25/day, targeting JPMorgan/Capital One/DuPont/AstraZeneca managers+ in NCC
- Lead Gen Form → Zapier → /api/linkedin-lead → GHL (auto)
- Pipeline tested and working
- No real LinkedIn leads yet

**CRO Changes (deployed Mar 25 + Mar 29):**
- Mar 25: Phone optional, A/B test (hero-form-v1), company mentions, SMS consent checkbox
- Mar 29: Venue photo added, social proof bar (company names), registration deadline extended to Apr 1, "Prompt Engineering" removed from agenda, /ai-for-beginners SEO page deployed
- 558 LPV total, 0 new conversions since CRO changes — page conversion remains the bottleneck

**Organic Outreach (started Mar 27):**
- 33+ emails sent to local orgs (Rotary, chambers, alumni, media, professional associations)
- 1 real reply: DE SHRM — speaker application invited
- 7 bounces logged (Delaware Today, Patch x2, FEWDE, 1313 Innovation, SCORE, DE SBC)
- 1 auto-reply: Emerging Enterprise Center
- 1 DO NOT CONTACT: Chris Glanden (barcodesecurity.com)
- 9 new outreach emails drafted for today: PMI-DVC, DE State Chamber, Tech Council, etc.
- 5 follow-up emails drafted for non-responders
- Reddit, Craigslist posts drafted
- 13 free event calendar sites identified for submission today

---

## BRANDON ACTION ITEMS (4 days out — CRITICAL)

**TODAY (Saturday Mar 29) — highest-impact, no cost:**
1. [ ] **Post LinkedIn Post 1** (30 sec — copy at marketing/brandon-personal-posts-draft.md) — STILL NOT DONE
2. [ ] **Post Facebook casual invite** (30 sec — copy at marketing/brandon-personal-posts-draft.md)
3. [ ] **Post in 2-3 Delaware FB groups** (2 min — copy at marketing/facebook-group-posts.md)
4. [ ] **Text 5-10 people you know** — "Hey, free AI workshop Thursday at the Hilton in Newark. Know anyone who'd benefit?"
5. [ ] **Approve outreach emails** so Claude can send them mid-morning (drafts at marketing/final-push-outreach-mar28.md)

**Monday March 31 — face-to-face networking:**
6. [ ] **Attend "Get Down to Business"** at Chase Center (8:30 AM) — hand out flyers
7. [ ] **Attend DEBCC Workshop** (11 AM) — network and invite
8. [ ] **Post in 2-3 more FB groups** with "2 days away" urgency

**Quick wins (2 min each):**
9. [ ] Upload FB profile pic from phone (30 sec)
10. [ ] Set FB CTA button (1 min)
11. [ ] Set IG website + display name via mobile (2 min)

**When you have 45 min:**
12. [ ] Build GHL pre-workshop reminder workflow (priority — need before Apr 2)
13. [ ] Create Typeform survey from spec at docs/typeform-survey.md (5 min)
