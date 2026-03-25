# Meta Ad Campaign — LLAI Workshop (April 2)
**Created:** 2026-03-22
**Status:** ACTIVE
**Ad Account:** act_1298229182341198 (LearnAndLeverageAI — VISA *9642)
**Page:** Learn and Leverage AI (957593034113587)
**Pixel:** 1494764092013977

> **Note:** The previous campaign on Christmas Lights Dude account (120239913615340643 on act_1151770466860686) is PAUSED. This is the replacement campaign on the correct LLAI ad account.

---

## Campaign

| Field | Value |
|-------|-------|
| **Campaign ID** | `120240967900010757` |
| **Name** | LLAI Workshop - April 2 |
| **Objective** | OUTCOME_TRAFFIC |
| **Budget** | $50/day (campaign budget optimization) |
| **Bid Strategy** | LOWEST_COST_WITHOUT_CAP |
| **Schedule** | March 22 – April 1, 2026 |
| **Status** | ACTIVE |

---

## Ad Set

| Field | Value |
|-------|-------|
| **Ad Set ID** | `120240967909610757` |
| **Name** | NCC Delaware - Professionals 45-60 |
| **Optimization Goal** | LINK_CLICKS |
| **Billing Event** | IMPRESSIONS |
| **Schedule** | March 22, 6:00 PM – April 1, 11:59 PM EDT |
| **Advantage Audience** | OFF (manual targeting only) |
| **Status** | ACTIVE |

### Targeting
- **Location:** Wilmington, DE — 25-mile radius (lat 39.7391, lng -75.5398, primary_city_id: 2426985)
- **Age:** 45–60
- **Placements:**
  - Facebook: Feed, Stories
  - Instagram: Feed (stream), Stories, Reels

---

## Video Creatives (Uploaded to act_1298229182341198)

| Video | File | Video ID |
|-------|------|----------|
| V1 — Main | fb-workshop-ad-v1.mp4 | `2657588647949109` |
| Executive | fb-workshop-ad-executive.mp4 | `1465912828380594` |
| Urgency | fb-workshop-ad-urgency.mp4 | `1471636954474466` |
| Career | fb-workshop-ad-career.mp4 | `937435342023746` |
| Short | fb-workshop-ad-short.mp4 | `950000337438314` |

---

## Ads (5 A/B Variants)

### Ad 1 — Pain Point (V1 Video)
| Field | Value |
|-------|-------|
| **Ad ID** | `120240967951310757` |
| **Creative ID** | `833089253150263` |
| **Headline** | Your Boss Said "Learn AI." Here's How. |
| **CTA** | Learn More → learnandleverageai.com/workshops |
| **Primary Text** | Your company sent the email. "AI is changing everything. Get up to speed." Cool. But nobody showed you HOW... |

### Ad 2 — Social Proof (Executive Video)
| Field | Value |
|-------|-------|
| **Ad ID** | `120240967952000757` |
| **Creative ID** | `1659021415136273` |
| **Headline** | You're Not Alone — 25 Professionals Are Learning AI Together |
| **CTA** | Learn More → learnandleverageai.com/workshops |
| **Primary Text** | A bank VP told me last week: "I know AI matters, but I don't even know what Claude is."... |

### Ad 3 — Outcome (Urgency Video)
| Field | Value |
|-------|-------|
| **Ad ID** | `120240967952470757` |
| **Creative ID** | `1450585633385467` |
| **Headline** | Walk Out Using AI at Your Job This Monday |
| **CTA** | Learn More → learnandleverageai.com/workshops |
| **Primary Text** | What if you could walk into work Monday and: Summarize a 40-page report in 30 seconds... |

### Ad 4 — Career Growth (Career Video)
| Field | Value |
|-------|-------|
| **Ad ID** | `120240967952870757` |
| **Creative ID** | `1468616794876383` |
| **Headline** | The AI Skills Your Career Needs — In 2 Hours |
| **CTA** | Learn More → learnandleverageai.com/workshops |
| **Primary Text** | The people getting promoted in 2026 aren't smarter than you. They just figured out AI first... |

### Ad 5 — Short/Direct (Short Video)
| Field | Value |
|-------|-------|
| **Ad ID** | `120240967954460757` |
| **Creative ID** | `764507526539584` |
| **Headline** | Free AI Workshop — Wilmington, April 2 |
| **CTA** | Learn More → learnandleverageai.com/workshops |
| **Primary Text** | FREE AI workshop. Wilmington, DE. Thursday April 2. 6:00 PM. Bring your laptop... |

---

## Budget Summary

| Metric | Value |
|--------|-------|
| Daily budget | $50 |
| Campaign duration | 11 days (Mar 22 – Apr 1) |
| Max total spend | $550 |
| Payment method | VISA *9642 (on act_1298229182341198) |

---

## API Quick Reference

```bash
ACCESS_TOKEN="EAAmoLbxrRxYBQ5ZBq8ZCn6UukPjAVabUZBsZAKZA3DBfJkYG6OS4KlLV5ezodZANe2fimDuZAaj8kvOh0CcHBRe1SfjGvs1yVTkTfdhKLf0usHjv2rUxohev4tA9pa1mEJ3TSeDhFSbgsjhIGHsRg0BdMJ9krvwZCJwO73XifbilckGpqGaoCTcv1k6nlhNNTdHaJgZAJsfXoLQZDZD"

# Check campaign status
curl -s "https://graph.facebook.com/v21.0/120240967900010757?fields=name,status,daily_budget&access_token=${ACCESS_TOKEN}"

# Check ad set status
curl -s "https://graph.facebook.com/v21.0/120240967909610757?fields=name,status,targeting&access_token=${ACCESS_TOKEN}"

# Check all ads status
for ad_id in 120240967951310757 120240967952000757 120240967952470757 120240967952870757 120240967954460757; do
  curl -s "https://graph.facebook.com/v21.0/${ad_id}?fields=name,status,effective_status&access_token=${ACCESS_TOKEN}"
  echo ""
done

# Pause campaign
curl -X POST "https://graph.facebook.com/v21.0/120240967900010757" -d "status=PAUSED" -d "access_token=${ACCESS_TOKEN}"

# Get campaign insights (after running)
curl -s "https://graph.facebook.com/v21.0/120240967900010757/insights?fields=impressions,clicks,spend,cpc,ctr,reach&access_token=${ACCESS_TOKEN}"
```

---

## Notes

- Ad account `act_1298229182341198` was renamed from "Call2Calendar" to "LearnAndLeverageAI" and is the correct LLAI account
- Previous campaign on Christmas Lights Dude account (`act_1151770466860686`, campaign `120239913615340643`) is PAUSED — do not reactivate
- All ads point to learnandleverageai.com/workshops with "Learn More" CTA
- Targeting uses location + age only (no interest targeting) — simple and effective for local event
- Advantage Audience is OFF — targeting is strictly manual (45-60, 25mi radius of Wilmington DE)
- 5 ad variants allow Meta's algorithm to A/B test and optimize delivery toward the best performer
- Ads show "IN_PROCESS" effective_status immediately after activation — this means they are going through Meta's standard ad review (typically 24 hours)
