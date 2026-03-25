# Facebook Page Optimization — Learn and Leverage AI

**Date:** 2026-03-22
**Page:** [Learn and Leverage AI](https://www.facebook.com/people/Learn-and-Leverage-AI/61579240241708/)
**Page ID:** 957593034113587

---

## Status Summary

| Step | Task | Status | Notes |
|------|------|--------|-------|
| 1 | Generate profile picture | DONE | AI-generated via fal.ai FLUX Schnell |
| 2 | Generate cover photo | DONE | AI-generated via fal.ai FLUX Schnell |
| 3 | Upload profile picture to FB | BLOCKED | Token missing `pages_manage_metadata` |
| 4 | Upload cover photo to FB | BLOCKED | Token missing `pages_manage_metadata` |
| 5 | Set CTA button | BLOCKED | Token missing `pages_manage_metadata` |
| 6 | Post workshop announcement video | BLOCKED | Token missing `pages_manage_posts` |
| 7 | Verify | PENDING | Depends on steps 3-6 |

---

## Step 1: Profile Picture (DONE)

- **Prompt:** "Minimalist professional logo icon for AI training company. Dark navy blue background, clean modern design, subtle glowing neural network or brain circuit pattern in cyan/light blue. Square format, no text, corporate and trustworthy feel."
- **Model:** fal-ai/flux/schnell (512x512, square)
- **Saved to:** `/Users/brandonbot/projects/workbench/learnandleverageai/public/images/llai-profile-pic-v2.jpg`
- **Public URL:** https://files.catbox.moe/kvp9bb.jpg
- **Result:** Clean cyan AI circuit/neural network logo on dark navy background. Professional and on-brand.

## Step 2: Cover Photo (DONE)

- **Prompt:** "Professional corporate AI training workshop in a modern conference room. Diverse group of business professionals aged 45-60 seated at tables with laptops, instructor presenting at front with screen showing AI concepts. Warm professional lighting, business casual attire, engaged expressions. Wide panoramic shot, 16:9 aspect ratio."
- **Model:** fal-ai/flux/schnell (1024x576, landscape_16_9)
- **Saved to:** `/Users/brandonbot/projects/workbench/learnandleverageai/public/images/llai-cover-photo-v2.jpg`
- **Public URL:** https://files.catbox.moe/85242s.jpg
- **Result:** Professional workshop scene with diverse attendees, instructor presenting AI concepts. Warm, corporate feel.

---

## BLOCKER: Meta Access Token Missing Permissions

### Current Token Permissions
The token (from "Dude Ventures App", app ID: 2718189178537750) has:
- `email`
- `catalog_management`
- `threads_business_basic`
- `pages_show_list`
- `ads_management`
- `ads_read`
- `business_management`
- `pages_read_engagement`
- `pages_manage_ads`
- `public_profile`

### Missing Permissions Required
| Permission | Needed For |
|-----------|-----------|
| `pages_manage_posts` | Posting content (photos, videos, text) to the page |
| `pages_manage_metadata` | Setting profile picture, cover photo, CTA button |
| `pages_manage_engagement` | Responding to comments (nice to have) |

### How to Fix (Brandon Action Required)

1. Go to **Meta Developer Dashboard**: https://developers.facebook.com/apps/2718189178537750/
2. Navigate to **App Review > Permissions and Features**
3. Request/enable these permissions:
   - `pages_manage_posts`
   - `pages_manage_metadata`
   - `pages_manage_engagement` (optional but recommended)
4. If the app is in **Development Mode**, these permissions work immediately for admin users without app review
5. After enabling, go to **Graph API Explorer**: https://developers.facebook.com/tools/explorer/
6. Select the "Dude Ventures App"
7. Click **Generate Access Token** with ALL needed permissions checked:
   - All existing permissions (pages_show_list, pages_read_engagement, pages_manage_ads, ads_management, ads_read, business_management)
   - NEW: pages_manage_posts, pages_manage_metadata, pages_manage_engagement
8. Convert to a **long-lived token** (the current one is already non-expiring, expires_at: 0)
9. Share the new token with Claude Code

### Alternative: Use Meta Business Suite UI
If the API permission route is complex, all of these tasks can be done manually in ~5 minutes:
1. Go to https://business.facebook.com/ > Learn and Leverage AI page
2. **Profile pic:** Settings > Page Settings > Profile Picture > Upload `llai-profile-pic-v2.jpg`
3. **Cover photo:** Click the cover photo area > Upload `llai-cover-photo-v2.jpg`
4. **CTA button:** Click "Add Button" below cover > "Sign Up" > URL: `https://learnandleverageai.com/workshops`
5. **Post video:** Create Post > Upload `fb-workshop-ad-short.mp4` with the caption below

---

## Prepared Content (Ready to Post When Unblocked)

### Workshop Announcement Video Post
**Video:** `/Users/brandonbot/projects/workbench/learnandleverageai/videos/ads/fb-workshop-ad-short.mp4` (11MB)

**Caption:**
```
We're hosting a FREE hands-on AI workshop in Wilmington, DE. No tech experience needed -- you'll walk out using AI tools at your job. Thursday, April 2, 6-8 PM. Register at learnandleverageai.com/workshops
```

### CTA Button Configuration
- **Type:** SIGN_UP
- **URL:** https://learnandleverageai.com/workshops

---

## Commands Ready to Execute (Once Token is Updated)

### Upload Profile Picture
```bash
PAGE_TOKEN="NEW_TOKEN_HERE"
curl -X POST "https://graph.facebook.com/v21.0/957593034113587/picture" \
  -F "source=@/Users/brandonbot/projects/workbench/learnandleverageai/public/images/llai-profile-pic-v2.jpg" \
  -F "access_token=$PAGE_TOKEN"
```

### Upload Cover Photo
```bash
curl -X POST "https://graph.facebook.com/v21.0/957593034113587" \
  -F "cover_source=@/Users/brandonbot/projects/workbench/learnandleverageai/public/images/llai-cover-photo-v2.jpg" \
  -F "access_token=$PAGE_TOKEN"
```

### Set CTA Button
```bash
curl -X POST "https://graph.facebook.com/v21.0/957593034113587" \
  -d 'call_to_action={"type":"SIGN_UP","value":{"link":"https://learnandleverageai.com/workshops"}}' \
  -d "access_token=$PAGE_TOKEN"
```

### Post Workshop Video
```bash
curl -X POST "https://graph.facebook.com/v21.0/957593034113587/videos" \
  -F "source=@/Users/brandonbot/projects/workbench/learnandleverageai/videos/ads/fb-workshop-ad-short.mp4" \
  -F "description=We're hosting a FREE hands-on AI workshop in Wilmington, DE. No tech experience needed -- you'll walk out using AI tools at your job. Thursday, April 2, 6-8 PM. Register at learnandleverageai.com/workshops" \
  -F "access_token=$PAGE_TOKEN"
```

---

## Files Created

| File | Description |
|------|-------------|
| `public/images/llai-profile-pic-v2.jpg` | New profile picture (512x512, 20KB) |
| `public/images/llai-cover-photo-v2.jpg` | New cover photo (1024x576, 209KB) |
| `docs/fb-page-optimization.md` | This document |
