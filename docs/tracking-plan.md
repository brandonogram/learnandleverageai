# Tracking Plan — LearnAndLeverageAI Workshop Page

> Last updated: 2026-03-22

## Analytics Platforms

| Platform    | ID / Key                                      | Location              |
|-------------|-----------------------------------------------|-----------------------|
| GA4         | `G-EZ5QMDJ5R6`                                | `src/app/layout.tsx`  |
| PostHog     | `phc_f0x9z3Y8FCegigCHteagGt0yiE3ks6zdJvUo2nvRfBL` (Project 352506) | `src/lib/posthog.tsx` → `src/app/workshops/layout.tsx` |
| Meta Pixel  | `1494764092013977`                             | `src/app/workshops/layout.tsx` |
| Vercel Analytics | Built-in                                  | `src/app/layout.tsx`  |

---

## Conversion Events

### `workshop_registration`

Fires when a user successfully submits the registration form.

| Platform   | How it fires | Properties |
|------------|-------------|------------|
| **GA4**    | `gtag('event', 'workshop_registration', {...})` | `method: 'website'`, `value: 0`, `currency: 'USD'` |
| **PostHog** | `posthog.capture('workshop_registration', {...})` | `company`, `job_title`, `ai_skill_level`, `challenge` |
| **Meta Pixel** | `fbq('track', 'Lead', {...})` | `content_name: 'Workshop Registration'`, `content_category: 'Free Workshop'` |

**File:** `src/lib/analytics.ts` → `trackWorkshopRegistration()`
**Triggered in:** `src/app/workshops/page.tsx` → `handleSubmit()`

**Decision it informs:** Overall conversion rate. Is the page converting visitors into registrants? Breakdown by source shows which ad channels are working.

---

## Page Engagement Events

### `form_started`

Fires once when user first focuses on or types into any registration form field.

| Platform | Properties |
|----------|-----------|
| GA4      | `form_name: 'workshop_registration'` |
| PostHog  | `form_name: 'workshop_registration'` |

**Decision:** Form start rate vs. conversion rate = form friction. If many start but few finish, the form is too long or confusing.

---

### `form_field_completed`

Fires once per field when user enters a non-empty value.

| Platform | Properties |
|----------|-----------|
| GA4      | `form_name: 'workshop_registration'`, `field: <field_name>` |
| PostHog  | `form_name: 'workshop_registration'`, `field: <field_name>` |

**Fields tracked:** `name`, `email`, `phone`, `company`, `jobTitle`, `aiSkill`, `biggestChallenge`

**Decision:** Identifies which form field causes the most drop-off. If 80% complete "name" but only 40% complete "phone", we know phone is the friction point.

---

### `cta_clicked`

Fires when any "Register" / "Save My Seat" button is clicked.

| Platform | Properties |
|----------|-----------|
| GA4      | `cta_label: <button text>`, `cta_location: <section>` |
| PostHog  | `cta_label: <button text>`, `cta_location: <section>` |

**Locations tracked:**
- `sticky_nav` — Fixed top navigation bar
- `hero` — Hero section "Register for Free"
- `what_youll_learn` — "Save My Seat" after agenda
- `workshop_details` — "Register for Free" after details
- `final_cta` — Bottom final call-to-action

**Decision:** Which CTA placement drives the most clicks? Should we add/remove CTAs? Which copy ("Register for Free" vs "Save My Seat") converts better?

---

### `faq_expanded`

Fires when a user opens an FAQ accordion item.

| Platform | Properties |
|----------|-----------|
| GA4      | `question: <faq question>`, `index: <number>` |
| PostHog  | `question: <faq question>`, `index: <number>` |

**Decision:** Which questions are prospects most curious about? Most-expanded FAQs suggest objections to address earlier on the page.

---

### `scroll_depth`

Fires at 25%, 50%, 75%, and 100% scroll milestones (once per milestone per page view).

| Platform | Properties |
|----------|-----------|
| GA4      | `percent: <25|50|75|100>`, `page: '/workshops'` |
| PostHog  | `percent: <25|50|75|100>`, `page: '/workshops'` |

