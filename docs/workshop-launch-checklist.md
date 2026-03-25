# Workshop Launch Checklist — LIVE TRACKER

**Event:** Free AI Hands-On Workshop
**Date:** Thursday, April 2, 2026, 6:00-8:00 PM
**Venue:** Hilton Wilmington/Christiana, 100 Continental Dr, Newark, DE 19713
**Goal:** 25 attendees → $25K+ in on-the-spot upsells

Last audited: 2026-03-24 2:30 AM by Claude Code

**STATUS: 2 real registrations (Steven Tusio, Adam Bates) from Meta ads. $71.81 spent. Page converting after Hormozi overhaul.**

---

## INFRASTRUCTURE

- [x] Landing page built (`/workshops`) — deployed to Vercel
- [x] Landing page CRO overhaul — form reduced 7→3 fields, hero mini-form, rich success state ✅ (Mar 23)
- [x] All dates updated on landing page — "Thursday, April 2" with venue details + countdown timer ✅ (Mar 24)
- [x] Registration form working — 3 fields (name, email, phone) → GHL contact + pipeline ✅ (Mar 23)
- [x] Registration confirmation email + SMS — AgentMail + Twilio, fires on submit ✅ (Mar 22)
- [x] Confirmation email P.S. removed per Brandon ✅ (Mar 23)
- [x] Confirmation email/SMS updated with venue — "Thursday, April 2, Hilton Wilmington/Christiana" ✅ (Mar 24)
- [x] Hormozi landing page overhaul — new headline, removed mini-form, value stack section, CTA flow ✅ (Mar 24)
- [x] Confirmation email redesigned — clean left-aligned format, amber CTA button, shorter copy ✅ (Mar 23)
- [x] State-aware SMS handler — looks up contact tags, responds contextually by lifecycle stage ✅ (Mar 24)
- [x] State-aware voice handler — caller lookup on first ring, personalized greeting ✅ (Mar 24)
- [x] Email auto-reply handler — new /api/email-inbound route with AgentMail webhook ✅ (Mar 24)
- [x] GHL phone lookup bug fixed — `number=` instead of `phone=` in search/duplicate API ✅ (Mar 24)
- [x] Anti-hallucination prompts — SMS/email/voice handlers use explicit facts-only lists ✅ (Mar 24)
- [x] Conversation closer detection — "sounds good", "ok" etc get no SMS reply ✅ (Mar 24)
- [x] GHL sub-account active (PIT: pit-9c5383fc, Location: AVkeTAjBMKyrH5q0f7bQ)
- [x] GHL pipeline created (8 stages, ID: Lb2EtR2nnxlLGRWCwBpD)
- [x] GHL custom fields created (7 fields including Company, Job Title, Biggest AI Challenge dropdown)
- [x] GHL tags created (22 tags total)
- [x] GHL email templates created via API (17 templates) ✅ (Mar 23)
- [x] GHL custom values/merge fields created via API (5 fields) ✅ (Mar 23)
- [ ] GHL workflows (7 workflows) — NEEDS GHL UI (~45 min). Email templates + copy ready. Step-by-step guide at `docs/ghl-api-setup-results.md`. **BRANDON ACTION.**
- [ ] GHL Conversation AI chatbot — BLOCKED: UI-only config. Knowledge base ready at docs/ghl-workshop-setup.md
- [ ] GHL phone number — BLOCKED: Identity verification required in GHL UI before purchase. No 302 numbers available; toll-free selected.
- [x] Stripe products created (5 products, 8 payment links) ✅ (Mar 22)
- [x] Meta Pixel installed (1494764092013977) ✅ (Mar 22)
- [x] PostHog analytics installed (Project 352506) ✅ (Mar 22)
- [x] GA4 + PostHog + Meta Pixel conversion events — form funnels, CTA clicks, FAQ, scroll depth ✅ (Mar 22)
- [x] UTM parameter capture → sessionStorage → GHL tags ✅ (Mar 22)
- [ ] Post-workshop survey — BLOCKED: No Typeform API creds. Full spec at docs/typeform-survey.md. **BRANDON: create in Typeform UI (5 min) or provide API token.**
- [x] QR codes generated for upsell handout — 8 PNGs ✅ (Mar 22)

