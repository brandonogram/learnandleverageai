# GHL Pipeline Spec: fCAIO Prospects

**Purpose:** Separate from the existing workshop pipeline (`Lb2EtR2nnxlLGRWCwBpD`). This pipeline tracks owners moving through the assessment + retainer funnel.

**Status:** Spec only. Brandon creates in GHL UI (the API supports listing/adding contacts to pipelines but not creating them).

---

## Pipeline metadata

- **Name:** `fCAIO Prospects`
- **Sub-account:** Learn and Leverage AI (existing)
- **Currency:** USD
- **Visibility:** Brandon only initially (no team)

---

## Stages (in order)

| # | Stage | Trigger to enter | Exit criteria | Brandon SLA |
|---|-------|------------------|---------------|-------------|
| 1 | `Researched` | Manual — Brandon adds a contact from the target list (`marketing/2026-04-21-target-list-v2.md`) | First outreach attempt logged | n/a |
| 2 | `Outreached — no reply` | After first call/DM/email goes out, before any reply | 2 follow-ups attempted across 7 days | 7 days max |
| 3 | `Replied — discovery scheduled` | Prospect responds, discovery call on calendar | Discovery call held | 5 days max from reply |
| 4 | `Discovery — held` | Discovery call notes saved (Granola transcript or manual notes) | Decision: assessment offered + accepted, declined, or "thinking" | 3 days max |
| 5 | `Assessment — paid, awaiting intake` | Stripe webhook fires + tag `assessment-purchased` set | Intake transcript received | 5 days max (Workflow 1 nudges twice) |
| 6 | `Assessment — intake done, report in progress` | Brandon receives intake transcript email + manually moves contact | Report delivered | 48 business hours |
| 7 | `Assessment — delivered` | Report PDF emailed to buyer + calendar link sent | Walkthrough booked | 7 days max |
| 8 | `Walkthrough booked` | Calendar booking received | Walkthrough call held | 14 days max |
| 9 | `Walkthrough done` | Brandon's notes from walkthrough saved | Decision: build proposed, advisory proposed, declined, or "let me think" | 5 days max |
| 10 | `Build proposed` | $4,997 one-time scope sent | Signed agreement OR declined | 14 days max |
| 11 | `Advisory proposed` | $4,997/mo monthly engagement scope sent | Signed agreement OR declined | 14 days max |
| 12 | `Build signed — month 1 in progress` | Agreement signed, deposit received | Build complete | 30 days |
| 13 | `Advisory signed — active` | Agreement signed, first payment received | Stays here while active; moves to "Advisory ended" if cancelled | n/a |
| 14 | `Win — Build delivered` | Build handoff complete, payment cleared | Move to `Referral asked` after 30 days | n/a |
| 15 | `Referral asked` | 30 days after a win, contact prompted for 2 referral intros | Referrals provided OR no response after 14 days | 14 days |
| 16 | `Lost — declined` | Prospect explicitly declined at any stage | n/a — terminal | n/a |
| 17 | `Lost — no reply` | 21 days with no response after last outreach | n/a — terminal | n/a |
| 18 | `Cooling — revisit Q3` | "Not now, ask me later" — set follow-up date 3+ months out | Revisit on follow-up date | n/a |

---

## Tags

| Tag | Meaning | Set by |
|-----|---------|--------|
| `assessment-purchased` | Stripe webhook detected $997 paid | webhook/stripe handler |
| `assessment-intake-pending` | Paid but hasn't called intake line | webhook/stripe handler |
| `assessment-intake-done` | Intake transcript received | Brandon (manual) |
| `assessment-delivered` | Report sent to buyer | Brandon (manual) |
| `walkthrough-done` | Walkthrough call complete | Brandon (manual) |
| `build-signed` | $4,997 one-time engagement signed | Brandon (manual) |
| `advisory-signed` | $4,997/mo engagement signed | Brandon (manual) |
| `referral-source` | This contact has provided a referral | Brandon (manual) |
| `do-not-contact` | Hard stop, never reach out again | Brandon (manual) |

---

## Custom fields (LLAI sub-account)

Add these to the GHL contact custom fields if they don't exist yet (some may already exist for the workshop pipeline):

| Field name | Type | Purpose |
|------------|------|---------|
| `Industry` | dropdown (8 ICP industries from target list) | Segment + tailor outreach |
| `Employee Count` | dropdown (1-9 / 10-25 / 26-50 / 51-100 / 100+) | ICP fit scoring |
| `Has CTO` | yes/no | ICP filter — "no" = good fit |
| `Pain Hypothesis` | text (long) | The pain we think they have, written before first call |
| `First Outreach Date` | date | Used to calculate stage SLAs |
| `Last Touch Date` | date | When the most recent attempt was made |
| `Source` | dropdown (warm-network / cold-call / linkedin-dm / referral / inbound / other) | Conversion analysis |
| `Assessment Paid At` | datetime | Set by webhook |
| `Assessment Delivered At` | datetime | Set manually by Brandon |
| `Walkthrough Held At` | datetime | Set manually |
| `Lost Reason` | dropdown (price / not now / not a fit / no need / silent / other) | For weekly review |

---

## Workflows referenced from this pipeline

- **Workflow 1 — Assessment Payment Confirmed** — see `docs/ghl-assessment-workflow.md`
- **Workflow 2 — Assessment Intake Transcript Received** — see same doc
- **Workflow 3 — Assessment Delivered** — see same doc
- **Workflow 4 — Walkthrough booked → 24-hour reminder** — TBD (Chunk 7+ when first walkthrough fires)
- **Workflow 5 — Stage SLA breach alert** — TBD (Chunk 7+ — Brandon gets a notification when a contact has been in any stage past its SLA)

---

## Why this pipeline, not the workshop one

The workshop pipeline (`Lb2EtR2nnxlLGRWCwBpD`) was built for free in-person workshop attendees. Its stages are wrong for a paid B2B funnel — no payment stage, no retainer stages, no referral capture. Trying to repurpose it would force every fCAIO prospect through "registered → confirmed → attended" stages that don't apply.

Cleaner: separate pipeline. Workshop attendees who later become fCAIO prospects get duplicated to the new pipeline, not migrated. The two systems run side by side.

---

## Setup steps for Brandon (≈45 min in GHL UI)

1. Settings → Pipelines → Create new pipeline → Name: `fCAIO Prospects`
2. Add the 18 stages above in order
3. Settings → Custom Fields → Add the 11 fields listed in the table above (skip duplicates of fields already created for workshop)
4. Settings → Tags → Add the 9 tags listed above (skip duplicates)
5. Conversations → Workflows → Create Workflow 1 from `docs/ghl-assessment-workflow.md` (use the SMS + email + task content there verbatim)
6. Move the existing 6 verified target list contacts (and any new ones from `marketing/2026-04-21-target-list-v2.md` once it lands) into stage 1 with `Source = cold-call` or `warm-network` as appropriate
7. Test: drop a fake contact through stages 1 → 5, verify Workflow 1 fires the SMS + email correctly to a test phone/email Brandon controls