**Decision:** Where do visitors lose interest? If most reach 50% but not 75%, the content between those points needs improvement.

---

## UTM Parameter Tracking

### Capture Flow

1. Visitor arrives at `/workshops?utm_source=facebook&utm_medium=cpc&utm_campaign=april-workshop`
2. JavaScript reads UTM params from URL on page load
3. Params stored in `sessionStorage` (persist across same-session navigation)
4. Params set as PostHog person properties (for attribution)
5. Params included in form submission payload
6. API route logs UTM params and adds them as GHL contact tags

### Parameters Captured

| Param          | Example Values | Storage |
|----------------|---------------|---------|
| `utm_source`   | `facebook`, `linkedin`, `google`, `email` | sessionStorage, PostHog, GHL tag (`source:facebook`) |
| `utm_medium`   | `cpc`, `social`, `email`, `organic` | sessionStorage, PostHog, GHL tag (`medium:cpc`) |
| `utm_campaign` | `april-workshop`, `linkedin-promo` | sessionStorage, PostHog, GHL tag (`campaign:april-workshop`) |
| `utm_term`     | `ai workshop wilmington` | sessionStorage, PostHog |
| `utm_content`  | `variant-a`, `hero-image` | sessionStorage, PostHog |

### GHL Contact Tags

Each registration creates a contact with these tags:
- `workshop-lead` (always)
- `source:<utm_source>` (if present)
- `medium:<utm_medium>` (if present)
- `campaign:<utm_campaign>` (if present)

The GHL `source` field is also set to `utm_source` when available.

**Files:**
- `src/lib/analytics.ts` → `captureUTMParams()`, `setPostHogUTMProperties()`
- `src/app/workshops/page.tsx` → captures on mount, passes to form submit
- `src/app/api/workshop-register/route.ts` → receives UTM, adds to GHL tags

**Decision:** Which ad channels (Facebook, LinkedIn, Google, email) are driving workshop registrations? What is the cost per registration by channel?

---

## Automatic Tracking (no custom code required)

| What | Platform | Notes |
|------|----------|-------|
| Page views | GA4, PostHog, Meta Pixel | All fire `PageView` automatically |
| Page leave | PostHog | `capture_pageleave: true` in config |
| Autocapture (clicks, inputs) | PostHog | `autocapture: true` — captures all clickable elements |
| Session recordings | PostHog | Available if enabled in PostHog dashboard |
| Vercel Web Analytics | Vercel | Page views, visitors, referrers |

---

## Implementation Files

| File | Purpose |
|------|---------|
| `src/lib/posthog.tsx` | PostHog initialization and React provider |
| `src/lib/analytics.ts` | All tracking functions (GA4, PostHog, Meta Pixel) and UTM utilities |
| `src/app/workshops/layout.tsx` | PostHog provider wrapper + Meta Pixel script |
| `src/app/workshops/page.tsx` | Event firing for CTA clicks, form interactions, FAQ, scroll |
| `src/app/api/workshop-register/route.ts` | Server-side UTM logging and GHL tag creation |
| `src/app/layout.tsx` | GA4 script tag (site-wide) |

---

## Key Metrics to Monitor

| Metric | Formula | Target | Tool |
|--------|---------|--------|------|
| **Conversion Rate** | Registrations / Unique Visitors | > 15% | GA4, PostHog |
| **Form Start Rate** | form_started / Page Views | > 30% | PostHog |
| **Form Completion Rate** | Registrations / form_started | > 50% | PostHog |
| **Form Drop-off Field** | Lowest form_field_completed count | — | PostHog |
| **Best CTA** | Highest cta_clicked by location | — | PostHog |
| **Scroll Depth** | % reaching 75%+ | > 40% | GA4, PostHog |
| **Top Channel** | Registrations by utm_source | — | GHL, PostHog |
| **Cost Per Registration** | Ad Spend / Registrations by source | < $5 | Meta Ads + GHL |
