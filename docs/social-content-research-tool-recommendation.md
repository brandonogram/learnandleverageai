# Social Media Content Research & Planning Tool — Product Recommendation

**Date:** 2026-04-02
**Status:** Research Complete — Ready for Decision

---

## Executive Summary

Build a SaaS tool that does the RESEARCH and IDEATION phase of social media content — the part small business owners hate most and are worst at. Not another scheduling tool. Not auto-posting. The tool researches trends, analyzes what works in their industry, and hands them a weekly batch of "here's exactly what to film" briefs they can execute with a smartphone.

**Working name:** ContentBrief (or similar — the name communicates what it does)

**The gap:** Every existing tool focuses on creating/scheduling posts AFTER you know what to make. Nobody solves the "I'm staring at my phone with no idea what to post" problem for small business owners who aren't social media native.

---

## 1. Architecture Overview

### Tech Stack (Leverages What We Have)

```
Frontend:     Next.js 15 (App Router) — already in our stack
Database:     Supabase (Postgres + Auth + Edge Functions)
Hosting:      Vercel (serverless, auto-scaling)
AI Engine:    Claude API (Sonnet 4.6 for generation, Haiku for classification)
Trend Data:   Multi-source pipeline (see Section 2)
Queue:        Supabase Edge Functions + pg_cron for scheduled research jobs
Payments:     Stripe (already integrated in LLAI)
Email:        SendGrid (already configured)
```

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER DASHBOARD                        │
│  (Content Calendar · Briefs · Competitor Feed · Trends)  │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                   NEXT.JS APP LAYER                      │
│  API Routes · Server Actions · Auth Middleware            │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│               CONTENT ENGINE (Core Logic)                 │
│                                                           │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │   Trend      │  │  Competitor   │  │   Content       │ │
│  │   Aggregator │  │  Analyzer     │  │   Generator     │ │
│  └──────┬──────┘  └──────┬───────┘  └───────┬────────┘  │
│         │                │                    │           │
│  ┌──────▼────────────────▼───────────────────▼────────┐  │
│  │              AI ORCHESTRATION LAYER                  │  │
│  │    Claude Sonnet 4.6 (briefs) + Haiku (classify)    │  │
│  └─────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                    DATA LAYER                             │
│                                                           │
│  Supabase Postgres    Supabase Storage    Supabase Auth   │
│  (users, briefs,      (brief PDFs,        (Magic link +   │
│   trends, comps)       thumbnails)         Google OAuth)   │
└─────────────────────────────────────────────────────────┘
```

### Scheduled Jobs (Weekly Research Cycle)

```
Monday AM:    Trend aggregation job runs for each customer's industry
Monday AM:    Competitor content scan (new posts since last scan)
Monday PM:    AI generates 7-14 content briefs per customer
Monday PM:    Content calendar populated, email digest sent
Tuesday-Sun:  User films/creates content from briefs
Ongoing:      Performance tracking if user connects accounts
```

---

## 2. Key Data Sources & APIs

### Tier 1: High-Value, Low-Cost (Use in MVP)

| Source | What It Gets Us | Cost | Reliability |
|--------|----------------|------|-------------|
| **Google Trends** (via SerpAPI) | Search interest spikes, seasonal trends, related queries | SerpAPI: $50/mo for 5,000 searches | High — stable API |
| **YouTube Data API v3** | Trending videos in niche, search volume, competitor video analysis | Free — 10,000 units/day | High — official API |
| **Reddit API** | Trending discussions by industry subreddit, pain points, questions people ask | Free — 100 requests/min | Medium — rate limits |
| **TikTok Creative Center** | Trending hashtags, sounds, ad creative patterns | Free (manual) / RapidAPI ($20-50/mo) | Medium — unofficial API |
| **Google Search (via SerpAPI)** | "People Also Ask" questions, related searches for content ideas | Included in SerpAPI plan | High |

### Tier 2: Valuable but More Expensive (Add Post-MVP)

| Source | What It Gets Us | Cost | Notes |
|--------|----------------|------|-------|
| **Instagram Graph API** | Own account metrics, Competitive Insights (compare 10 accounts) | Free (requires FB app approval) | Can only analyze business accounts user has access to |
| **Exploding Topics** | Early-stage trending topics before they peak | $249/mo for API access | Expensive but high signal |
| **BuzzSumo API** | Top-performing content by topic, engagement data | $199-999/mo | Gold standard for content research |
| **Apify Scrapers** | Public profile data from TikTok, Instagram, LinkedIn | $49/mo for 100 actor runs | Scraping — ToS gray area |

### Tier 3: Expensive / Limited Value for SMBs (Skip or Deprioritize)

| Source | Why Not Now |
|--------|------------|
| **X/Twitter API** | $200/mo for Basic (limited), $5,000/mo for Pro. Not worth it for SMB content research. |
| **SparkToro** | No API access — explicitly bans programmatic queries. Manual use only. |
| **Meta Content Library** | Academic research focus, not commercial use. |
| **Pinterest API** | Limited trend data. Pinterest Trends website is free but no API. |

### Recommended MVP Data Stack

```
Monthly cost for data sources:
  SerpAPI (Google Trends + SERP):   $50/mo
  RapidAPI TikTok Creative Center:  $30/mo
  YouTube Data API:                 $0
  Reddit API:                       $0
  ─────────────────────────────────
  Total data cost:                  ~$80/mo (fixed, not per-customer)
