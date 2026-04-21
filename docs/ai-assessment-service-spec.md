# AI Assessment Service — Offer Spec

**Status:** DRAFT — awaiting Brandon approval of monetization-insights-2026-04-21.md
**Owner:** Brandon (sells), Claude Code (builds)
**Model:** Adapted from Chris Kerner's "AI Assessment" playbook (see transcript 2026-04-20-chris-kerner-ai-audits.md)

## The offer

**Name:** AI Opportunity Assessment (not "audit" — people hate audits)
**Price:** $997 (launch at $997, not $497; see monetization memo re: pricing journey)
**Turnaround:** 48 hours from voice-agent call completion
**Delivery:** PDF/Gamma report emailed + 30-min walkthrough call

### What the customer pays for
1. **20–30 min voice-agent phone call** — they call our number whenever they want, day or night. AI agent interviews them about their business, team, tools, pain points.
2. **Custom report** including:
   - Executive summary of pain points
   - "Effort vs Impact" matrix of AI opportunities
   - 3–5 specific off-the-shelf tool recommendations with links and pricing
   - 4-day Quick-Win Plan ("Day 1: install Fathom. Day 2: ..."
   - Financial impact math: hours reclaimed × $100/hour = $ saved per month, minus tool cost
   - 2–4 upsell opportunities (custom implementation, systems build, training)
3. **30-min walkthrough call** with Brandon personally — this is the sales conversation for the upsell

### What it costs to deliver
- Twilio minute usage: ~$0.50
- Voice agent (Retell or existing GHL Voice AI): ~$2
- Claude tokens for report generation: ~$1
- Gamma credits: ~5 per report (we have 2,650 remaining)
- **Brandon's time:** 30 min (the walkthrough call) + 15 min (skim report before call) = **45 min per assessment**

**Margin:** ~$990 per assessment. Near pure profit.

## The sales ladder

| Step | Product | Price | Recurring? |
|---|---|---|---|
| 1 (lead gen) | Free in-person 2-hour workshop | $0 | — |
| 2 (wedge) | **AI Opportunity Assessment** | **$997 one-time** | No |
| 3 (upsell menu — pick 1) | Speed-to-lead AI agent build | $4,997 | Optional $200/mo maintenance |
| 3 (alt) | Process automation build (Zapier/Make) | $2,997 | — |
| 3 (alt) | Custom GPT / knowledge system | $3,997 | — |
| 4 (retainer) | **Fractional AI Officer** | **$4,997/mo** | YES — this is the MRR engine |

**Recommended focus for first 90 days:** speed-to-lead AI agent as the bread-and-butter upsell. Brandon already built one for TSAS — proof point is in the bag.

## Delivery pipeline (what we need to build)

### Already exists
- Twilio number +13024166285
- GHL Voice AI agent (Agent ID `69c08755d5cbc88fcd870d8c`)
- Custom voice agent at `/api/voice-inbound` — Twilio webhook, Groq LLM
- GHL location + pipeline + custom fields

### Needs to be built
| Component | Status | Est |
|---|---|---|
| Assessment-specific voice agent prompt (question bank for 5–50 employee NCC businesses) | TODO | 2 hr |
| Report template in Gamma (effort/impact matrix, quick-win plan, upsell menu) | TODO | 3 hr |
| Claude prompt + skill that takes transcript → generates docx → uploads to Gamma | TODO | 3 hr |
| Stripe payment link for $997 one-time | TODO | 5 min |
| Landing page `/assessment` (value prop, what's included, "claim your assessment" CTA → Stripe) | TODO | 2 hr |
| GHL workflow: payment → SMS number to call + calendar link for walkthrough | TODO | 30 min |
| Testimonial capture flow (Brianna + Steve deliveries) | TODO | 30 min |

**Total: ~10 hours of build time, done autonomously by Claude Code, no Brandon input needed beyond approval of this spec.**

## Voice agent question bank

Adapted from Chris's "Annie" (Retell.ai-based) for NCC DE corporate/SMB target:

### Opening (1 min)
- "Hi, I'm [AGENT NAME] from Learn and Leverage AI. Brandon asked me to hop on a quick call to learn about your business and where AI could give you time back. Got about 20 minutes? Great — let's start."
- "What's your name and role?"
- "In one sentence — what does your business do?"

### Business context (3 min)
- "Revenue range — ballpark?" (under $1M / $1–5M / $5–15M / $15–50M / $50M+)
- "How many full-time employees?"
- "Do you have a CTO or tech lead, or does that land on you?"
- "What's the last piece of software your team adopted and how did that go?"

### Pain discovery (10 min)
- "Walk me through the most annoying part of your week."
- "If you could hire one more person tomorrow, what would they do?"
- "What tasks does your team do that feel like they shouldn't need a human?"
- "How do leads come in — and how fast do you follow up?"
- "How does client onboarding work — first 7 days after they say yes?"
- "What reports or analytics do you put together by hand every week?"
- "What's the thing your team complains about most?"

### Tools in use (3 min)
- "Walk me through your tech stack — CRM, email, phone, accounting, anything else daily."
- "Are you using any AI tools today — ChatGPT, Gemini, Claude, anything?"
- "Tell me about the last time you saw AI do something impressive."

### Close (2 min)
- "Anything else I should know before I put together your report?"
- "Expect your report in about 48 hours. Brandon will schedule a 30-min walkthrough call to go through it with you."

**Total: ~20 min**

## Report template structure (Gamma)

**Slide 1 — Title:** "AI Opportunity Assessment for [Company Name]"
**Slide 2 — Value at a glance:** "Based on our conversation, we identified opportunities to reclaim **[X] hours/week** and **$[Y]/month** for your business."
**Slide 3 — Your current state:** Bullet list of pain points pulled from transcript.
**Slide 4 — Effort vs Impact matrix:** 2x2 chart. Low effort + high impact = "quick wins" highlighted.
**Slide 5–8 — Quick wins (3–5 tools):** For each:
  - Tool name + one-sentence description
  - Which pain point it solves
  - How to install it (3 steps)
  - Monthly cost
  - Estimated time saved per week
**Slide 9 — Your 4-Day Quick-Win Plan:** Daily checklist, one thing per day.
**Slide 10 — Financial impact:** Hours saved × $100/hr = $X/month minus $Y tool cost = net $Z/month.
**Slide 11 — What's next (upsell menu):** 2–4 heavier-lift builds, each with ROI math.
**Slide 12 — About Brandon:** Case study from Call2Calendar, Tri-State Aquatic, or 302 Photo Booth.
**Slide 13 — CTA:** "Book your 30-min walkthrough call: [calendar link]"

## Landing page copy (for /assessment page)

### Hero
> **Get a custom AI plan for your business — in 48 hours.**
>
> One 20-minute phone call with our AI assistant, and you'll get a report showing exactly where AI can reclaim hours, cut costs, and bring in more revenue — with specific tools, install steps, and the financial impact math already done.
>
> $997 — one-time. Delivered in 48 hours.
>
> [Get My Assessment — $997]

### What you get
- A 20–30 min phone call, any time of day — no calendar dance, no Zoom
- A custom PDF report inside 48 hours
- 3–5 specific AI tools to install, with step-by-step setup
- A 4-day Quick-Win Plan your team can execute without us
- The financial impact — in real dollars per month
- A 30-minute walkthrough call with Brandon to answer questions

### Who this is for
- New Castle County businesses doing $1M–$30M in revenue
- No CTO or in-house tech lead
- 5–50 employees
- The owner is wearing too many hats

### Who this is NOT for
- Companies already deep into AI — you don't need us
- One-person shops — ROI math doesn't work
- Enterprises with a full data science team — we're the wrong size

### Proof points
(Insert testimonials once Brianna + Steve assessments are delivered.)

### FAQ
- **Q: What if the report doesn't help me?** → 100% money-back guarantee if the report doesn't give you at least 5 hours/week in time savings.
- **Q: Can I share it with my team?** → Yes. The PDF is yours to distribute.
- **Q: What happens on the 30-min walkthrough call?** → Brandon walks you through the recommendations, answers questions, and — if it makes sense — talks about what a bigger engagement could look like. Zero pressure.

### Final CTA
> Ready to stop guessing? Grab your assessment.
>
> [Get My Assessment — $997]

## Risk flags

1. **Delivery capacity:** If 10 assessments sell in week 1, Brandon needs to do 10 × 30-min walkthrough calls = 5 hours. Cap sales or batch calls into 2 half-days.
2. **Voice agent quality:** If Annie/the-agent sounds robotic, buyers churn before the call ends. Must test with 3–5 recorded calls before promoting.
3. **Money-back risk:** If the guarantee gets abused, we lose $0 cash but burn time. Cap at 10% refund rate before we kill the guarantee.
4. **Pricing downside:** At $997, Brandon is selling 45 min of his time for $990. That's $1,320/hour effective rate. If we can't close ≥1 in 5 into an upsell/retainer, the economics still work on one-time revenue alone.
