# Workshop Launch Checklist — LIVE TRACKER

**Event:** Free AI Hands-On Workshop
**Date:** Thursday, April 2, 2026, 6:00-8:00 PM
**Venue:** Hilton Christiana, 100 Continental Dr, Newark, DE 19713
**Goal:** 25 attendees → $25K+ in on-the-spot upsells

Last audited: 2026-03-25 by Claude Code

**STATUS: 2 registrations (Steven Tusio, Adam Bates). $119.95 spent. 280 LPV, 0.7% conversion rate. 8 days out.**

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
- [ ] GHL workflows (7) — NEEDS GHL UI (~45 min). Guide at `docs/ghl-api-setup-results.md`. **BRANDON.**
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
- [ ] GHL A2P registration — **IN PROGRESS** (submitted Mar 24)
- [ ] GHL phone number — blocked by A2P

## CAMPAIGN PERFORMANCE (as of Mar 25)

- Impressions: 10,379 | Reach: 7,245 | Spend: $119.95
- Link clicks: 350 | Landing views: 280 | CPC: $0.18 | CTR: 6.5%
- Video views: 3,398
- **2 registrations** (Steven Tusio + Adam Bates)
- Cost per registration: $59.98
- Conversion rate: 0.7% (280 LPV → 2 registrations)

---

## BRANDON ACTION ITEMS (8 days out — prioritized)

**Today:**
1. [ ] **Post LinkedIn Post 1** (30 sec — copy ready at marketing/linkedin-posts-ready.md)
2. [x] **Send venue texts to Steven + Adam** — SENT ✅ (Mar 25)
3. [x] **Hilton paid** ✅

**This week:**
4. [ ] Upload FB profile pic from phone (30 sec)
5. [ ] Set FB CTA button (1 min)
6. [ ] Set IG website + display name via mobile (2 min)
7. [ ] Post Nextdoor posts (2 min)
8. [ ] Record a Cap.so video for social (5 min)

**When you have 45 min:**
9. [ ] Build 7 GHL workflows — guide at docs/ghl-api-setup-results.md
10. [ ] Create Typeform survey from spec at docs/typeform-survey.md (5 min)