```

These sources cover the four major content discovery angles:
1. **What people are searching for** (Google Trends, SERP)
2. **What's going viral on short-form video** (TikTok Creative Center, YouTube)
3. **What questions your audience is asking** (Reddit, Google PAA)
4. **What formats are performing** (YouTube trending, TikTok top ads)

---

## 3. MVP Feature Set (What Ships in V1)

### Onboarding Flow (5 minutes, guided)

1. **Business Profile Setup**
   - Business name, industry (dropdown: plumbing, HVAC, landscaping, restaurant, etc.)
   - Location (for local trend relevance)
   - Target audience description (plain English: "homeowners 35-55 in Delaware")
   - Social platforms they're active on (checkboxes)

2. **Competitor Input** (optional but encouraged)
   - "Paste links to 3 competitors' social media profiles"
   - System stores for recurring analysis

3. **Content Pillar Selection**
   - AI suggests 4-5 pillars based on their industry
   - Example for a plumber: Educational, Behind-the-Scenes, Before/After, Customer Stories, Seasonal Tips
   - User confirms or adjusts

### Core Features (V1)

#### A. Weekly Content Brief Generator (The Hero Feature)

Every week, the system generates **7-10 content briefs** (one per day, mix of platforms). Each brief includes:

- **Content Title** — what it's about
- **Platform** — which platform it's best for (with cross-post notes)
- **Format** — Reel, Carousel, TikTok, Static Post, Story, LinkedIn article
- **Hook** (first 3 seconds for video / first line for text)
- **Full Script or Caption** — word-for-word what to say
- **Shot List** (for video) — simple: "Film yourself at the job site explaining X"
- **On-Screen Text** — exactly what text overlays to add
- **Hashtags** — platform-specific, researched
- **Trending Element** — what trend this ties into and why now
- **Difficulty Rating** — Easy (selfie video) / Medium (needs B-roll) / Hard (needs editing)
- **Estimated Time to Create** — "5 minutes with your phone"

#### B. Trend Dashboard

- Weekly industry trends (what's spiking in their niche)
- Trending sounds/audio for Reels/TikTok (with links)
- "Content opportunities" — questions people are asking that nobody's answering
- Seasonal content calendar (holidays, industry events, awareness months)

#### C. Competitor Watch

- Track up to 5 competitor profiles
- Weekly digest: "Here's what your competitors posted and what got engagement"
- "Content gaps" — topics competitors aren't covering that you should

#### D. Content Calendar View

- Visual weekly/monthly calendar
- Drag-and-drop to rearrange briefs
- Mark as "Filmed," "Posted," or "Skipped"
- Tracks content consistency (streak counter)

#### E. Content Pillar Balance

- Shows distribution across pillars (are you posting too much educational, not enough behind-the-scenes?)
- Auto-balances weekly briefs across pillars

### What's NOT in V1

- Auto-posting or scheduling (use existing tools for that)
- Image/video creation (this generates the PLAN, not the asset)
- Analytics/reporting (beyond basic "did you post it?")
- Multi-user/team features
- White-labeling for agencies

---

## 4. Human Handoff: The Content Brief Format

This is the core product. The brief must be so clear that a plumber who has never made a Reel can pick up their phone and execute it.

### Example Content Brief

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTENT BRIEF #3 — Wednesday, April 9

TITLE: "The $15 Part That Saves a $3,000 Repair"
PLATFORM: Instagram Reel / TikTok (cross-post to FB)
FORMAT: Talking-head video with product demo
DIFFICULTY: Easy (5-10 min to film)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHY THIS WORKS NOW:
"Plumbing repair cost" searches are up 34% this month
(spring = pipes thawing = emergency calls). This positions
you as the honest plumber who saves people money.

HOOK (first 3 seconds — say this EXACTLY):
"This $15 part just saved my customer three thousand dollars."
[Hold up the part to camera]

SCRIPT:
"This is a pressure relief valve. Costs fifteen bucks at
Home Depot. But if it fails? You're looking at a burst
water heater and three thousand dollars in water damage.

I replace these on every service call as a courtesy.
Takes me two minutes. Most plumbers don't even check it.

If your water heater is more than 5 years old, check this
valve. If it's crusty or leaking, call a plumber before
it becomes an emergency.

Drop a comment if you want me to show you how to check
yours."

SHOT LIST:
1. Close-up of you holding the part (3 sec)
2. You talking to camera at job site or truck (20 sec)
3. Quick shot of the part on a water heater (5 sec)
4. Back to you with CTA (5 sec)

ON-SCREEN TEXT:
Line 1 (0-3 sec): "$15 part → saves $3,000"
Line 2 (15 sec): "Most plumbers skip this check"
Line 3 (end): "Comment VALVE for the how-to"

HASHTAGS:
#plumbingtips #homeownertips #plumber #plumbersoftiktok
#homemaintenance #waterheater #savemoney #[yourcity]

CONTENT PILLAR: Educational
TRENDING TIE-IN: "Cost savings" content trending +47%
across home services this week

CROSS-POST NOTES:
- LinkedIn: Skip this one (too casual for LinkedIn)
- Facebook: Post as-is, add to any local community groups
- YouTube Shorts: Same video, add 1 sec title card at start
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Brief Delivery Options (V1)

1. **Dashboard** — Always available, organized by week
2. **Email Digest** — Monday morning "Here's your content for this week"
3. **PDF Download** — Print-friendly version for people who prefer paper
4. **Mobile-Optimized View** — Read the brief while holding the camera

---

## 5. Competitive Landscape & Differentiation

### What Exists Today

| Tool | What It Does | Price | Gap |
|------|-------------|-------|-----|
| **Predis.ai** | Generates social media creatives (images, carousels, videos) from prompts | $32-59/mo | Creates posts, not plans. No trend research. No video filming briefs. |
| **Lately.ai** | Repurposes long-form content into social posts | Custom pricing | Requires existing content. Doesn't help people who have NO content. |
| **ContentStudio** | Content discovery + scheduling | $25/mo+ | Discovery is generic. No actionable briefs. Assumes user knows what to do with trends. |
| **Jasper AI** | AI copywriting for social captions | $49/mo+ | Generates text, not filming plans. No trend research integration. |
| **Ocoya** | AI social content + scheduling | $15-39/mo | Good for text posts. No video concept briefs. |
| **SocialBee** | Content categorization + scheduling | $29-99/mo | Organizes what you already have. Doesn't generate ideas. |
| **Sprout Social** | Enterprise social management | $199-399/mo | Way too expensive and complex for SMBs. |
| **Hootsuite** | Social management + some AI | $99/mo+ | Scheduling-first. AI features are bolt-ons. |
| **Buffer** | Simple scheduling + AI assistant | $5-100/mo | AI generates captions, not strategies. |
| **StoryLab.ai** | AI video brief/script generator | Free-$19/mo | One-off generation, no trend data, no ongoing planning. |

### What Makes This Different

1. **Research-first, not creation-first.** Every other tool assumes you know what to post. We figure that out FOR you based on real trend data.

2. **Video-native briefs.** Most tools generate text captions. We generate complete filming instructions — hook, script, shot list, on-screen text — for someone holding a phone.

3. **Industry-specific.** A plumber gets plumbing content ideas. A restaurant gets restaurant content ideas. Not generic "10 social media tips" — specific, timely, relevant.

4. **Weekly batch delivery.** No daily decision fatigue. Monday morning you get your whole week planned. Film when convenient.

5. **Trend-connected.** Every brief ties to a real trend (search spike, viral format, seasonal moment). You're not posting random content — you're riding waves.

6. **Built for non-creators.** Every brief assumes the user has zero social media experience. Plain language. Exact words to say. "Hold your phone like this."

7. **Competitor intelligence baked in.** Not a separate tool. Every week shows what competitors posted and what gaps you can fill.

---

## 6. Productization & Pricing Strategy

### Pricing Tiers

| Tier | Price | What's Included | Target |
|------|-------|----------------|--------|
| **Starter** | $49/mo | 7 briefs/week, 1 platform focus, trend dashboard, 3 competitor tracks | Solo business owner |
| **Growth** | $99/mo | 14 briefs/week, all platforms, competitor analysis, content calendar, priority support | Growing business |
| **Pro** | $199/mo | Everything in Growth + custom pillar strategy, monthly strategy call (AI-generated deck), API access | Serious about social |
| **Agency** (future) | $499/mo | White-label, 10 client accounts, bulk brief generation | Marketing agencies |

### Why This Pricing Works

- **$49/mo is less than 1 hour of a social media manager's time** — easy ROI argument
- **$99/mo is what they'd pay a freelancer for ONE post** — and they get 14 briefs/week
- SMB SaaS sweet spot is $29-99/mo for adoption, $99-199/mo for serious value
- Hybrid model: base subscription + overage for additional competitor tracks or extra briefs

### Pricing Psychology

- Annual discount (20% off) to reduce churn
- 14-day free trial (no credit card) — generates first week of briefs immediately
- "First week free, see your content plan before you pay"

### Revenue Model

```
Conservative (Month 12):
  100 Starter ($49)  = $4,900
  50 Growth ($99)    = $4,950
  10 Pro ($199)      = $1,990
  ────────────────────────────
  MRR:                $11,840
  ARR:                $142,080