## VENUE

- [x] Hilton Christiana contacted ✅ (Mar 22)
- [x] DoubleTree Wilmington contacted ✅ (Mar 22)
- [x] Embassy Suites Newark contacted ✅ (Mar 22)
- [x] Meeting room booked — Hilton Wilmington/Christiana CONFIRMED ✅ (Mar 24)
- [x] Confirm: LCD projector, screen, Wi-Fi, power outlets, free parking (400+ spaces) ✅ (Mar 24)
- [x] Venue includes: complimentary water, classroom style, 25 people (30 max) ✅ (Mar 24)
- [x] Venue contact: Theresa Langan, tlangan@hiltonchristiana.com, (302) 631-1543 ✅ (Mar 24)
- [x] Room available until 8:30 PM (30 min buffer for conversations) ✅ (Mar 24)
- [x] Landing page + emails updated with confirmed venue + date ✅ (Mar 24)

## MARKETING

- [x] FB video post live (Mar 21)
- [x] X post live (Mar 21)
- [x] Marketing copy written for all channels ✅ (Mar 21)
- [x] Meta video ads rendered (5 variants) ✅ (Mar 22)
- [x] Meta ad campaign LIVE on LLAI account — 4 active ads (Ad 1 paused, underperformer), $50/day, Campaign ID: 120240967900010757 ✅ (Mar 22, budget increased Mar 23)
- [x] Ad 1 (Pain Point) paused — $0.50 CPC, 2.5% CTR ✅ (Mar 23)
- [x] LinkedIn posts written (5 posts, date-free) — `marketing/linkedin-posts-ready.md` ✅ (Mar 23)
- [x] Nextdoor posts written (2 posts, date-free) — `marketing/linkedin-posts-ready.md` ✅ (Mar 23)
- [ ] LinkedIn posts POSTED by Brandon — **BRANDON ACTION** (copy-paste from marketing/linkedin-posts-ready.md, 30 sec each)
- [ ] Nextdoor posts POSTED by Brandon — **BRANDON ACTION** (copy-paste, 2 min)
- [ ] Facebook follow-up posts POSTED by Brandon — **BRANDON ACTION** (copy from marketing/workshop-launch-assets.md)
- [ ] Eventbrite listing — DEFERRED until venue confirmed. reCAPTCHA blocks automation.

## TRAINING MATERIALS

- [x] Training plan (docs/workshop-ai-hands-on-plan.md)
- [x] Free session Gamma deck (28 slides) — https://gamma.app/docs/mllj75rz6s5sve6
- [x] Paid workshop Gamma deck (55 slides) — https://gamma.app/docs/u7s9ime9g1h1mrw
- [x] Free session speaker guide ✅
- [x] Paid workshop speaker guide ✅
- [x] Workshop workbook ✅
- [x] Upsell handout ✅
- [x] "Get company to pay" template ✅
- [x] AI tool reference card ✅
- [x] Upsell handout print-ready (docs/workshop-materials/upsell-handout-print.html) ✅ (Mar 22)
- [x] Reference card print-ready (docs/workshop-materials/reference-card-print.html) ✅ (Mar 22)
- [x] Workbook print-ready HTML (docs/workshop-materials/workbook-print.html, 1794 lines) — open in browser, Ctrl+P to PDF ✅ (Mar 23)

## VIDEO ADS

- [x] FFmpeg pipeline built ✅
- [x] fb-workshop-ad-v1.mp4 ✅
- [x] fb-workshop-ad-executive.mp4 ✅
- [x] fb-workshop-ad-urgency.mp4 ✅
- [x] fb-workshop-ad-career.mp4 ✅
- [x] fb-workshop-ad-short.mp4 ✅

## POST-WORKSHOP SYSTEMS

- [ ] Typeform survey built — BLOCKED: No API creds. Spec at docs/typeform-survey.md. **BRANDON ACTION.**
- [ ] Typeform → GHL webhook — blocked by survey
- [ ] Testimonial collection workflow — needs GHL UI workflows
- [ ] Referral program workflow — needs GHL UI workflows
- [ ] Upsell follow-up sequence — email templates created, needs GHL UI workflow

