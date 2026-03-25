# Meta Business Setup — Learn & Leverage AI

> **Status:** SETUP COMPLETE (except profile/cover photos + Instagram + video ad upload)
> **Date:** 2026-03-22
> **Business Manager:** The Calloway Family Businesses (ID: 1648215349007735)

---

## Completed Setup

### Facebook Page
- **Page Name:** Learn and Leverage AI
- **Page ID (Graph API):** `957593034113587`
- **Page URL:** https://www.facebook.com/people/Learn-and-Leverage-AI/61579240241708/
- **Facebook Profile ID:** `61579240241708`
- **Category:** Education website
- **About:** Empowering you to learn, leverage, and thrive with AI. Tips, tools, and strategies to succeed.
- **Phone:** +1 (302) 416-6285 (Twilio dedicated number — NOT Brandon's personal)
- **Email:** info@learnandleverageai.com
- **Website:** https://learnandleverageai.com/
- **Added to Business Manager:** Yes (CONFIRMED status)
- **Page Access Token:** Available via `/me/accounts` endpoint

### Meta Pixel
- **Primary Pixel ID:** `1494764092013977` (LearnAndLeverageAI Pixel — created by external process)
- **Secondary Pixel ID:** `2066967650885628` (LearnAndLeverageAI Pixel — created via API)
- **Installed in code:** `src/app/workshops/layout.tsx` — using pixel ID `1494764092013977`
- **Pixel shared with ad accounts:**
  - act_288776229105843 (302 PB — active)
  - act_1151770466860686 (Christmas Lights Dude — active)
  - act_1733033720927071 (Pool Cleaning Dude — active)

### Ad Account
- **Cannot create new ad account:** Business Manager has reached the maximum number of ad accounts (5)
- **Recommended for LLAI ads:** Use `act_105109866` (Brandon Calloway personal, active, $0 balance) or `act_1151770466860686` (Christmas Lights Dude, active)
- **Alternative:** Clear the unsettled balance on TriState (`act_1593170081837287`, $17.27) or Call2Calendar (`act_1298229182341198`, $85.15) to reactivate

### Profile Picture & Cover Photo
- **Profile picture generated:** `/public/images/llai-profile-pic.jpg` (AI brain/circuit logo, 512x512)
- **Cover photo generated:** `/public/images/llai-cover-photo.jpg` (workshop classroom, 1024x576)
- **UPLOAD STATUS:** NOT YET UPLOADED — requires Brandon to upload via Facebook UI (2 min)

---

## Brandon's Remaining Manual Tasks (~10 minutes total)

### 1. Upload Profile Picture (1 min)
1. Go to https://www.facebook.com/profile.php?id=61579240241708
2. Click on the profile picture area (silhouette)
3. Upload `/public/images/llai-profile-pic.jpg`

### 2. Upload Cover Photo (1 min)
1. Click "Add cover photo" at the top
2. Upload `/public/images/llai-cover-photo.jpg`

### 3. Add CTA Button (1 min)
1. On the page, click "Edit" or "Add Button"
2. Choose "Sign Up"
3. Set URL to: `https://learnandleverageai.com/workshops`

### 4. Create Instagram Account (3 min)
1. In Meta Business Suite, click "Connect Instagram"
2. Click "Create a new Instagram profile"
3. Fill in:
   - **Email:** info@learnandleverageai.com
   - **Name:** Learn and Leverage AI
   - **Username:** learnandleverageai
   - **Password:** (generate a strong password)
   - **Birthday:** Any date 18+
4. Click Continue
5. Switch to Business account if prompted

### 5. Upload 5 Video Ads to Ads Manager (3 min)
1. Go to Ads Manager > Ad Account (your personal or any active one)
2. Create a new campaign (or go to Creatives library)
3. Upload these 5 videos from `videos/ads/`:
   - `fb-workshop-ad-v1.mp4`
   - `fb-workshop-ad-executive.mp4`
   - `fb-workshop-ad-urgency.mp4`
   - `fb-workshop-ad-career.mp4`
   - `fb-workshop-ad-short.mp4`

### 6. Set Up Ad Campaign (5 min)
- **Budget:** $15/day
- **Targeting:** New Castle County, DE, ages 45-60, high income
- **Objective:** Conversions (Sign Up)
- **Creative:** The 5 video ads above
- **Landing page:** https://learnandleverageai.com/workshops
- **Pixel:** 1494764092013977

---

## Current Meta Infrastructure

### Business Manager
- **Name:** The Calloway Family Businesses
- **ID:** 1648215349007735
- **Created:** 2023-09-03

### All Pages (7 — including LLAI)
| Page | ID | Category |
|------|-----|----------|
| **Learn and Leverage AI** | **957593034113587** | **Education website** |
| Tri-State Aquatic Solutions | 1040516632469960 | Swimming Pool & Hot Tub Service |
| Call2Calendar | 867182333154601 | Tech |
| Christmas Lights Dude | 789947630870959 | Contractor |
| Pool Cleaning Dude | 626326477229302 | Swimming Pool Cleaner |
| Booth Launch Pad | 447031875161239 | — |
| 302PhotoBooth | 112329791969729 | Photographer |

### Ad Accounts (5 — MAX REACHED)
| Ad Account | ID | Status | Notes |
|-----------|-----|--------|-------|
| TriStateAquaticSolutions-Ad-AccountV2 | act_1593170081837287 | Unsettled (3) | $17.27 balance |
| Call2Calendar | act_1298229182341198 | Unsettled (3) | $85.15 balance |
| Christmas Lights Dude | act_1151770466860686 | Active (1) | LLAI pixel shared |
| Pool Cleaning Dude | act_1733033720927071 | Active (1) | LLAI pixel shared |
| 302 PB Ad Account | act_288776229105843 | Active (1) | LLAI pixel shared |

### Personal Ad Account (not in BM)
- **ID:** act_105109866
- **Name:** Brandon Calloway
- **Status:** Active (1)
- **Recommended for LLAI ads**

### Pixels
| Pixel | ID | Shared With |
|-------|-----|-------------|
| **LearnAndLeverageAI Pixel (primary)** | **1494764092013977** | CLD act |
| LearnAndLeverageAI Pixel (secondary) | 2066967650885628 | 302 PB, CLD, PCD acts |

### API Token (Dude Ventures App)
- **App ID:** 2718189178537750
- **Token expires:** ~2026-05-14
- **Permissions:** email, catalog_management, pages_show_list, ads_management, ads_read, business_management, pages_read_engagement, pages_manage_ads, public_profile, threads_business_basic
- **Missing permissions:** pages_manage_metadata, pages_manage_posts (needed for full API control of page)

### LLAI Page Access Token
- Available at runtime via `GET /me/accounts?access_token={USER_TOKEN}`
- Token for page 957593034113587 returned in the data array

---

## CRITICAL RULES

- **Phone:** (302) 416-6285 — NEVER Brandon's personal (302) 420-9576
- **Email:** info@learnandleverageai.com — NEVER mcrbrandon@gmail.com
- **Brandon should never receive direct messages or calls from this page**

---

## Post-Setup Checklist

- [x] Facebook Page created with correct info
- [x] Page added to Business Manager (CONFIRMED)
- [x] Phone set: +1 (302) 416-6285
- [x] Email set: info@learnandleverageai.com
- [x] Website set: https://learnandleverageai.com/
- [x] Meta Pixel created (1494764092013977)
- [x] Meta Pixel code installed in src/app/workshops/layout.tsx
- [x] Pixel shared with active ad accounts
- [x] Profile picture generated (public/images/llai-profile-pic.jpg)
- [x] Cover photo generated (public/images/llai-cover-photo.jpg)
- [ ] Profile picture uploaded to Facebook — BRANDON MANUAL (2 min)
- [ ] Cover photo uploaded to Facebook — BRANDON MANUAL (1 min)
- [ ] CTA button set to "Sign Up" → /workshops — BRANDON MANUAL (1 min)
- [ ] Instagram business account created — BRANDON MANUAL (3 min)
- [ ] Video ads uploaded to Ads Manager — BRANDON MANUAL (3 min)
- [ ] Ad campaign created ($15/day, NCC targeting) — BRANDON MANUAL (5 min)
- [ ] CREDENTIALS.md updated with IDs
