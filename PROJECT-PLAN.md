# PROJECT-PLAN.md — LLAI Fractional AI Officer Revenue Business

**Last Updated:** 2026-04-21
**Current Position:** Stage 1, Chunk 1 (Hosting Migration), Phase: Design
**Status:** BLOCKED on prod hosting (site 530, Vercel account deleted) — Claude Code unblocking Chunk 1 autonomously
**Goal:** First $997 assessment sale by **2026-05-01**, first $4,997/mo fCAIO retainer signed by **2026-05-21**

---

## What This Project Is

Learn and Leverage AI = the productized Fractional AI Officer (fCAIO) business — AI Opportunity Assessment ($997 one-time) as the wedge, fCAIO retainer ($4,997/mo entry) as the engine. Target buyer: owner-led NCC DE service businesses, **10–50 employees, no tech lead, obvious ops pain** (single locked ICP per codex 2026-04-21 review).

Built on Jon Cheney's Gen AIPI playbook (see `docs/cheney-playbook-research-2026-04-21.md`). LLAI workshop + ReplyCadet + ContentBrief all collapse into top-of-funnel for this offer — **this is now the primary revenue engine**.

---

## Project Roadmap

```
├── Stage 1: Foundation — "Is the offer sellable end-to-end without embarrassment?"
│   ├── Chunk 1: Hosting migration (Vercel→Coolify) — site reachable again
│   ├── Chunk 2: Assessment fulfillment pipeline — voice intake, report gen, /success route, GHL handoff
│   ├── Chunk 3: Credibility layer — 2 quantified case studies, ICP lock, legal alignment
│   └── Chunk 4: Retainer upsell — /fcaio page, pricing lock, 2-option close
│
├── Stage 2: Go-To-Market — "Will strangers pay?"
│   ├── Chunk 5: Outreach infrastructure — 30-name target list, DM templates, calendar, CRM pipeline
│   ├── Chunk 6: First $997 sale — Brandon dials 10/wk, posts 3/wk; close #1
│   ├── Chunk 7: Assessment delivery dry-run — live end-to-end proof with real buyer
│   └── Chunk 8: First $4,997/mo retainer close
│
├── Stage 3: Repeatability — "Can we do it again without rebuilding?"
│   ├── Chunk 9: Report generation automation (transcript → Claude → Gamma)
│   ├── Chunk 10: Referral + case-study pipeline
│   └── Chunk 11: Second retainer delivery SOPs
│
├── Stage 4: Scale — "Can we hold quality as volume grows?" [not scoped yet]
└── Stage 5: Productize — "What gets spun out as SaaS?" [ReplyCadet + ContentBrief land here]
```

**Operating principle:** Claude Code runs 24/7 on Chunks 1–5. Brandon's only touch points in Stage 1 are: (a) copy approvals at chunk boundaries, (b) CF DNS changes he has to click through, (c) Coolify credentials if needed. Brandon is the human in Chunks 6–8 (dialing, discovery calls, delivering live).

---

## Product Roadmap — Stage 1: Foundation

### Chunk 1: Hosting Migration (Vercel→Coolify) — **CURRENT**

**What the user can DO when this chunk is complete:**
1. Load `https://learnandleverageai.com/` and see the homepage (200 OK, not 530)
2. Load `https://learnandleverageai.com/assessment` and see the landing page
3. Submit the workshop registration form → still hits GHL correctly
4. Call +1-302-416-6285 → voice agent answers (existing workshop agent, still)

**Exit criteria:** Site reachable, every existing API route returns its existing behavior on Hetzner. No functional changes beyond move-of-origin.

---

### Chunk 2: Assessment Fulfillment Pipeline