## META / FACEBOOK / INSTAGRAM

- [x] Facebook Business Page created (ID: 957593034113587) ✅ (Mar 22)
- [x] Page added to Business Manager ✅ (Mar 22)
- [x] Page phone: (302) 416-6285 ✅ (Mar 22)
- [x] Page email: info@learnandleverageai.com ✅ (Mar 22)
- [x] Page website: learnandleverageai.com ✅ (Mar 22)
- [x] Meta Pixel installed ✅ (Mar 22)
- [x] Profile picture v4 designed (brand logo with ampersand) ✅ (Mar 23)
- [x] Cover photo v4 designed (branded banner) ✅ (Mar 23)
- [ ] Profile picture uploaded to FB page — **BRANDON MANUAL** (1 min). Download: https://files.catbox.moe/v7ycju.png
- [ ] Cover photo uploaded to FB page — **BRANDON MANUAL** (1 min). Download: https://files.catbox.moe/8momff.png
- [ ] CTA button: "Sign Up" → learnandleverageai.com/workshops — **BRANDON MANUAL** (1 min)
- [x] Instagram @learnandleverageai created + linked to portfolio ✅ (Mar 23 — Brandon created)
- [x] Instagram profile pic uploaded (brand logo) ✅ (Mar 23 — Claude via Chrome CDP)
- [x] Instagram bio set ✅ (Mar 23 — Claude via Chrome CDP)
- [ ] Instagram website link — needs mobile app or Meta Business Suite
- [ ] Instagram display name → "Learn & Leverage AI" — needs mobile app
- [x] Meta ad campaign LIVE — 4 active ads, $50/day ✅ (Mar 22-23)

## VOICE / PHONE

- [x] Twilio number purchased: +13024166285 (302-416-6285) ✅
- [x] A2P 10DLC messaging service configured ✅ (Mar 22)
- [x] Custom voice agent at /api/voice-inbound — Twilio webhook, Groq LLM ✅
- [x] GHL Voice AI agent created via API (ID: 69c08755d5cbc88fcd870d8c) ✅ (Mar 23)
- [ ] GHL phone number assignment — BLOCKED: Twilio number not importable, GHL number purchase needs identity verification

## CAMPAIGN PERFORMANCE (as of Mar 24, 2:30 AM)

- Impressions: 6,267 | Reach: 4,808 | Spend: $71.81
- Link clicks: 206 | Landing views: 165 | CPC: $0.18 | CTR: 6.5%
- Video views: 2,038
- **Ad 2 (Social Proof)** winning: $0.12 CPC, 9.4% CTR
- **2 real registrations** (Steven Tusio + Adam Bates) — both from Meta ads after Hormozi page update
- Cost per registration: $35.90
- Conversion rate: 1.2% (165 LPV → 2 registrations)

---

## BRANDON ACTION ITEMS (prioritized)

**This week (critical):**
1. [x] **Venue confirmed** — Hilton Wilmington/Christiana ✅ (Mar 24)
2. [ ] **Post LinkedIn Post 1** from marketing/linkedin-posts-ready.md (30 sec)
3. [ ] **Upload FB profile pic + cover photo** via Business Suite — downloads above (2 min)
4. [ ] **Set FB CTA button** "Sign Up" → learnandleverageai.com/workshops (1 min)

**When you have 45 min:**
5. [ ] **Build 7 GHL workflows** — step-by-step at docs/ghl-api-setup-results.md
6. [ ] **Complete GHL identity verification** — Settings > Phone System > Add Number > Begin Verifying
7. [ ] **Create Typeform survey** from spec at docs/typeform-survey.md (5 min)

**Quick wins:**
8. [ ] Set IG website + display name via mobile app (2 min)
9. [ ] Post Nextdoor posts from marketing/linkedin-posts-ready.md (2 min)
10. [ ] Review free session Gamma deck (10 min)

---
*Last audit: 2026-03-25 01:47 UTC by elon (morning audit)*
*Status: 9 days to workshop. Venue CONFIRMED. 2 registrations. $71.81 Meta spend.*
