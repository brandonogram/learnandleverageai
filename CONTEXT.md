# Learn and Leverage AI — Living Context

**Last Updated:** 2026-04-22 (late night — Stage 1 LIVE)
**Status:** Stage 1 (Foundation) LIVE in production. 8 commits shipped on `feat/coolify-migration`. Site running on Hetzner Coolify at `5.161.102.158`. Ready for Stage 2 (Brandon's dialing + Nettie outbound).
**Owner:** Claude Code (autonomous execution), Brandon (teaches + sells + dials)
**Active plan:** `PROJECT-PLAN.md` (canonical roadmap, 5 stages, 11 chunks)
**Codex review:** `docs/codex-adversarial-review-2026-04-21.md` (NO-GO 16 issues; 4 CRITICAL fixed in Stage 1)

## ✅ Production (2026-04-22)
**Site LIVE at https://learnandleverageai.com** (HTTP/2, TLS via CF edge + Let's Encrypt origin). Hosting migrated off deleted Vercel → Coolify + Traefik on Hetzner box `5.161.102.158` (same box as ReplyCadet). Container name `llai`, runs on the `coolify` docker network. Verified routes: `/` (307 → /assessment), `/assessment` (200), `/fcaio` (200), `/case-studies/302-photo-booth` (200), `/workshops` (200). API routes respond correctly (405 for POST-only, 200 for voice agents). `.env` on server at `/opt/llai/.env` (chmod 600). DNS: CF A records `learnandleverageai.com` + `www` → `5.161.102.158` (proxied). Redeploy pattern: `ssh root@5.161.102.158 'cd /opt/llai && git pull && docker build ... && docker rm -f llai && docker run ...'`.

## Current Strategy (updated 2026-04-21 PM, post-codex)

**Three revenue legs:**
1. **AI Opportunity Assessment — $997 one-time (the wedge).** Stripe paid → buyer routes to `/assessment/success` → calls intake line at +13024166285 → AI agent "Emma" runs 20-min interview at `/api/voice-assessment` → transcript emailed to Brandon → Brandon manually produces report in Google Doc → emails buyer + sends calendar link → 30-min walkthrough call. Manual-mode for first 2 assessments, then automate (Chunk 9). See `docs/ai-assessment-service-spec.md`, `docs/ghl-assessment-workflow.md`.
2. **Two post-assessment engagement options (NOT a 4-tier public ladder, per codex HIGH #3).** `$4,997 one-time AI Build` OR `$4,997/mo Monthly Advisory` (quarterly minimum). Both downstream of the assessment. See `/fcaio` page + `docs/llai-90-day-revenue-plan.md`.
3. **SaaS products (parallel, 6–12 month bet).** ReplyCadet on Hetzner awaiting Brianna pilot. ContentBrief automated Milan delivery live. Still active, not blocking the assessment business.

**Workshop model:** Top-of-funnel only. Workshop #2 off critical path until 1+ paying assessment customer closes.

**ICP — LOCKED 2026-04-21 (codex CRITICAL #1 fix).** Owner-led service businesses in NCC DE / Delaware County PA / Chester County PA. **10-50 employees**. **No full-time CTO.** Industries (priority order): pool/spa, HVAC/plumbing/electrical, landscaping/lawn-care multi-crew, roofing/exteriors, event venues, multi-provider vet/dental/medical, niche manufacturing, pest/disaster/septic. Phone + warm LinkedIn DMs only. Cold email still off-limits per Brandon's rule.

**90-day execution plan:** `docs/llai-90-day-revenue-plan.md` (codex-flagged as too aggressive for solo; revised cadence in `PROJECT-PLAN.md`: 10 dials/week max, 3 posts/week max, 2 manual assessments concurrent max).

**Brianna + Steve status:** Silent pause as of 2026-04-21. Single gentle nudge planned for 2026-04-22, then stop. Per codex HIGH #13: assume zero usable testimonials from them in next 10 days; do not put their testimonials in the base case.

## Workshop #1 Results (April 2, 2026)
- **Attendance:** 2 out of 25 target (Brianna from DEBCC + Steve, retired IT)
- **Upsells:** $0 (not attempted with 2 people)
- **Content quality:** Excellent — both attendees engaged deeply for 2 hours
- **Key outcome:** Both attendees independently described problems that map to ReplyCadet (née InboxPilot) and ContentBrief
- **Lesson:** Acquisition failed for this ICP, but 1-on-1 delivery worked. Pivots outbound channel to warm LinkedIn + phone per Cheney playbook.
- **Transcript:** https://notes.granola.ai/t/a2f0a866-2e0f-4a2b-8890-1bc9f4deb04e

## What This Is
LearnAndLeverageAI.com — Brandon's AI training and consulting brand for NCC Delaware. Built with Next.js, deployed to Cloudflare Pages (migrated off Vercel April 2026). Revenue model: paid AI Opportunity Assessment ($997) + Fractional AI Officer retainer ($4,997–$24,997/mo). Workshop remains as top-of-funnel only.

## Current State

### Workshop: "AI Hands-On: See What AI Can Actually Do For Your Job"
- **Date:** Thursday April 2, 2026 (backup: Wednesday April 1) at 6:00-8:00 PM
- **Format:** FREE 2-hour in-person workshop + 30 min stay-after for conversations
- **Venue:** Hilton Wilmington/Christiana, 100 Continental Dr, Newark, DE 19713 — CONFIRMED
- **Venue Contact:** Theresa Langan, tlangan@hiltonchristiana.com, (302) 631-1543
- **Setup:** Classroom style, 25 people (30 max), room until 8:30 PM
- **Venue Includes:** LCD projector, screen, complimentary water, free parking (400+ spaces)
- **Target audience:** Corporate professionals aged 45-60 in NCC who feel behind on AI
- **Capacity:** 25-30 (oversubscribe expecting 60-70% show rate)
- **Revenue model:** $25K+ in upsells sold ON THE SPOT:
  - Full AI Workshop ($297) — 4-hour deep dive
  - AI Starter Pack ($497) — take-home + 1-on-1 call
  - Advanced 2-Day Intensive ($997) — capped at 10
  - Corporate Team Training ($5,000-$10,000/day)
  - AI Consulting ($4,997+) — done-for-you implementation
- **Lead gen:** Brandon's FB/X posts (LIVE since Mar 21), Meta ads, LinkedIn, Nextdoor
- **FB/X posts:** LIVE as of March 21, 2026
- **Organic promotion research:** COMPLETED — 13-channel organic strategy at `docs/organic-promotion-channels.md`

### What's Built:
| Asset | Status | Location |
|-------|--------|----------|
| PRD (full business plan) | ✅ Done | `docs/workshop-business-prd.md` |
| Training plan (instructional design) | ✅ Done | `docs/workshop-ai-hands-on-plan.md` |
| Free session deck V4 (27 slides, Gamma) | ✅ Done | https://gamma.app/docs/p9g9l22kbmeg1yl |
| Paid workshop deck (55 slides, Gamma) | ✅ Done | https://gamma.app/docs/u7s9ime9g1h1mrw |
| Free session speaker guide | ✅ Done | `docs/workshop-materials/06-free-session-speaker-guide.md` |
| Paid workshop speaker guide | ✅ Done | `docs/workshop-materials/05-speaker-guide.md` |
| Landing page (`/workshops`) | ✅ Built | `src/app/workshops/page.tsx` |
| GHL pipeline (8 stages) | ✅ Created | Pipeline ID: Lb2EtR2nnxlLGRWCwBpD |
| GHL custom fields + tags | ✅ Created | 5 fields, 11 tags |
| GHL email/SMS sequences (17+9) | ✅ Written | `docs/ghl-workshop-setup.md` |
| GHL email templates (17) | ✅ Created via API | All templates with subject lines, preview text, from info — `docs/ghl-api-setup-results.md` |
| GHL custom values (5 merge fields) | ✅ Created via API | workshop_venue, workshop_date, workshop_time, registration_link, next_workshop_date |
| Workshop workbook (25-30 pages) | ✅ Written | `docs/workshop-materials/01-workshop-workbook.md` |
| Upsell handout | ✅ Written | `docs/workshop-materials/02-upsell-handout.md` |
| "Get company to pay" template | ✅ Written | `docs/workshop-materials/03-get-your-company-to-pay.md` |
| AI tool reference card | ✅ Written | `docs/workshop-materials/04-ai-tool-quick-reference-card.md` |
| Marketing assets (all channels) | ✅ Written | `marketing/workshop-launch-assets.md` |
| `/workshop-training` skill | ✅ Installed | `~/.claude/skills/workshop-training/SKILL.md` |
| Dedicated phone number (Twilio) | ✅ Purchased + A2P | +13024166285 (302-416-6285) — added to A2P messaging service |
| Communication setup guide | ✅ Done | `docs/communication-setup.md` |
| Facebook Business Page | ✅ Created | Page ID: 957593034113587, added to BM |
| Meta Pixel | ✅ Installed | ID: 1494764092013977 in workshops/layout.tsx |
| PostHog analytics | ✅ Installed | Project 352506, token phc_f0x9...RfBL, provider in workshops/layout.tsx |
| Analytics tracking (full) | ✅ Live | GA4 + PostHog + Meta Pixel: conversion events, form funnels, CTA clicks, FAQ, scroll depth |
| UTM parameter capture | ✅ Live | URL → sessionStorage → form → GHL tags (source:, medium:, campaign:) |
| Tracking plan | ✅ Written | `docs/tracking-plan.md` — all events, properties, decisions |
| Page contact info | ✅ Set | Phone: (302) 416-6285, Email: info@learnandleverageai.com |
| AI Voice Agent (inbound calls) | ✅ LIVE | `src/app/api/voice-inbound/route.ts` — Twilio webhook, Groq LLM, multi-turn stateless, full knowledge base |
| GHL Voice AI Agent | ✅ Created | Agent ID: `69c08755d5cbc88fcd870d8c` — "Learn & Leverage AI Assistant", full workshop knowledge base, greeting configured, timezone EST |
| GHL Custom Fields (7 total) | ✅ Created | Company, Job Title, Workshop Date, Purchased, AI Skill Before/After, Biggest AI Challenge (dropdown with 7 options) |
| **`/assessment` landing page (NEW)** | 🟡 PR open | `src/app/assessment/page.tsx` + `layout.tsx` — PR #1, awaiting merge + CF Pages deploy |
| **Stripe payment link — $997 AI Assessment** | ✅ LIVE | `https://buy.stripe.com/bJebIUgAoaribNIgML87K0c` · product `prod_UNS85jGx4lXqts` |
| **`/cheney-playbook` skill** | ✅ Installed | `~/.claude/skills/cheney-playbook/SKILL.md` — auto-triggers on LLAI revenue / fCAIO / AI consulting keywords |
| **Cheney research dossier** | ✅ Written | `docs/cheney-playbook-research-2026-04-21.md` — verified facts, pricing, 11-interview index |
| **STE sales playbook** | ✅ Written | `docs/ste-sales-playbook.md` — call structure + objection handling + hire-replacement close |
| **90-day revenue plan** | ✅ Written | `docs/llai-90-day-revenue-plan.md` — week-by-week execution |
| **Monetization strategy memo** | ✅ Written | `docs/monetization-insights-2026-04-21.md` — three-leg revenue model |
| **Outreach kit (2026-04-21)** | ✅ Ready | `marketing/2026-04-21-outreach-kit.md` — 6-CEO target list, 3 DM variants, 3 LinkedIn posts, 3 FB posts, landing page copy |

### Recent Marketing Update (2026-03-27)
- Marlo created a fresh workshop promo set for the final 7-day push using fallback planning inputs after the daily brief file was missing.
- Deliverables: 2 LinkedIn concepts with A/B hook variants targeting Behind-the-Curve Brian and Send-My-Team Susan.
- Best-performing draft: manager-risk / wasted-productivity angle (self-score 9.2/10) with direct "send your team" CTA.
- Matching Gemini images generated and uploaded to Catbox for Chief review.
- Draft package saved in `~/.openclaw/workspaces/marlo/memory/2026-03-27.md` and the best 9.2 draft was promoted into `~/shared-brain/content-examples.md`.

### What's Pending:
| Task | Status | Blocker |
|------|--------|---------|
| Venue confirmation (Hilton Christiana) | ✅ CONFIRMED | Hilton Wilmington/Christiana, 100 Continental Dr, Newark, DE 19713 |
| Vercel deployment | Blocked | Vercel fair use limit — need alternative |
| Registration confirm email+SMS | ✅ Live | AgentMail + Twilio, fires on registration (bypasses GHL workflows) |
| GHL workflows loaded | PARTIALLY DONE | 17 email templates + 5 custom values + 3 tags created via API. Workflow CREATION not possible via API — Brandon must build 7 workflows in GHL UI (~45 min). Step-by-step guide at `docs/ghl-api-setup-results.md`. |
| Stripe payment links | Pending | Need to confirm Stripe is active |
| Meta ad campaign launch | ✅ LIVE | NEW campaign on LLAI account (act_1298229182341198), $15/day, 5 video ads, all ACTIVE |
| FB profile pic + cover photo | Pending | Files generated, Brandon must upload (2 min) |
| Instagram @learnandleverageai | ✅ LIVE | Profile pic (brand logo), bio set, connected to portfolio |
| CTA button (Sign Up) | Pending | Brandon must set in FB page settings (1 min) |
| Eventbrite listing | Pending | Venue confirmed — can now create listing |
| Post-workshop survey | Spec complete | No Typeform API creds; Google Forms MCP denied. Full spec at `docs/typeform-survey.md`. Brandon: create in Typeform UI (5 min) or provide API token. |
| AgentMail email setup | Pending | Brandon must sign up at console.agentmail.to (~2 min) |
| GHL Voice AI + phone assignment | ✅ LIVE | Custom voice agent at /api/voice-inbound — Twilio webhook configured, Groq LLM, full knowledge base, deployed on Vercel |
| GHL Voice AI Agent (native) | ✅ Created via API | Agent ID: 69c08755d5cbc88fcd870d8c. Phone number NOT assigned — Twilio number +13024166285 not registered in GHL location (needs UI) |
| GHL location phone update | Pending | Change from 302-420-9576 to 302-416-6285 in GHL UI |
| GHL AI Employee add-on | BLOCKED by 2FA | Cannot access GHL UI — Tandem blocked ("encountered an issue"), Playwright gets past login but 2FA sends code to brandonbot67@gmail.com which has no MX records and is inaccessible |
| GHL Conversation AI (SMS) | BLOCKED by 2FA | Conversation AI API not accessible via PIT token — needs UI setup or different API scope |

### Decision Log (Mar 21):
- **PIVOTED** from online webinars to in-person workshops
- **Target audience** changed from contractors/blue-collar to corporate professionals 45-60
- **Market:** New Castle County, DE only (lock down before expanding)
- **No cold email** — Brandon says it doesn't work for him
- **No libraries** — not the right audience for corporate professionals
- **Marketing channels:** FB/X personal posts, Meta ads, LinkedIn, Nextdoor, Chamber/Rotary (month 2+)
- **Free first session** (2 hours) creates demand; paid offerings satisfy it
- **$25K target** from on-the-spot upsells, same day, in the room
- **Marp** selected for presentation generation (free, CLI, all formats)
- **Gamma.app** adopted for professional slide decks (API key secured)
- **Workshop-training skill** installed for reusable training plan generation

### Decision Log (Apr 2 — Post-Workshop):
- **Two new SaaS products** spawned from workshop meeting with Brianna/DEBCC:
  1. **InboxPilot** (~/projects/workbench/inbox-pilot/) — AI email auto-responder. Build for Brianna free, productize for DEBCC members + chambers nationally.
  2. **ContentBrief** (~/projects/workbench/content-brief/) — Social media content research + weekly filming briefs. For LLAI workshop attendees, then all small biz.
- **NO Vercel** for new products — Brandon wants lowest possible costs. Hetzner VPS + Coolify ($4.51/mo for both). Supabase free tier.
- **Both products are Brandon's IP** — built from scratch, white-labeled, own domains/brands. LLAI workshops serve as a distribution channel.
- **Hybrid branding** — standalone products with own domains, but sold through LLAI workshops at a discount


## Key Files
- `src/app/page.tsx` — Homepage
- `src/app/workshops/page.tsx` — Workshop landing page + registration
- `src/app/api/workshop-register/route.ts` — Registration API → GHL
- `src/app/concierge/` — Concierge service page
- `src/lib/` — Shared utilities
- `docs/workshop-business-prd.md` — Full PRD
- `docs/workshop-ai-hands-on-plan.md` — Training plan (instructional design)
- `docs/workshop-launch-checklist.md` — Live checklist (source of truth)
- `docs/ghl-workshop-setup.md` — GHL pipeline, sequences, chatbot config
- `docs/stripe-payment-links.md` — All Stripe payment link URLs
- `docs/workshop-materials/` — Workbook, handouts, speaker guides
- `marketing/workshop-launch-assets.md` — All marketing copy
- `video-ads/` — FFmpeg pipeline for Meta video ads
- `STATE.yaml` — Full project state with tasks, deadlines, and owners
- `.vercel/project.json` — Vercel deployment config

### Recent Changes

**Apr 1 — Claude Code (Workshop deck V4 overhaul with Brandon):**
- **Deck V4 created via Gamma API:** https://gamma.app/docs/p9g9l22kbmeg1yl (27 slides, 103 credits, 2,091 remaining)
- **Major flow restructure:** Reordered Hour 1 from "demo → exercise → safety → RACE → exercise" to "demo → safety → RACE → context/custom instructions → ONE combined exercise." Teaching comes first, practice comes after.
- **Added context + custom instructions segment:** Two new slides teaching that context is the key to AI quality, plus a live walkthrough of setting up custom instructions in ChatGPT/Claude.
- **Three explicit takeaways:** (1) RACE framework, (2) personalized AI setup (custom instructions), (3) a working prompt they built and tested for their actual job.
- **ROI tied to exercise:** Instead of hypothetical math, ROI slide references "the task you just completed" — experiential, not theoretical.
- **Chatbot demo replaces voice agent call:** More reliable in room setting. Shows "change the pricing file, watch the chatbot update" — demonstrates AI is configurable, not magic.
- **QR codes generated:** 3 PNG images at `public/images/qr-codes/` for the 10%-off Stripe payment links (Workshop $267, Starter Pack $447, Intensive $897).
- **Speaker guide rewritten:** `docs/workshop-materials/06-free-session-speaker-guide.md` — full V4 with new timing, new slide scripts, chatbot demo instructions.
- **Training plan updated:** `docs/workshop-ai-hands-on-plan.md` — all blocks rewritten to match new flow.
- **PPTX saved:** `docs/free-session-deck-v4-gamma.pptx` (36 MB)

**Apr 1 — Elon (8:50 AM ET workshop audit):**
- Re-audited `docs/workshop-launch-checklist.md` and `docs/ESCALATIONS.md`; tightened the escalation frame from 48 hours to 24 hours because the workshop is tomorrow.
- Confirmed venue is still locked and the remaining launch blockers are still overwhelmingly Brandon-owned/UI-only/public-action items: personal posts/outreach, Eventbrite, GHL reminder workflow + remaining workflows, Typeform survey, and FB/IG polish.
- Logged `~/ai-agent-os/learnandleverage-ai/CLAUDE.md` as still missing during audit; checklist/PRD/shared priorities/assignments/CONTEXT/changelog were sufficient fallback context.
- Core conclusion remains unchanged: the bottleneck is not missing assets; it is Brandon execution today.

**Mar 31 — Elon (6:38 PM ET workshop audit):**
- Re-audited `docs/workshop-launch-checklist.md` and rewrote `docs/ESCALATIONS.md` with a 48-hour view.
- Confirmed venue is still locked and the remaining launch blockers are overwhelmingly Brandon-owned/UI-only/public-action items: personal posts, Eventbrite, GHL workflows, Typeform survey, and FB/IG polish.
- Logged `~/ai-agent-os/learnandleverage-ai/CLAUDE.md` as missing during audit; checklist/PRD/CONTEXT remained sufficient to complete the audit.
- Core conclusion: the bottleneck is no longer missing assets; it is Brandon execution before April 1 EOD.

**Mar 26 — Elon (Workshop launch audit):**
- Re-audited `docs/workshop-launch-checklist.md` and `docs/ESCALATIONS.md` at 6:00 AM ET.
- Status remains 2 registrations with workshop 7 days out; main unblocked Brandon actions are LinkedIn post, Nextdoor posts, FB profile/CTA/IG touch-ups, Typeform survey, and the 7 GHL workflows.
- No new automatable checklist items were safely completable from this cron; public posting, GHL UI-only workflow creation, and Typeform creation still require Brandon.

**Mar 25-26 — Claude Code (MAJOR MARKETING PUSH):**
- **LinkedIn ads LIVE:** Company Page created, $25/day campaign targeting JPMorgan/Capital One/DuPont/AstraZeneca managers+ in NCC. Lead Gen Form → Zapier webhook → /api/linkedin-lead → GHL (auto). Ad image: venue photo + "Never Used AI? Start Here."
- **LinkedIn Premium trial:** Started Mar 25, CANCEL BEFORE Apr 25 ($99.99/mo)
- **CRO overhaul deployed:** Phone field now optional, A/B test (hero-form-v1: inline form vs scroll CTA), company mentions (JPMorgan etc.), CTA after "Sound Familiar?", chat widget hidden on /workshops, "Only 8 spots remaining"
- **Capacity changed 25 → 10:** All touchpoints updated (website, SMS, voice, email, LinkedIn posts, confirmation email)
- **Professional headshot:** Added to landing page + uploaded for Gamma
- **Gamma deck V3:** Security slides, PCD/CLD/C2C businesses, simpler ROI math, beginner-focused
- **Venue name fixed:** "Hilton Christiana" everywhere (was "Hilton Wilmington/Christiana")
- **Parking mentions removed:** Per Brandon's request
- **Venue texts sent:** Steven Tusio + Adam Bates via Twilio
- **Venue photo saved:** public/images/venue/classroom.jpg
- **Speaking opportunities researched:** 27 events/orgs in Delaware (docs/speaking-opportunities.md)
- **Marketing assets created:** FB group posts, Rotary/Chamber outreach emails, printable flyer
- **Campaign stats (Mar 25):** $156 spent, 13K impressions, 440 clicks, 357 LPV, 6.5% CTR, 2 registrations

**Mar 24 — Claude Code (VENUE CONFIRMED — Full Update):**
- **Venue CONFIRMED:** Hilton Wilmington/Christiana, 100 Continental Dr, Newark, DE 19713
- **Contact:** Theresa Langan, tlangan@hiltonchristiana.com, (302) 631-1543
- **Setup:** Classroom style, 25 people (30 max), room until 8:30 PM, LCD projector, screen, complimentary water, free parking (400+ spaces)
- **Landing page updated:** Hero badge "Thursday, April 2", countdown timer to Apr 2 6 PM EDT, venue address in details grid, "Registration closes March 31" urgency text, all location references updated
- **Confirmation email/SMS updated:** Date, venue name, full address, parking info
- **SMS handler updated:** All FACTS and template responses now have confirmed venue/date
- **Voice handler updated:** Workshop Details section with confirmed venue/date
- **Email handler updated:** FACTS section and template replies with confirmed venue/date
- **Layout/schema updated:** schema.org EducationEvent with correct startDate/endDate and full venue address
- **Checklist updated:** All venue items checked off, Brandon action items updated
- **GHL custom values updated:** workshop_venue and workshop_date via API

**Mar 23 — Claude Code (GHL Email/SMS Sequence Setup):**
- **17 email templates CREATED via API:** All 7 sequences (Lead Nurture 3, Registration Confirm 1, Pre-Workshop Reminders 3, Post-Workshop Attendees 4, No-Show 2, Upsell 3, Referral 1). Each template configured with subject line, preview text, from name (Brandon Calloway), from email (info@learnandleverageai.com).
- **5 custom values (merge fields) created:** workshop_venue ("Wilmington, DE (TBA)"), workshop_date ("TBA"), workshop_time ("6:00 PM - 8:00 PM EST"), registration_link ("https://learnandleverageai.com/workshops"), next_workshop_date ("TBA"). Ready to update when venue confirms.
- **3 new tags created:** workshop-confirmed, hot-lead, referral-program (total: 22 tags)
- **GHL API thoroughly mapped:** Workflow creation NOT supported via API (only list + add/remove contacts). Email template creation + update works. Conversations/messages endpoint works for sending email/SMS. Full API capability matrix at docs/ghl-api-setup-results.md.
- **BRANDON ACTION:** Build 7 workflows in GHL UI (~45 min). Step-by-step guide with exact triggers, steps, and which templates to use at docs/ghl-api-setup-results.md.

**Mar 23 — Claude Code (GHL AI Employee Setup Attempt):**
- **GHL Voice AI Agent CREATED via API:** Agent ID `69c08755d5cbc88fcd870d8c`, name "Learn & Leverage AI Assistant", full workshop knowledge base (April 2, 6-8 PM, free, Wilmington DE, all paid services with pricing), greeting configured, timezone set to America/New_York, 10-min max call duration
- **Custom fields created:** "Company" (ID: mBsTuAMLk0vzJ3oi8WSw), "Job Title" (ID: tqoIYZF8Jo3jIe4RUq5S). "Biggest AI Challenge" recreated as SINGLE_OPTIONS dropdown with 7 choices (ID: 3643VTUlvV9TEJVWmces)
- **Phone number assignment FAILED:** Twilio number +13024166285 is "not registered with this location" — needs to be imported into GHL sub-account via UI (Settings > Phone Numbers)
- **Conversation AI API not accessible** via PIT token — returns 404. May need different API scope or must be configured via UI
- **GHL UI login BLOCKED:**
  - Tandem: Always gets "We encountered an issue while trying to log you in" (GHL detects Electron browser)
  - Playwright: Login + account selection WORKS, but hits 2FA that sends code to brandonbot67@gmail.com
  - boothlaunchpad.com has NO MX records (DNS: Siteground), webmail.boothlaunchpad.com does not resolve
  - Google Workspace MCP needs re-authorization for both brandonbot67@gmail.com and brandonbot67@gmail.com
  - 2FA code is NOT forwarded to brandonbot67@gmail.com
- **Screenshots saved:** Login page, account picker, 2FA code sent screen (uploaded to catbox)
- **BRANDON ACTION REQUIRED:** (1) Log into GHL UI manually and complete AI Employee setup, (2) Import Twilio number +13024166285 into LLAI sub-account, (3) Fix brandonbot67@gmail.com email (add MX records or change GHL 2FA to a working email)

**Mar 22 — Claude Code (Meta Ad Campaign — Correct Account):**
- **Created fresh campaign on LLAI ad account** (act_1298229182341198, VISA *9642) — previous campaign on Christmas Lights Dude account is PAUSED
- **Campaign:** "LLAI Workshop - April 2" — OUTCOME_TRAFFIC, $50/day (increased from $15), LOWEST_COST_WITHOUT_CAP
- **Ad Set:** "NCC Delaware - Professionals 45-60" — 25mi radius of Wilmington DE (lat/lng), ages 45-60, FB+IG placements, Advantage Audience OFF
- **5 videos uploaded** to new ad account: v1, executive, urgency, career, short
- **5 ads created** with full marketing copy from workshop-launch-assets.md, all with "Learn More" CTA -> learnandleverageai.com/workshops
- **Everything set to ACTIVE** — campaign, ad set, and all 5 ads (IN_PROCESS = going through Meta ad review)
- **All IDs saved:** `docs/meta-ad-campaign.md` (overwritten with new account IDs)

**Mar 22 — Claude Code (Facebook Page Setup):**
- **Facebook Business Page found + configured:** Page ID 957593034113587, URL /people/Learn-and-Leverage-AI/61579240241708/
- **Added to Business Manager:** The Calloway Family Businesses — access_status CONFIRMED
- **Page contact info set via Tandem browser:** Phone (302) 416-6285, Email info@learnandleverageai.com, Website learnandleverageai.com
- **Meta Pixel created:** ID 2066967650885628, shared with 3 active ad accounts. Primary pixel 1494764092013977 installed in code.
- **Profile pic + cover photo generated:** via fal.ai Flux Pro, saved to public/images/
- **Blockers:** Ad account limit reached (5 max), token lacks pages_manage_metadata, cannot upload images programmatically
- **Brandon manual tasks:** Upload profile/cover photos (2 min), set CTA button (1 min), create Instagram @learnandleverageai (3 min)
- **All IDs documented:** docs/meta-business-setup.md (rewritten), CREDENTIALS.md (updated)

**Mar 22 — Claude Code (Meta Ad Campaign):**
- **Full Meta ad campaign created** via Marketing API — campaign, ad set, 5 video ads, all PAUSED and ready to activate
- **5 videos uploaded** to ad account: v1, executive, urgency, career, short
- **Campaign:** "LLAI Workshop - Video Views + Registrations" — OUTCOME_TRAFFIC, $15/day CBO, Mar 22–Apr 1
- **Ad Set:** "NCC Delaware - Professionals 45-60" — 25mi radius of Wilmington, ages 45-60, interests in professional dev/AI/management, FB+IG placements
- **5 A/B test ads:** Pain Point, Social Proof, Outcome, Career Growth, Short/Direct — each with unique video + copy angle
- **All IDs saved:** `docs/meta-ad-campaign.md`
- **To go live:** Toggle campaign to ACTIVE in Ads Manager (or via API)

**Mar 22 — Claude Code (Communication Setup):**
- **Email:** Researched AgentMail.to — free plan (3 inboxes, 3K emails/mo), REST API with Bearer auth, webhook support for GHL routing. Console signup required (Clerk auth). Plan: `info` and `support` inboxes for public-facing email.
- **Phone:** Found existing Twilio number +13024166285 (302-416-6285) already purchased for LLAI. Added to A2P 10DLC messaging service for SMS compliance. Number has voice+SMS+MMS capabilities.
- **GHL:** LC Phone API returns empty (identity verification not done). Recommend connecting existing Twilio number to GHL instead — agency-level Twilio already connected. Voice AI can answer all inbound calls.
- **Updated:** `docs/meta-business-setup.md` — replaced Brandon's personal phone/email with Twilio number and AgentMail address in Facebook Page instructions.
- **Created:** `docs/communication-setup.md` — comprehensive guide covering AgentMail setup, Twilio+GHL Voice AI, public contact info rules, and action items.
- **CRITICAL RULE ENFORCED:** Brandon's personal phone (302-420-9576) must NEVER appear on public materials. All channels use (302) 416-6285 and AgentMail addresses.

**Mar 22 — Claude Code (Replaced Remotion with FFmpeg-only pipeline):**
- **Root cause of jitter (deep investigation):** (1) Triple encoding (MOV->MP4->Remotion->compress), (2) Remotion `<Video>` component frame duplication (618 frames for 20.57s video at 30fps = 1 extra frame), (3) iPhone VFR source (avg_frame_rate != r_frame_rate), (4) B-frame reordering in pre-processed MP4 confused browser-based frame seeking
- **FFmpeg reinstalled** from homebrew-ffmpeg tap with libass, libfreetype, libfontconfig, libharfbuzz (was missing ALL text/subtitle filters)
- **New FFmpeg-only pipeline** at `video-ads/ffmpeg-pipeline/` — single-pass: source MOV -> scale + VFR->CFR + ASS subtitle burn-in + H.264 encode. No intermediate files. No Remotion.
- **ASS subtitle generator** (`generate-ass.js`) produces word-by-word highlighted captions, hook text with fade, lower third with slide-in, CTA end card, watermark — all using native ASS override tags
- **Test render result:** 617 frames perfectly uniform at 0.033333s each (was 618 with dupe), 26MB, zero jitter
- **Previous attempt** (CRF fix + re-render) improved bitrate but did NOT fix root cause jitter from Remotion's browser-based frame extraction
- **Full analysis:** `docs/video-quality-fix.md`

**Mar 21 — Claude Code (Remotion Video Ads):**
- **Built Remotion video ad pipeline** at `video-ads/` — reusable project for overlaying professional Meta ad elements on raw workshop promo videos.
- **Components:** HookText (animated slide-in, first 3s), Captions (word-by-word highlight synced to audio), LowerThird (name+title slide-in), CTAEndCard (animated end card with staggered lines), Watermark (corner branding).
- **Design:** Dark/modern, cyan accent (#4fc3f7), Inter font, semi-transparent backgrounds. Professional for 45-60yo corporate audience.
- **First ad rendered:** `videos/ads/fb-workshop-ad-v1.mp4` — 1080x1920 9:16, 20.6s, H.264, 18.4MB (under 30MB Meta limit).
- **Reusable:** Edit `src/data/ad-config.ts` to swap video/captions/hook/CTA, run `./render.sh` to produce new ad.
- **Config-driven:** All text, timing, colors configurable in `ad-config.ts`. Caption segments in `captions.ts`.

**Mar 21 — Claude Code (Workshop Training Deck):**
- **55-slide workshop training deck created via Gamma API:** Professional presentation for the 4-hour in-person workshop covering all 4 hours of curriculum plus closing/upsell slides.
- **Gamma presentation (live/editable):** https://gamma.app/docs/t4wsx8gt7f6cijr
- **PPTX exported:** `docs/workshop-training-deck.pptx` (29 MB, 55 slides, 16:9)
- **Marp markdown source:** `docs/workshop-training-deck.md` — full slide deck with speaker notes, editable, dark theme
- **Links/metadata:** `docs/workshop-deck-links.md`
- Slide breakdown: Hour 1 (slides 1-16), Hour 2 (17-30), Hour 3 (31-43), Hour 4 (44-52), Closing/Upsell (53-55)
- Includes RACE prompt framework, hands-on exercises, live demo placeholders, Call2Calendar/302 Photo Booth/Tri-State Aquatic real examples, AI tool comparison, ROI calculator, Monday Morning Action Plan
- Closing slides: recap, all 4 upsell offers with pricing, today-only 10% discount, closing script in speaker notes
- Gamma API credits used: 165 (4,107 remaining)

**Mar 21 — Claude Code (GHL Setup):**
- **Complete GHL workshop setup document created:** `docs/ghl-workshop-setup.md` — sub-account status verified (no LLAI sub-account exists across 6 existing GHL locations), 8-stage pipeline design ("Workshop Attendee Journey") with contact tags and custom fields, 7 email/SMS sequences (17 emails + 9 SMS) with ALL copy written and ready to paste into GHL, chatbot/Conversation AI training knowledge base with full FAQ and objection handling, and 7-phase implementation checklist.
- **Blocker:** Brandon must create the LLAI GHL sub-account and generate a PIT token before any workflows can be deployed via API.

**Mar 21 — Claude Code (Research):**
- **Full workshop automation blueprint created:** `docs/workshop-automation-blueprint.md` — 11-section document mapping every business function to specific tools, costs, and autonomy levels.
- Tool stack identified: ~$688/mo total, 91% autonomous, Brandon's time = ~12 hrs/month (10 teaching, 2 oversight)
- Key tools: GHL ($394/mo central nervous system), Instantly.ai ($97/mo cold email), Make.com ($16/mo automation glue), plus existing stack (Vercel, SendGrid, Stripe, Claude Code, OpenClaw)
- New city launch playbook: ~70 min of agent time, zero Brandon time
- Scaling model: City Partner (50/50) → Certification ($5K-$10K) program
- Revenue projections: $5,830/mo conservative → $44,108/mo aggressive (multi-city)

**Mar 17 — Cash (Revenue Ops):**
- Reviewed `STATE.yaml`; webinar follow-up remains fully blocked by missing Brandon confirmation.
- No safe replay, reschedule, or direct-offer execution can proceed until Brandon confirms whether the Feb 27 webinar happened, whether a replay exists, and whether any sales occurred.

**Feb 20 — Cash (Revenue Ops):**
- **EMERGENCY PAYMENT PLAN created:** PayPal.Me + Venmo + "Text to Pay" workflow ready for webinar since Stripe not set up. Protects $7-19K in revenue.
- **Services pricing page COMPLETED:** Full 4-tier pricing structure drafted ($497 → $1,997 → $4,997/mo). Ready to build post-webinar.
- **CRITICAL ESCALATION:** 7 days to webinar with no payment method. All blockers escalated to Brandon.

**Feb 17 — Marlo (Content):**
- **Landing page completely redesigned** for mobile-first:
  - Full-bleed hero image with contractor + phone at job site
  - Live countdown timer to Feb 27 2:00 PM EST
  - Text cut by ~70% — punchy headlines, bullet points, no walls of text
  - 4 AI-generated images added to `/public/images/`
  - Big bold "Reserve My Spot" CTA buttons throughout
  - Social proof section with Brandon's bio card + stats
  - Registration form simplified to name + email + phone
- **Preview deployed:** https://learnandleverageai-j0apvx7so-brandon-calloways-projects.vercel.app

## What Needs to Happen Next
**11 days until first workshop (April 2, 2026):**
1. ~~**Venue confirmation**~~ — ✅ CONFIRMED: Hilton Wilmington/Christiana, Apr 2, 6-8 PM
2. **GHL workflows** — load all 7 email/SMS sequences (IN PROGRESS — Claude Code)
3. **GHL Conversation AI** — configure chatbot with knowledge base (IN PROGRESS — Claude Code)
4. **Post-workshop survey** — create 10-question feedback form (IN PROGRESS — Claude Code)
5. **Meta Ads** — Campaign CREATED and PAUSED (5 video ads). Brandon: activate in Ads Manager when ready
6. **Marketing** — LinkedIn posts, Nextdoor posts, Facebook follow-up posts, Eventbrite listing
7. **Print materials** — workbook + reference card formatted as print-ready PDFs
8. ~~**Landing page**~~ — ✅ Updated with venue, date, countdown timer, registration deadline

## 2026-03-31 — Claude Code + Codex OVERNIGHT SESSION (Major)

**3 rounds of Claude-Codex adversarial review produced the final 48-hour fill strategy.**

**Strategy (agreed by both AIs):**
- Reframe as "closed-door AI working session" — not "free workshop"
- Brandon's personal outreach (calls > voice notes > texts) is the only reliable channel
- "Results in Advance" approach: give free AI tip first, then invite
- "Reply YES" frictionless registration — no website visit needed
- Target HR/L&D managers for cluster recruiting (one yes = 3-5 seats)
- Realistic revenue: $1-4K immediate + $5-15K pipeline (not $20K same-night)
- Pivot threshold: if <8 confirmed by Wed noon, reframe as invite-only pilot

**Assets built (14 files, 2,300+ lines):**
- Zero-budget fill plan, Hormozi tactics, 40+ text blitz templates, DEBCC forwarding package, Reddit/CL posts, flyer, Eventbrite listing, follow-up emails, Brandon morning briefing, Monday morning prompts handout, Codex insights (3 rounds)

**Code deployed:**
- Landing page CRO fix: A/B test killed, inline hero form always shown
- Seat count inconsistency fixed in SMS handler
- Training plan + speaker guide: times updated (6-8 PM), forbidden phrases removed

**Training content changes recommended (before Thursday):**
- Replace Call2Calendar demo with corporate "AI Chief of Staff" demo
- Add role-based exercises (finance, ops, HR tracks)
- Simplify close from 5 offers to 2 paths + enterprise conversations
- Add 5-min break, expand governance, replace fear-based lines with advantage-based

**Key files:** `marketing/BRANDON-MORNING-BRIEFING.md`, `marketing/ZERO-BUDGET-FILL-PLAN.md`, `marketing/HORMOZI-TACTICS.md`, `marketing/CODEX-TRAINING-REVIEW.md`

## 2026-03-31 — Claude Code (Session with Brandon)
- **Checked AgentMail inbox** — found DEBCC Zoom invite for Wed 4/1 10 AM (Zoom ID: 896 8879 1544). Brandon confirmed he'll attend.
- **Full inbox audit** — only real responses: Brianna (DEBCC, active), Chris Glanden (barcodesecurity, unanswered 4 days), Ashley Cloud (Rotary, Fall pipeline), DE SHRM (auto-confirm of speaker proposal). Rest is bounces + phishing spam.
- **Texted Steven Tusio + Adam Bates** via Twilio — "bring a colleague" with free AI toolkit bonus ($97 value)
- **Sent 8 outreach emails** — 5 new (PMI-DVC, DE State Chamber, Tech Forum DE, Delaware SBDC, DYPN) + 3 follow-ups (NCC Chamber, Emerging Enterprise Center, DE SHRM)
- **Meta ads report pulled** — $202/7d, 6.48% CTR, 535 link clicks, Ad 4 "Career Growth" winning (49% budget). No disapprovals.
- **Landing page verified** — live, form working. Added phone (302-416-6285) + email to footer.
- **Created workshop overview slide** — `marketing/workshop-overview-slide.html` for Brandon to screenshare on Brianna Zoom
- **Brianna forwarding package sent** (agent fired before Brandon could stop it) — Brandon chose to leave it as-is
- **RULE SAVED:** Never auto-message Brianna/DEBCC — Brandon manages that relationship personally

## 2026-03-31 — Marlo content update
- The daily brief file was missing, so today’s package used the fallback stack: shared content calendar + ICP personas + examples bank.
- Built 2 new Facebook workshop variants for the final push, targeting Behind-the-Curve Brian.
- Hooks tested: statement (smart people still wasting hours on repetitive work) vs question (how many times have you opened ChatGPT and closed it because it was not useful enough?).
- Scores: 9.2 and 9.1.
- Winning angle: practical relief from repetitive admin, framed in plain language for a non-technical corporate audience.
- Review package saved in `~/.openclaw/workspaces/marlo/memory/2026-03-31.md` with Catbox media link.

## 2026-03-30 — Marlo content update
- Created a second same-day refinement package for Chief review so the Mar 30 content queue contains fresh A/B workshop options instead of only one repeated urgency post.
- New LinkedIn variants target Behind-the-Curve Brian with statement-vs-question hooks.
- Winning angle from the refinement run: status pressure relieved by practical usefulness, not hype.
- Scores: 9.2 and 9.1.
- Review package saved in `~/.openclaw/workspaces/marlo/memory/2026-03-30.md` with Catbox media link.
- Top-scoring draft also promoted into `~/shared-brain/content-examples.md` for future LLAI calibration.


## Voice Notes
> Auto-populated from Plaud/Granola transcripts

### 2026-04-02 — Learn and Leverage AI Free Session #1 (granola)
*(Multi-project transcript — also mentions: learnandleverageai)*

Meeting: Learn and Leverage AI Free Session #1