Moderate (Month 24):
  300 Starter        = $14,700
  200 Growth         = $19,800
  50 Pro             = $9,950
  5 Agency           = $2,495
  ────────────────────────────
  MRR:                $46,945
  ARR:                $563,340
```

---

## 7. Cost to Run Per Customer

### Variable Costs (Per Customer Per Month)

| Cost Item | Calculation | Monthly Cost |
|-----------|-------------|-------------|
| **Claude API (brief generation)** | ~14 briefs/week x 4 weeks = 56 briefs. Each brief ~1,500 tokens out, ~3,000 tokens in with context. Sonnet 4.6: $3/MTok in, $15/MTok out. Total: ~$0.18/mo per customer | $0.18 |
| **Claude API (trend analysis)** | Weekly analysis job per customer, ~5,000 tokens in/out. ~$0.08/mo | $0.08 |
| **Claude API (competitor summaries)** | Weekly competitor digest, ~3,000 tokens. ~$0.06/mo | $0.06 |
| **Supabase (database + auth)** | Pro plan $25/mo shared across all customers. At 100 customers: $0.25/customer | $0.25 |
| **Vercel (hosting)** | Pro plan $20/mo shared. At 100 customers: $0.20/customer | $0.20 |
| **Data sources (shared pool)** | $80/mo fixed data costs / 100 customers | $0.80 |
| **SendGrid (email digests)** | ~4 emails/customer/month. At scale: ~$0.01/customer | $0.01 |
| **Total variable cost per customer** | | **~$1.58** |

### Margin Analysis

| Tier | Price | Variable Cost | Gross Margin |
|------|-------|--------------|-------------|
| Starter ($49) | $49 | ~$1.58 | **96.8%** |
| Growth ($99) | $99 | ~$2.50 (more briefs) | **97.5%** |
| Pro ($199) | $199 | ~$4.00 (more everything) | **98.0%** |

### Fixed Monthly Costs (Regardless of Customer Count)

```
Supabase Pro:          $25/mo
Vercel Pro:            $20/mo
SerpAPI:               $50/mo
TikTok RapidAPI:       $30/mo
SendGrid:              $0 (free tier up to 100 emails/day)
Domain/DNS:            $2/mo
Error monitoring:      $0 (Vercel built-in)
──────────────────────────────
Total fixed:           ~$127/mo
```

**Breakeven: 3 Starter customers cover all fixed costs.**

### Cost at Scale

At 500 customers:
- Variable: 500 x $2 avg = $1,000/mo
- Fixed (scaled up): ~$300/mo (higher API tiers)
- Total: ~$1,300/mo
- Revenue (at $79 avg): ~$39,500/mo
- **Gross margin: ~96.7%**

This is extremely capital-efficient. AI costs are the minority of spend, and they're declining 50%+ annually.

---

## 8. MVP Build Timeline

### Phase 1: Core Engine (Weeks 1-3)

```
Week 1:
  - Database schema (users, businesses, briefs, competitors, trends)
  - Supabase auth (magic link + Google OAuth)
  - Onboarding flow (business profile, industry, platforms)
  - Content pillar selection UI

