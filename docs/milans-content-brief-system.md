# Milan's Content Brief System — Automated Weekly Briefs

**Created:** 2026-04-08
**Status:** DESIGN COMPLETE — ready for cron job creation
**Client:** Milan's Real Philly Cheesesteaks (@milansrealphillycheesesteaks)
**Recipient:** Brianna Cunningham (membership@debcc.org)
**Delivered via:** AgentMail (brandon@learnandleverageai.com)

---

## Background

### The Business
- **Name:** Milan's Real Philly Cheesesteaks & Hoagies
- **Location:** 813 Governors Place, Bear, Delaware 19701 (Governor's Square Shopping Center)
- **Founded:** 2023 by Milan Reid (with Christian Reid)
- **Website:** milansrealphilly.com
- **Instagram:** @milansrealphillycheesesteaks — 5,617 followers, 332 posts
- **Hours:** Mon-Thu 10am-9pm, Fri-Sat 10am-10pm, Sun 10am-7pm
- **Type:** Brick-and-mortar restaurant (not food truck)
- **Menu:** Philly cheesesteaks, hoagies, sandwiches
- **Content style:** ~89% video (reels), food prep shots, behind-the-scenes

### Why We're Doing This
Brandon committed to building this at the April 2 workshop as a demo/pilot for Brianna. Her client (Milan's) is growing fast on social but needs help knowing WHAT to film each week. This is the ContentBrief product proof-of-concept — if it works for Milan's, it validates the product for all of Brianna's DEBCC clients.

### What Brianna Needs
- Weekly content plan delivered every Monday morning
- 7 filming briefs (1 per day) with exact instructions
- Clear enough that a non-technical person can pick up their phone and film
- Mix of formats: reels, carousels, stories
- Trending hooks, seasonal relevance, local angles
- Hashtag strategy included
- No jargon, no complexity

---

## System Architecture

### Two Cron Jobs, Chained

```
Sunday 10:00 PM ET          Monday 6:00 AM ET
┌─────────────────┐         ┌──────────────────────┐
│ milan-content-   │         │ milan-content-briefs  │
│ research         │────────>│                       │
│                  │         │ Reads research file   │
│ Trends, comps,   │         │ Generates 7 briefs   │
│ IG analysis,     │         │ Emails to Brianna    │
│ local events     │         │ via AgentMail        │
└─────────────────┘         └──────────────────────┘
```

### File Locations
- Research output: `~/.openclaw/workspaces/marlo/content/milan-research-YYYY-MM-DD.md`
- Brief output: `~/.openclaw/workspaces/marlo/content/milan-briefs-YYYY-MM-DD.md`
- Delivery log: `~/.openclaw/workspaces/marlo/memory/milan-delivery-log.md`

---

## Cron Job 1: `milan-content-research`

**Schedule:** Every Sunday at 10:00 PM ET
**Agent:** marlo
**Timeout:** 2700 seconds (45 min)
**Model:** openai-codex/gpt-5.4

### What It Does

1. **Analyze Milan's Current IG Content**
   - Use Perplexity to search for recent @milansrealphillycheesesteaks posts and engagement
   - Identify: what types of posts are they currently doing? What got the most engagement recently?
   - Note any content gaps (e.g., no behind-the-scenes, no customer testimonials, no trending audio)

2. **Research Food Content Trends**
   - Search Perplexity for: "trending food content TikTok Instagram reels this week 2026"
   - Search for: "viral cheesesteak content" and "restaurant video ideas trending"
   - Search for: "trending audio sounds Instagram reels food" 
   - Identify 5-7 trending content formats/hooks that could work for a cheesesteak restaurant

3. **Local Market Research**
   - Search for: "Delaware food events this week" and "Bear Delaware events"
   - Search for: "Philadelphia food scene news this week"
   - Check if there are seasonal hooks (holidays, weather, sports events, food holidays like National Cheesesteak Day)
   - Look for local food blogger/influencer activity in the Delaware area

4. **Competitor Content Analysis**
   - Search for: "best cheesesteak restaurants Instagram content" 
   - Look at what similar food businesses are doing that's working
   - Identify content angles Milan's competitors are NOT doing (white space)

5. **Hashtag Research**
   - Compile optimal hashtag sets for different post types:
     - Local: #beardelaware #delawarefoodie #delawareeats #wilmingtonde #shoplocal
     - Category: #phillycheesesteak #cheesesteak #phillyfood #foodie #streetfood
     - Trending: whatever food hashtags are trending this week
     - Branded: #milansrealphilly

6. **Save Research Brief**
   - Save to: `~/.openclaw/workspaces/marlo/content/milan-research-YYYY-MM-DD.md`

---

## Cron Job 2: `milan-content-briefs`

**Schedule:** Every Monday at 6:00 AM ET
**Agent:** marlo
**Timeout:** 2700 seconds (45 min)
**Model:** openai-codex/gpt-5.4

### What It Does

1. **Read Research** from Sunday night's output file

2. **Generate 7 Daily Filming Briefs** (Monday through Sunday), each containing:

#### Brief Format (per day):

```markdown
## [Day] — [Post Title]

**Platform:** Instagram Reels / Carousel / Story / Static Post
**Estimated filming time:** X minutes
**Best posting time:** [time] ET

### The Hook (first 3 seconds)
[Exact opening — what the viewer sees/hears first. This is the scroll-stopper.]

### The Script
[Word-for-word script or narration. Keep under 30 seconds for reels.
Include natural pauses, emphasis marks, and tone notes.]

### Shot List
1. [Shot 1: wide/close, what's in frame, duration]
2. [Shot 2: ...]
3. [Shot 3: ...]
(Usually 3-5 shots per reel)

### What You Need
- [Props, ingredients, setup needed]
- [Lighting notes if relevant]
- [Any special prep]

### Caption
[Ready-to-paste caption with line breaks and emojis]

### Hashtags
[15-20 hashtags, mix of local + category + trending]

### Trending Audio (if applicable)
[Specific sound name to search for on Instagram, or "use original audio"]

### Why This Works
[1-2 sentences explaining why this content will perform — ties to trend or proven format]
```

3. **Weekly Mix Requirements** (ensure variety across the 7 briefs):
   - At least 4 reels (video is 89% of their current content — lean into it)
   - At least 1 carousel (educational: "how we make our cheesesteaks" or menu spotlight)
   - At least 1 behind-the-scenes (kitchen, prep, team)
   - At least 1 customer-focused (reaction, testimonial, or UGC prompt)
   - At least 1 trend-based (riding a trending audio or format)
   - At least 1 local angle (Delaware events, community, local partnerships)
   - Vary posting times across the week

4. **Content Angle Rotation** (cycle through these each week):
   - **Food prep ASMR** — sizzling meat, cheese melting, sandwich assembly
   - **Behind the scenes** — opening routine, kitchen walkthrough, ingredient sourcing
   - **Customer reactions** — first bite reactions, "you have to try this" moments
   - **Menu spotlight** — feature a specific item, explain what makes it special
   - **Trending format adaptation** — take whatever's trending and apply it to cheesesteaks
   - **Local community** — shoutout other Bear businesses, local events, team spotlights
   - **Educational** — "how to order like a Philly native", "what makes a real cheesesteak"

5. **Email the Brief to Brianna** via AgentMail:
   - From: brandon@learnandleverageai.com
   - To: membership@debcc.org
   - Subject: "Milan's Content Plan — Week of [date]"
   - Body: Clean, formatted brief with all 7 days
   - Thread: Use existing thread with Brianna if possible, otherwise new thread
   - Tone: Professional but warm, from Brandon's voice

6. **Log Delivery** — Append to `~/.openclaw/workspaces/marlo/memory/milan-delivery-log.md`

---

## AgentMail Delivery Details

**API Key:** `am_us_ad05c54530f6cbc35871c0c053fbab881e068974b1d9a1a4b7043a3aa357d95b`
**Inbox:** `brandon@learnandleverageai.com`
**Endpoint:** `POST https://api.agentmail.to/v0/inboxes/brandon@learnandleverageai.com/messages/send`

**Headers:**
```
Authorization: Bearer am_us_ad05c54530f6cbc35871c0c053fbab881e068974b1d9a1a4b7043a3aa357d95b
Content-Type: application/json
```

**Email format:**
```json
{
  "to": [{"email": "membership@debcc.org", "name": "Brianna Cunningham"}],
  "subject": "Milan's Content Plan — Week of April 14",
  "body_text": "[plain text version of the brief]",
  "body_html": "[nicely formatted HTML version]"
}
```

**Email tone rules:**
- Opens with: "Hey Brianna," (not "Dear" or "Hi there")
- Brief intro: "Here's this week's content plan for Milan's. 7 days of filming briefs ready to go."
- The briefs themselves in the body
- Closes with: "Let me know if any of these need tweaking. — Brandon"
- NO sales language, NO upsell, NO pitch. This is a deliverable, not marketing.

---

## Quality Gates

### Research Quality
- Must find at least 3 trending content hooks per week
- Must include at least 1 local/seasonal angle
- Must check competitor content (not just generic trends)

### Brief Quality  
- Every brief must have a specific hook (not generic "show your food")
- Scripts must be under 30 seconds when read aloud
- Shot lists must be specific (not "film the food")
- Hashtags must include local tags (not just #food #yummy)
- At least 4 of 7 briefs should reference a specific trend or timely hook

### Delivery Quality
- Email must arrive before 8:00 AM ET Monday
- Must be readable on mobile (Brianna uses Outlook on phone)
- Plain text fallback must be included
- If email fails, log the error and retry once

---

## Success Metrics (track in delivery log)

- Emails delivered: count per week
- Brianna opens/replies: track if she responds
- Content actually filmed: ask Brianna monthly
- Follower growth: check @milansrealphillycheesesteaks monthly
- Engagement rate: baseline now at ~2.5-4% (typical for food micro-accounts)

---

## What This Proves

If this system works:
1. Brianna sees value → she becomes a paying ContentBrief customer
2. Brianna shares with other DEBCC members → pipeline for ContentBrief
3. Milan's grows on social → case study for LLAI workshops
4. The automated research + brief pipeline is validated → productize it

This is the proof-of-concept for the entire ContentBrief SaaS product.
