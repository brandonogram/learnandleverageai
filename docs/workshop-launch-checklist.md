# Workshop Launch Checklist — LIVE TRACKER

**Event:** Free AI Hands-On Workshop
**Date:** Thursday, April 2, 2026, 6:00-8:00 PM
**Venue:** Hilton Christiana, 100 Continental Dr, Newark, DE 19713
**Goal:** 25 attendees → $25K+ in on-the-spot upsells

Last audited: 2026-03-28 06:07 PM ET by Elon (cron ws-audit-0002-4a5b-9c0d-llaiauditjob)

**AUDIT NOTES (Mar 28 6PM):** 5 days to workshop. 2 registrations. No change from prior audit. All remaining unchecked items require Brandon directly. No new automatable items. GHL workflows and Typeform survey remain the two highest-impact Brandon actions. No new ESCALATIONS needed.

**AUDIT NOTES (Mar 28 6PM):** 5 days to workshop. 2 registrations. No new automatable items completable from this cron. All remaining unchecked items require Brandon directly (posts from personal profile, GHL UI workflows, Typeform survey, Eventbrite with reCAPTCHA). ESCALATIONS.md reviewed — venue resolved, no new escalations needed. LLAI priority remains correct: registrations + promotion are the only lever left.

**STATUS: 2 registrations. $243 spent (Meta $15/day) + LinkedIn $25/day. 544 LPV. 5 days out. Organic outreach ACTIVE: 33 emails sent to orgs/media/alumni, 1 reply (DE SHRM — speaker app invited), Nextdoor post live, AI tips page deployed, Eventbrite draft created (needs phone verify). Personal posts (LinkedIn, FB) still need Brandon.**

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

## CAMPAIGN PERFORMANCE (as of Mar 27 10AM audit)

**Meta Ads:**
- Impressions: 17,800+ | Spend: $219
- Link clicks: 620+ | Landing views: 501 | CPC: $0.18 | CTR: 6.6%
- Video views: 5,800+
- **2 registrations** (Steven Tusio + Adam Bates)
- Cost per registration: $109.50
- Conversion rate: 0.4% (501 LPV → 2 registrations)

**LinkedIn Ads (started Mar 25):**
- $25/day, targeting JPMorgan/Capital One/DuPont/AstraZeneca managers+ in NCC
- Lead Gen Form → Zapier → /api/linkedin-lead → GHL (auto)
- Pipeline tested and working
- No real LinkedIn leads yet

**CRO Changes (deployed Mar 25):**
- Phone optional, A/B test (hero-form-v1), company mentions, SMS consent checkbox
- 100+ new LPV since CRO deploy, 0 new conversions — CRO changes have NOT improved conversion rate

---

## BRANDON ACTION ITEMS (6 days out — CRITICAL)

**RIGHT NOW — these are the highest-impact actions and cost nothing:**
1. [ ] **Post LinkedIn Post 1** (30 sec — copy at marketing/linkedin-posts-ready.md) — STILL NOT DONE
2. [ ] **Post Nextdoor posts** (2 min — copy at marketing/linkedin-posts-ready.md)
3. [ ] **Post in 2-3 Delaware FB groups** (2 min — copy at marketing/facebook-group-posts.md)
4. [ ] **Send 5 outreach emails** to Rotary/Chamber (5 min — copy at marketing/outreach-emails-rotary-chamber.md)
5. [ ] **Register for March 31 events** — Get Down to Business (Chase Center 8:30 AM) + DEBCC Workshop (11 AM). Print flyers at marketing/workshop-flyer.png.

**This week:**
6. [ ] Upload FB profile pic from phone (30 sec)
7. [ ] Set FB CTA button (1 min)
8. [ ] Set IG website + display name via mobile (2 min)
9. [ ] Record a Cap.so video for social (5 min)

**When you have 45 min:**
10. [ ] Build 7 GHL workflows — guide at docs/ghl-api-setup-results.md
11. [ ] Create Typeform survey from spec at docs/typeform-survey.md (5 min)