Week 2:
  - Trend aggregation pipeline (Google Trends + YouTube + Reddit)
  - Claude API integration for brief generation
  - Brief template system (industry-specific prompts)
  - First working brief generation (input: industry → output: 7 briefs)

Week 3:
  - Content calendar UI (week view)
  - Brief detail view (the full content brief card)
  - Email digest system (Monday morning delivery)
  - Basic competitor tracking (store URLs, manual analysis)
```

### Phase 2: Polish & Launch (Weeks 4-6)

```
Week 4:
  - Competitor analysis automation (scrape public posts, summarize)
  - Trend dashboard UI
  - Brief customization (regenerate, edit, swap out)
  - Mobile-responsive brief view

Week 5:
  - Stripe subscription integration
  - Free trial flow (14 days, no CC)
  - Settings page (preferences, notification schedule, pillars)
  - PDF export of weekly briefs

Week 6:
  - Landing page + marketing site
  - Beta testing with 10-20 LLAI workshop attendees
  - Bug fixes, performance optimization
  - Launch prep (Product Hunt, social, email list)
```

### Phase 3: Post-Launch Iteration (Weeks 7-12)

```
  - Performance tracking (did they post? what happened?)
  - Instagram/TikTok account connection for personalized analysis
  - A/B brief variants ("try this hook OR this hook")
  - Brief quality scoring based on user feedback
  - Agency/multi-account features
  - Expanded trend sources (Exploding Topics, BuzzSumo)