**Capabilities:**
1. Separate `/api/voice-assessment` route with assessment-specific prompt (replaces workshop pitch per codex CRITICAL #3)
2. Live `/assessment/success` route with manual next-step instructions
3. GHL post-purchase workflow: Stripe paid → SMS (voice number + calendar link) + email with what-to-expect
4. Manual report template in Google Docs (Gamma automation = Chunk 9, not now)
5. `src/app/assessment/page.tsx` copy aligned with what ACTUALLY gets delivered

### Chunk 3: Credibility Layer

**Capabilities:**
1. ~~2 quantified case studies (TSAS speed-to-lead, 302PB booking automation)~~ → **REVISED 2026-04-21:** TSAS speed-to-lead system is designed but **not yet deployed to production** — zero measured before/after numbers exist. 302PB has limited but real numbers ($680/mo recovered labor + 140 customers in active CheckCherry→GHL sync; the 38% booking lift has uncertain attribution between AI stack vs concurrent branding/website refresh). **Decision:** publish 1 honest 302PB case study NOW; **TSAS case study moves to Chunk 7** (after first real assessment delivery generates fresh metrics). The honest framing — "we recovered $680/month immediately by replacing one part-time admin hire with an AI stack, here's the playbook" — is more credible than fabricated numbers and matches Brandon's actual operating reality.
2. Published at `/case-studies/302-photo-booth` (TSAS deferred to Chunk 7)
3. Single ICP locked everywhere: **owner-led NCC/Delco/Chesco service businesses, 10–50 employees, no tech lead**
4. ~~`/assessment` CTA switched to "Apply"~~ → **OVERRIDDEN by Brandon 2026-04-21:** Brandon explicitly said "don't worry about Stripe link." Page keeps the $997 Pay CTA. Iterate on conversion later.
5. Assessment-specific refund policy + privacy/consent terms for paid AI voice intake (codex CRITICAL #7, HIGH #8)
6. Existing `terms/page.tsx` + `privacy/page.tsx` reconciled (no more contradictions)

### Chunk 4: Retainer Upsell (/fcaio)

**Capabilities:**
1. `/fcaio` page — 2-option close (drop "4-tier ladder" per codex HIGH #3): **$4,997 one-time build** OR **$4,997/mo monthly advisory**. Keep the 4-tier internally, don't show buyer.
2. Stripe payment links for both (user paused — I'll draft, won't activate)
3. Clear "what's included monthly" specificity — dashboard, Jarvis, one automation/month, team training, weekly check-in

---

## Product Roadmap — Stage 2: Go-To-Market

### Chunk 5: Outreach Infrastructure
1. Real 30-name target sheet — verified owner name + direct number + email + one pain hypothesis per row (fixes codex HIGH #12)
2. Warm-network DM template + cold-call opener variants (owner-led service biz-specific)
3. GHL CRM pipeline tagged for fCAIO prospects (separate from workshop pipeline)
4. Calendar link live (Brandon's `/book-assessment-call`)

### Chunk 6: First $997 Sale
1. Brandon dials 10 calls/wk (realistic solo cadence per codex CRITICAL #11)
2. Brandon posts 3x/wk (LinkedIn + personal FB)
3. Claude Code supports: drafts posts, logs call outcomes, follows up per Brandon's verbatim, updates CRM
4. **Success = 1 application submitted + 1 discovery call held + 1 $997 paid**

### Chunk 7: Assessment Delivery Dry-Run + TSAS Case Study
1. Real buyer completes voice intake
2. Brandon delivers manual report (Google Doc, 20-min walkthrough call)
3. Testimonial + quantified before/after captured → feeds Chunk 10
4. Validates the 48-business-hour SLA with real timing data
5. **TSAS speed-to-lead case study** (deferred from Chunk 3) — by this point Brandon should have shipped the TSAS speed-to-lead system to production for at least 30 days, generating real before/after response time + lead conversion data

### Chunk 8: First Retainer Close
1. $4,997 one-time build OR $4,997/mo retainer signed by the Chunk 7 buyer OR next-in-pipeline
2. Month 1 delivery starts

---

## Current Chunk: Chunk 1 — Hosting Migration

### Product Capabilities (when done)
1. `https://learnandleverageai.com/` loads (200 OK)
2. `https://learnandleverageai.com/assessment` loads
3. `/api/workshop-register` → GHL still works
4. `/api/voice-inbound` → Twilio webhook still works (still the workshop bot — Chunk 2 replaces it)
5. All env vars preserved: `GHL_API_KEY`, `GHL_LLAI_API_KEY`, `STRIPE_SECRET_KEY`, `AGENTMAIL_API_KEY`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `GROQ_API_KEY`, `POSTHOG_KEY`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GA_ID`, Supabase keys

### SDLC Phases

#### Requirements — DONE
- [x] Audit existing Next.js 16 setup (confirmed: standard Next 16 app, no exotic Vercel-only features)
- [x] Confirm Vercel is gone (Brandon confirmed 2026-04-21)
- [x] Identify target: Hetzner + Coolify (same box as ReplyCadet/ContentBrief)
- [x] Inventory API routes that must survive migration: `/api/workshop-register`, `/api/voice-inbound`, `/api/inbound-email`, `/api/linkedin-lead`, `/api/voice-inbound-sms` (if exists)

#### Design — IN PROGRESS

**Tech Stack — Chunk 1:**

| Component | Tool | What it does | Cost | Status |
|-----------|------|-------------|------|--------|
| Hosting | Coolify on Hetzner VPS | Container deploy + reverse proxy + TLS | Shared with ReplyCadet/ContentBrief (~$0 marginal) | Already in use |
| Runtime | Next.js 16 standalone output | Same code, smaller prod image | Free | Already in use |
| Container | Dockerfile (multi-stage Node 22) | Reproducible build | Free | NEW (mirror `inbox-pilot/Dockerfile`) |
| DNS | Cloudflare (existing NS) | Point A record at Hetzner IP, proxy on | Free | Already in use |
| TLS | Coolify's built-in Let's Encrypt | Cert renewal | Free | Already in use |
| Secrets | Coolify env UI | Port all env vars from Vercel (values from `.env.local` if still present, or re-derive from code) | Free | Already in use |
| Process manager | PM2 / Coolify default | Restart on crash | Free | Already in use |

- [ ] Draft `Dockerfile` for Next.js 16 standalone (mirror `/Users/brandonbot/projects/workbench/inbox-pilot/Dockerfile`, adjust for Next 16 output)
- [ ] Set `output: 'standalone'` in `next.config.ts`
- [ ] Draft `.dockerignore`
- [ ] Full env var inventory from `grep -r process.env src/` — cross-check against values Brandon still has
- [ ] Decide deployment strategy: git-based auto-deploy from GitHub main, or docker-compose (git-based = less friction)

#### Development — NOT STARTED
- [ ] Add `output: 'standalone'` to `next.config.ts`
- [ ] Create `Dockerfile` (Node 22 alpine, multi-stage, non-root user)
- [ ] Create `.dockerignore`
- [ ] Test local `docker build` succeeds
- [ ] Test local `docker run` serves the site on `localhost:3000`
- [ ] Verify homepage + `/assessment` + `/workshops` render
- [ ] Verify `/api/workshop-register` returns expected validation errors on empty POST
- [ ] Commit to `feat/coolify-migration` branch (not to main until cut-over ready)

#### Testing — NOT STARTED
- [ ] Spin up Playwright against the dockerized build — screenshot `/`, `/assessment`, `/workshops`, all 200 OK
- [ ] Hit every API route with curl, confirm they respond (not necessarily succeed — some need real env values)

#### Deployment — NOT STARTED  (**Brandon-gated at DNS cut-over**)
- [ ] Create Coolify app on Hetzner (Claude Code via SSH to Hetzner box, using credentials Brandon shares)
- [ ] Set env vars in Coolify UI (or via Claude Code if API access available)
- [ ] Build + deploy on Coolify — validate health endpoint responds
- [ ] Preview URL smoke test (Coolify assigns `.coolify.app` or similar, Brandon verifies in browser)
- [ ] **CHECKPOINT — Brandon approval before DNS cut:** preview URL looks right, logs clean
- [ ] Flip CF DNS A-record: `learnandleverageai.com` → Hetzner IP (CF proxy ON)
- [ ] TLS cert issues through Coolify
- [ ] Verify `https://learnandleverageai.com/` returns 200

#### Validation — NOT STARTED
- [ ] Re-run all Playwright smoke tests against prod
- [ ] Register a dummy workshop contact, confirm it lands in GHL
- [ ] Place test call to +1-302-416-6285, confirm voice agent responds
- [ ] Send test inbound email, confirm AgentMail → handler fires
- [ ] Update `CONTEXT.md` — "migrated to Vercel to Cloudflare Pages" → "migrated to Coolify on Hetzner"
- [ ] Retire `.vercel/` directory from repo

### Blockers
| Blocker | Impact | Owner | Status |
|---------|--------|-------|--------|
| Need Hetzner SSH access + Coolify login | Cannot deploy without creds | Brandon → Claude Code | **OPEN** — Brandon pastes SSH creds or drops me in via Tandem |
| Need env var values (if `.env.local` missing) | Runtime will fail | Brandon | Partially resolvable — I can grep code for which vars are needed, Brandon supplies values |

---

## Parking Lot

Ideas captured, NOT in current chunk scope:

- [ ] Report generation automation (transcript → Claude → Gamma) — **Chunk 9** (codex confirms: manual-first, automate later)
- [ ] 4-tier fCAIO ladder public display — **Parked** (codex HIGH #3: sell 2 post-assessment outcomes for first 30 days)
- [ ] Workshop #2 — **Stage 3+** (not on critical path to first revenue)
- [ ] Brianna/Steve testimonial follow-up — **Chunk 7 bonus** (do not assume in base case per codex HIGH #13)
- [ ] Meta ads restart — **Post-Chunk 8** (don't spend until 1 organic close)
- [ ] Cold email — **Never** (Brandon's rule)
- [ ] Workshop deck cleanup — **Stage 3+**
- [ ] InboxPilot/ReplyCadet cross-sell to retainer clients — **Stage 5**

---

## Decisions Log

| Date | Decision | Why |
|------|----------|-----|
| 2026-04-21 | No Vercel resurrection. Migrate to Coolify on Hetzner. | Brandon deleted Vercel account over fees. Hetzner box already runs ReplyCadet/ContentBrief. |
| 2026-04-21 | Do not block on Stripe link pause. Brandon explicitly overrode the codex CRITICAL #4 "disable payment link" recommendation. | Brandon: "lets not worry about a stripe link." Revisit after Chunk 2 ships. |
| 2026-04-21 | Single ICP lock: owner-led NCC/Delco/Chesco service businesses, 10–50 employees, no tech lead. | Codex CRITICAL #1 flagged ICP drift across 4 docs ($1M-$100M range). This is the only lane that matches Brandon's actual case studies. |
| 2026-04-21 | Assessment CTA switches to "Apply" not "Pay" for first 30 days. | Codex HIGH #4: no external proof + no sample report = can't justify cold-traffic $997 checkout. Keep list price $997; gate behind application. |
| 2026-04-21 | Drop 4-tier fCAIO public display. Sell 2 post-assessment outcomes: $4,997 one-time build OR $4,997/mo advisory. | Codex HIGH #3: "a Delaware pool owner does not care about fCAIO architecture." |
| 2026-04-21 | Run 2 manual assessments end-to-end before automating report generation. | Codex CRITICAL #5 + Cheney pattern ("solo until $1M"). Automation is Chunk 9. |
| 2026-04-21 | Codex adversarial review commissioned + saved at `docs/codex-adversarial-review-2026-04-21.md`. | Non-negotiable gate before any deploy per Brandon's instruction. |

---

## Status History

| Date | Update |
|------|--------|
| 2026-04-21 | PROJECT-PLAN.md created. Stage 1 Chunk 1 defined (Coolify migration). Codex review completed (NO-GO, 16 issues). Vercel deletion confirmed. Nettie work proceeding in parallel session. |

---

## 24/7 Claude Code Operating Model

**What Claude Code owns autonomously (no wait-states):**
- All code: Dockerfile, /success route, new API routes, case-study pages, /fcaio page, copy rewrites
- All research: lead list generation, pain-hypothesis drafting, post drafts
- All testing: Playwright smoke, API curl tests, prod health checks
- All admin: GHL workflow JSON, Stripe link management (paused per Brandon), CRM pipeline setup
- All monitoring: health check cron, deploy log surveillance, call outcome logging
- All documentation: CONTEXT.md updates, daily-log entries, status history

**Where Claude Code must wait on Brandon:**
- Hetzner SSH / Coolify creds (one-time unblock for Chunk 1)
- CF DNS cut-over approval (one click, Chunk 1)
- Any outbound message sent as Brandon (copy approval by skim)
- Dialing + discovery calls (Chunks 6–8)
- Delivering live 30-min walkthrough calls (Chunks 7–8)

**Parallelization plan** — where I can split work across subagents:
- Chunk 1 Dev: 1 agent builds Dockerfile; 1 agent inventories env vars; 1 agent drafts Playwright smoke — can run concurrently
- Chunk 3: 1 agent writes TSAS case study; 1 agent writes 302PB case study; 1 agent rewrites /assessment copy — concurrent
- Chunk 5: 1 agent researches 30-name list; 1 agent drafts LinkedIn posts (7x); 1 agent builds GHL pipeline — concurrent

**Expected cadence:**
- Chunk 1 (hosting): ~4 hours autonomous work, blocked only on SSH creds
- Chunk 2 (fulfillment): ~8 hours
- Chunk 3 (credibility + legal): ~10 hours
- Chunk 4 (/fcaio): ~3 hours
- **Total Stage 1: ~25 hours Claude Code time** — shippable within 72 hours wall-clock if SSH creds arrive tonight
- Chunks 6–8 paced by Brandon's dialing calendar (not Claude-bound)

---

## Next Actions (immediate)

1. **Brandon unblock:** Paste Hetzner SSH hostname + user + private key location (or Coolify API token if you prefer). Also confirm if `.env.local` still exists locally so I can recover env values, or if I'll need to re-derive.
2. **Claude Code autonomous (starts now, in parallel):**
   - Grep all `process.env` references in `src/` → env var inventory
   - Draft `Dockerfile` + `.dockerignore` adapted from `inbox-pilot/Dockerfile`
   - Add `output: 'standalone'` to `next.config.ts`
   - Local `docker build` + `docker run` smoke
   - Write `docs/coolify-migration-plan.md` with exact Brandon-facing cut-over steps
3. **Blocked waiting on Chunk 1 deploy:** Chunks 2–4 build work is all Claude-autonomous after hosting is up, so queue up drafts of (a) /assessment/success page, (b) assessment-specific voice agent prompt, (c) TSAS + 302PB case study outlines, so the work is ready to commit the moment Chunk 1 lands.
