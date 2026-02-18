# Learn and Leverage AI — Living Context

**Last Updated:** 2026-02-17
**Status:** Active (URGENT — webinar Feb 27)
**Owner:** Elon (project lead), with Marlo, Cash, and Sentinel on tasks

## What This Is
The website and marketing hub for LearnAndLeverageAI.com — Brandon's AI consulting brand targeting contractors and blue-collar businesses. Currently pivoting to a **free webinar funnel** to drive paid service sales. Built with Next.js, Supabase, and deployed on Vercel.

## Current State
**ACTIVE with critical deadlines.** The site is deployed to Vercel (project: `learnandleverageai`). The homepage redirects to `/event` (webinar landing page). There is also a `/concierge` page and API routes for contact, registration, and concierge applications.

### Webinar: "AI for Contractors: Stop Losing Money to Missed Calls & Manual Work"
- **Date:** February 27, 2026 at 2:00 PM EST
- **Format:** Free live Zoom webinar (45 min + 15 min Q&A)
- **CTA:** AI Starter Pack — $497 (webinar-only price, normally $750)
- **Target:** 200+ registrations, 50 live attendees, 5 Starter Pack sales = $2,485

### Task Status (from STATE.yaml, updated Feb 14):
| Task | Status | Owner | Deadline |
|------|--------|-------|----------|
| Webinar landing page rewrite | draft_ready | Marlo | Feb 17 |
| Webinar script (45-min) | draft_ready | Marlo | Feb 20 |
| Zoom webinar setup | not_started | Sentinel | Feb 25 |
| Email capture sequence (5 emails) | draft_ready | Marlo | Feb 22 |
| AI Starter Pack Stripe checkout | not_started | Cash | Feb 22 |
| Promotion campaign (X, Reddit, FB) | draft_ready | Marlo | Feb 18 |
| AI Audit Checklist PDF | not_started | Marlo | Feb 20 |
| Service pricing page | draft_ready | Cash | After webinar |

### Decision Log
- **Feb 17:** MAJOR landing page redesign — mobile-first, 70% less text, AI-generated images, countdown timer, streamlined registration (name+email+phone). Preview deployed. Brandon reviewing.
- **Feb 14:** "Free webinar to paid services funnel" approved by Brandon. Pivoted from direct sales to webinar-first approach.

## Key Files
- `src/app/page.tsx` — Redirects to /event
- `src/app/event/` — Webinar landing/event page
- `src/app/concierge/` — Concierge service page
- `src/app/api/register/route.ts` — Webinar registration API
- `src/app/api/contact/route.ts` — Contact form API
- `src/app/api/concierge-apply/route.ts` — Concierge application API
- `src/lib/` — Shared utilities
- `docs/pricing-guide.md` — 4-tier pricing structure
- `docs/client-intake-questionnaire.md` — Client onboarding questionnaire
- `marketing/` — All webinar marketing assets:
  - `webinar-landing-page-copy.md` — Landing page copy draft
  - `webinar-script-outline.md` — 45-min webinar script
  - `webinar-email-sequence.md` — 5-email drip sequence
  - `webinar-promo-posts.md` — Social media promotion posts
  - `ai-starter-pack-offer.md` — $497 offer details
  - `ai-audit-checklist-outline.md` — Lead magnet PDF outline
  - `brand-voice-qa-report.md` — Brand voice guidelines
  - `landing-page-excellence/` — Landing page research/best practices
  - `promo-drafts-feb15/` — Latest promotion drafts
- `STATE.yaml` — Full project state with tasks, deadlines, and owners
- `.vercel/project.json` — Vercel deployment config

### Recent Changes (Feb 17)
- **Landing page completely redesigned** for mobile-first:
  - Full-bleed hero image with contractor + phone at job site
  - Live countdown timer to Feb 27 2:00 PM EST
  - Text cut by ~70% — punchy headlines, bullet points, no walls of text
  - 4 AI-generated images added to `/public/images/`: hero-contractor.png, ai-dashboard.png, before-after.png, happy-contractors.png
  - Big bold "Reserve My Spot" CTA buttons throughout (amber-500, animated pulse in nav)
  - Social proof section with Brandon's bio card + stats
  - Before/After visual section
  - AI Starter Pack ($497) positioned as attendee bonus, not main price
  - Registration form simplified to name + email + phone
  - FAQ answers shortened
  - Compact event details bar (4-column grid)
  - Touch-friendly: active:scale-95 on buttons, generous tap targets
- **Preview deployed:** https://learnandleverageai-j0apvx7so-brandon-calloways-projects.vercel.app
- NOT deployed to production — awaiting Brandon's review

## What Needs to Happen Next
**URGENT — 11 days until webinar (Feb 27):**
1. ~~**NOW (by Feb 17):** Finalize and deploy webinar landing page with email capture + countdown timer~~ ✅ DONE — mobile-first redesign deployed to prod
1a. **TODO:** Add full analytics — PostHog (event tracking, funnels, session replays), GA4 (traffic sources), Google Search Console (SEO), conversion tracking on registration form
2. **NOW (by Feb 18):** Launch promotion campaign across X, Reddit, Facebook groups
3. **By Feb 20:** Finalize webinar script, AI Audit Checklist PDF lead magnet
4. **By Feb 22:** Build AI Starter Pack Stripe checkout ($497), finalize email sequence
5. **By Feb 25:** Set up Zoom webinar with registration, test audio/video
6. **After webinar:** Build /services pricing page based on validated demand