```

### Total Timeline: 6 weeks to launchable MVP, 12 weeks to mature V1

This is achievable because:
- Next.js + Supabase + Vercel stack is already proven in our LLAI project
- Stripe integration already exists
- Claude API is the core intelligence — no ML training needed
- The product is content (briefs), not complex UI interactions

---

## 9. Risk Assessment & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **API data sources change/break** | Medium | Medium | Multi-source redundancy. No single point of failure. Graceful degradation. |
| **Brief quality inconsistent** | Medium | High | Industry-specific prompt engineering. User feedback loop. Human review for first 100 customers. |
| **SMB churn (3-7% monthly is normal)** | High | High | Annual pricing incentive. Weekly "you missed content" nudges. Show ROI metrics. |
| **Competitor copies the idea** | Medium | Low | Speed to market + niche focus (blue-collar businesses) = defensible moat. |
| **Users don't actually film the content** | High | High | Difficulty ratings. "Easy wins" briefs. Streak/gamification. SMS reminders. |
| **Scraping competitors gets ToS issues** | Medium | Medium | Use only official APIs + publicly available data. No login-required scraping. |
| **AI costs increase** | Low | Low | Costs are trending DOWN 50%+ annually. Current margins are 96%+. |

---

## 10. Go-To-Market Strategy

### Launch Audience (Built-In)

1. **LLAI Workshop Attendees** — Already trust Brandon, already know they need content help
2. **LLAI Email List** — Direct marketing channel
3. **Blue-collar business networks** — Brandon's existing relationships

### Distribution Channels

1. **LLAI Workshops** — Demo the tool live, offer attendee discount
2. **Content marketing** — "We use this tool to plan all our content" (meta: tool that creates content about creating content)
3. **Product Hunt launch** — Target "AI tools for small business" category
4. **LinkedIn organic** — Brandon's network of business owners
5. **Partner with other consultants** — Affiliate/referral program
6. **Local business meetups** — Free "social media content planning" workshops powered by the tool

### Positioning

> "Your social media manager costs $2,000/month and still asks YOU what to post.
> ContentBrief costs $49/month and tells you exactly what to film, what to say,
> and when to post it — based on what's actually trending in your industry right now."

---

## 11. Key Decisions Needed

1. **Build standalone or integrate into LLAI site?**
   - Recommendation: Standalone product, separate domain, separate billing
   - Reason: Different product, different pricing, different customer lifecycle

2. **Which industries to support at launch?**
   - Recommendation: Start with 5-10 blue-collar industries Brandon knows (plumbing, HVAC, landscaping, cleaning, construction, restaurants, auto repair)
   - Expand based on demand

3. **Free tier or free trial only?**
   - Recommendation: 14-day free trial (generates 2 weeks of briefs), then paid
   - A free tier creates support load without revenue

4. **Name and domain?**
   - Needs research. Suggestions: ContentBrief.ai, WeeklyBrief.co, BriefEngine.com, PostPlan.ai

5. **Solo build or hire help?**
   - MVP is buildable solo with Claude Code in 6 weeks
   - Post-launch scaling may need a part-time frontend dev

---

## Appendix A: Full API Reference

### Google Trends (via SerpAPI)
- **Endpoint:** `serpapi.com/google-trends-api`
- **Data:** Interest over time, related queries, rising topics, geographic breakdown
- **Auth:** API key
- **Rate limit:** 5,000 searches/mo on $50 plan
- **Best for:** Seasonal trends, search interest spikes, "what are people looking for right now"

### YouTube Data API v3
- **Endpoint:** `googleapis.com/youtube/v3/`
- **Data:** Trending videos, search results, video statistics, channel data
- **Auth:** Google Cloud API key
- **Rate limit:** 10,000 units/day free (search = 100 units, video details = 1 unit)
- **Best for:** Trending video formats, competitor YouTube analysis, topic research

### Reddit API
- **Endpoint:** `oauth.reddit.com/`
- **Data:** Hot/rising/top posts by subreddit, comments, user discussions
- **Auth:** OAuth2 (client credentials)
- **Rate limit:** 100 requests/minute
- **Best for:** Real questions people ask, pain points, discussion topics by industry

### TikTok Creative Center (via RapidAPI)
- **Endpoint:** `rapidapi.com/Lundehund/api/tiktok-creative-center-api`
- **Data:** Trending hashtags, trending music, top-performing ad creatives
- **Auth:** RapidAPI key
- **Rate limit:** Plan-dependent ($20-50/mo)
- **Best for:** Trending sounds, hashtags, viral content patterns

### Instagram Graph API
- **Endpoint:** `graph.facebook.com/v21.0/`
- **Data:** Own business account metrics, Competitive Insights (up to 10 accounts)
- **Auth:** Facebook App + Instagram Business Account token
- **Rate limit:** 200 calls/user/hour
- **Best for:** Post-MVP competitor tracking for connected accounts
- **Limitation:** Can only analyze accounts the user has access to or that are in Competitive Insights

### Google Search (via SerpAPI)
- **Endpoint:** `serpapi.com/search` (type: google)
- **Data:** "People Also Ask" questions, related searches, featured snippets
- **Auth:** Same SerpAPI key
- **Best for:** Content topic ideas based on what people actually search for

---

## Appendix B: Database Schema (Draft)

```sql
-- Core tables
businesses (id, user_id, name, industry, location, target_audience, platforms[], created_at)
content_pillars (id, business_id, name, description, color, sort_order)
competitors (id, business_id, platform, handle, url, last_scanned_at)

-- Content briefs
briefs (id, business_id, pillar_id, week_of, platform, format, title,
        hook, script, shot_list[], on_screen_text[], hashtags[],
        trend_tie_in, difficulty, estimated_time_minutes,
        cross_post_notes, status, created_at)

-- Trends
trends (id, industry, source, topic, trend_score, data_json, fetched_at)
trend_snapshots (id, business_id, week_of, summary, top_trends[], created_at)

-- Competitor tracking
competitor_posts (id, competitor_id, platform, post_url, content_preview,
                  format, engagement_score, captured_at)
competitor_digests (id, business_id, week_of, summary, gaps[], created_at)

-- User engagement
brief_interactions (id, brief_id, action, timestamp)
-- actions: viewed, saved, marked_filmed, marked_posted, skipped, regenerated
```

---

## Appendix C: LLM Prompt Architecture

### Brief Generation System Prompt (Simplified)

```
You are a social media content strategist for small businesses.
You create content briefs that a non-technical business owner
can execute with just a smartphone.

INDUSTRY: {industry}
BUSINESS: {business_name}
LOCATION: {location}
AUDIENCE: {target_audience}
PLATFORMS: {platforms}
CONTENT PILLARS: {pillars}

CURRENT TRENDS:
{trend_data}

COMPETITOR ACTIVITY:
{competitor_summary}

Generate {count} content briefs for the week of {week}.
Balance across content pillars.
Mix difficulty levels (mostly Easy, some Medium).
Tie each brief to a current trend when possible.
Every brief must include: title, platform, format, hook,
full script, shot list, on-screen text, hashtags,
trend tie-in, difficulty rating, and cross-post notes.

Write scripts in plain, conversational language.
The person reading this has never created social media content.
Be specific: "Hold your phone vertically and film yourself
at eye level" not "Create a vertical video."
```

This prompt structure allows industry-specific customization while maintaining consistent brief quality.
