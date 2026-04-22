# Free Event Listing Sites — Newark/Wilmington, Delaware

**Event:** Free AI Workshop — Never Used AI? Start Here.
**Date:** Thursday, April 2, 2026, 6-8 PM
**Location:** Hilton Christiana, 100 Continental Dr, Newark, DE 19713
**Registration:** learnandleverageai.com/workshops
**Seats:** 10

---

## 1. MAJOR PLATFORMS (API/Programmatic Submission Possible)

### Eventbrite
- **Submit URL:** https://www.eventbrite.com/create
- **API:** https://www.eventbrite.com/platform/api — REST API with OAuth2. Create event via `POST /organizations/{id}/events/`, add free tickets via ticket class endpoint, then publish.
- **API Docs:** https://www.eventbrite.com/platform/docs/create-events
- **Cost:** FREE for free events (no fees at all)
- **Account Required:** Yes
- **Programmatic:** YES — Full API. Create event, add free ticket class (set `free: true`, `quantity_total: 10`), then publish. Get API key from Account Settings > Developer Links > API Keys.
- **Priority:** HIGH — major discovery platform, good SEO, feeds into Google Events.

### Meetup
- **Submit URL:** https://www.meetup.com/start/organizing/
- **API:** https://www.meetup.com/api/general/ — GraphQL API
- **Cost:** FREE with Meetup Starter plan (limited features, first-time organizers). Standard plan is $30/month.
- **Account Required:** Yes (organizer subscription for full features)
- **Programmatic:** YES — GraphQL API with mutations for event creation
- **Note:** Meetup Starter (free) may not support scheduling events or API access. Standard plan ($30/mo) required for full API. Consider if the audience justifies the cost.
- **Priority:** MEDIUM — good for tech/professional audience but has cost for organizers.

### Facebook Events
- **Submit URL:** https://www.facebook.com/events/create
- **API:** https://developers.facebook.com/docs/pages/official-events/ — Graph API for Page events
- **Cost:** FREE
- **Account Required:** Yes (Facebook account + Facebook Page)
- **Programmatic:** YES — Graph API `POST /{page-id}/events` with access token. Requires Facebook App + Page access token with `pages_manage_events` permission.
- **Priority:** HIGH — massive local reach, especially for Delaware community groups.

### LinkedIn Events
- **Submit URL:** https://www.linkedin.com/events/ (create from company page or personal profile)
- **API:** https://learn.microsoft.com/en-us/linkedin/marketing/event-management/events — Marketing API
- **Cost:** FREE to create events
- **Account Required:** Yes (LinkedIn account)
- **Programmatic:** YES — LinkedIn Marketing API for event creation. Requires LinkedIn App + OAuth2.
- **Priority:** HIGH — perfect for B2B/professional AI workshop audience.

### AllEvents.in
- **Submit URL:** https://allevents.in/pages/publish-events
- **API:** No public API documented
- **Cost:** FREE
- **Account Required:** Yes
- **Programmatic:** No (web form only)
- **Note:** Events get featured in weekly email newsletters to 4M+ event seekers. Good Google Events visibility.
- **Priority:** MEDIUM — free, good reach, auto-syncs with Google Events.

### Luma (lu.ma)
- **Submit URL:** https://luma.com/create
- **API:** https://docs.luma.com/reference/post_v1-event-create
- **Cost:** FREE to create events on web. API requires Luma Plus (paid subscription).
- **Account Required:** Yes
- **Programmatic:** Only with paid Luma Plus subscription
- **Priority:** LOW — better for tech/startup communities, API costs money.

### Nextdoor
- **Submit URL:** https://nextdoor.com/events/ (logged in, click "Add Event")
- **API:** No public API for events
- **Cost:** FREE
- **Account Required:** Yes (verified address in Newark/Wilmington area)
- **Programmatic:** No
- **Note:** Post to public event calendar. Do NOT announce it as a neighborhood post (commercial events get removed from feed, but stay on event calendar). Check "add to public calendar" box.
- **Priority:** HIGH — hyper-local reach to Newark/Christiana area residents.

---

## 2. LOCAL DELAWARE COMMUNITY CALENDARS

### Delaware Today Magazine
- **Submit URL:** https://delawaretoday.com/submit-calendar-event/ (redirects to https://calendar.delawaretoday.com — click "Add Event" top right)
- **Cost:** FREE (paid promotion available but optional)
- **Account Required:** Yes (create account on their calendar platform)
- **Programmatic:** No (web form)
- **Approval:** Digital editor reviews weekly. Most submissions approved.
- **Priority:** HIGH — premier Delaware lifestyle magazine, strong local readership.

### DelawareScene (Delaware Division of the Arts)
- **Submit URL:** https://delawarescene.com/orgs/addevent.php
- **Cost:** FREE
- **Account Required:** Optional (no account needed, but account gives priority processing + Conflict Checker)
- **Programmatic:** No (web form)
- **Approval:** Reviewed, posted within 5-7 business days
- **Note:** Organization must be registered with DelawareScene. Events must be in Delaware or within 25 miles of border. If you submit here, it AUTO-POPULATES to Visit Wilmington calendar too.
- **Priority:** HIGH — state-run, auto-syncs to Visit Wilmington.

### Visit Delaware (Delaware Tourism Office)
- **Submit URL:** https://www.visitdelaware.com/industry/submit-an-event/
- **Cost:** FREE
- **Account Required:** Form submission
- **Programmatic:** No (web form)
- **Note:** Event descriptions must be <120 words. Requires image (800x600px). Reviewed by Delaware Tourism Office.
- **Priority:** MEDIUM — tourism-focused, may be less relevant for professional workshop.

### Visit Wilmington & Brandywine Valley
- **Submit URL:** https://www.visitwilmingtonde.com/events/submit-an-event/
- **Cost:** FREE
- **Account Required:** Form submission
- **Programmatic:** No (web form)
- **Note:** If already submitted to DelawareScene, this is auto-populated — skip duplicate submission.
- **Priority:** MEDIUM — auto-populated from DelawareScene.

### Delaware ToDo
- **Submit URL:** http://delawaretodo.com/submit-an-event/
- **Cost:** FREE
- **Account Required:** No
- **Programmatic:** No (web form)
- **Approval:** Allow 48 hours for review/publishing
- **Note:** Focuses on Newark and greater Wilmington area — perfect geographic match.
- **Priority:** HIGH — local focus on Newark/Wilmington, no account needed.

### Delaware Business Times
- **Submit URL:** https://delawarebusinesstimes.com/submit/event/
- **Cost:** FREE (paid promotion available)
- **Account Required:** Yes (create account, click "Add Event" top right)
- **Programmatic:** No (web form)
- **Note:** Business-focused audience — ideal for AI workshop targeting business owners.
- **Priority:** HIGH — business audience is a perfect match.

### Delaware Division of Small Business
- **Submit URL:** https://business.delaware.gov/events-form/
- **Cost:** FREE
- **Account Required:** No (form submission)
- **Programmatic:** No (web form)
- **Note:** State government calendar for small business events. AI workshop for business owners fits perfectly.
- **Priority:** HIGH — government-backed, targets small business owners directly.

### In Wilmington (inwilmde.com)
- **Submit URL:** https://inwilmde.com/events/ (look for submit link on events page)
- **Cost:** FREE
- **Account Required:** Unknown — check site
- **Programmatic:** No
- **Priority:** LOW — entertainment-focused, less relevant for business workshop.

---

## 3. UNIVERSITY OF DELAWARE

### UD Events Calendar
- **Submit URL:** https://events.udel.edu/ (requires UD credentials to submit)
- **Account Required:** Yes — UD credentials (faculty/staff/student)
- **Programmatic:** No
- **Note:** Requires UD affiliation. Public can VIEW events but only UD-affiliated users can SUBMIT. Would need a UD contact to post on your behalf.
- **Priority:** LOW — requires UD credentials. Reach out to UD's Lerner College of Business or SBDC if they'd co-promote.

### UD Library / LibCal
- **Submit URL:** https://delawarelibraries.libcal.com/ (library-managed only)
- **Note:** Only library staff can post events. Not open for public submission.
- **Priority:** SKIP — not open for public submissions.

---

## 4. LOCAL NEWS STATION COMMUNITY CALENDARS

### WDEL (101.7 FM / 1150 AM)
- **Submit URL:** Email wdelnews@wdel.com with event details
- **Cost:** FREE (non-profit/community events)
- **Account Required:** No — email submission
- **Programmatic:** Email-based (could automate via email API)
- **Calendar Page:** https://www.wdel.com/wdel-community-calendar/
- **Priority:** HIGH — #1 local radio station in Wilmington/Newark area.

### 6ABC (WPVI Philadelphia — covers Delaware)
- **Submit URL:** https://6abc.com/community/submitevent/
- **Cost:** FREE
- **Account Required:** Unknown — uses Trumba calendar platform
- **Programmatic:** No (Trumba web form)
- **Note:** Covers entire Delaware Valley including northern Delaware.
- **Priority:** MEDIUM — broad Philadelphia market, includes Delaware viewers.

### NBC10 Philadelphia (covers Delaware)
- **Submit URL:** https://www.nbcphiladelphia.com/community/nbc10-community-calendar/ (check for submit form)
- **Cost:** FREE (likely)
- **Account Required:** Check site
- **Programmatic:** No
- **Priority:** MEDIUM — Philadelphia market covering Delaware.

### PHL17
- **Submit URL:** https://phl17.com/community-calendar/ (check for submit link)
- **Cost:** FREE (likely)
- **Account Required:** Check site
- **Programmatic:** No
- **Priority:** LOW — smaller station, still covers Delaware Valley.

### WHYY (Public Media)
- **Submit URL:** Contact talkback@whyy.org or call 215-351-0511 (Mon-Fri, 9am-3pm)
- **Events Page:** https://whyy.org/events/
- **Cost:** FREE (public media)
- **Account Required:** No — email/phone submission
- **Note:** WHYY primarily lists their own events. Community calendar submissions may not be accepted.
- **Priority:** LOW — primarily lists own events, not a community calendar.

---

## 5. PROFESSIONAL ASSOCIATIONS & BUSINESS ORGANIZATIONS

### New Castle County Chamber of Commerce
- **Calendar:** https://business.ncccc.com/events/calendar
- **Submit URL:** Contact chamber directly — members can submit events
- **Cost:** FREE for members (membership required — varies by business size)
- **Account Required:** Chamber membership
- **Note:** If not a member, consider joining ($250-500/yr range for small business). Over 100 years old, strong local business network.
- **Priority:** MEDIUM — requires membership, but excellent business audience.

### Delaware State Chamber of Commerce
- **Events:** https://www.dscc.com/annualevents.html
- **Submit URL:** Contact directly — primarily lists their own events
- **Priority:** LOW — primarily their own events, not a community calendar.

### SCORE Delaware
- **Website:** Part of the SBA network
- **Note:** SCORE hosts their own workshops. Could partner/co-promote rather than list on their calendar.
- **Priority:** LOW for listing, MEDIUM for partnership opportunity.

---

## 6. PATCH.COM (Delaware Communities)

### Patch — Newark, DE
- **Submit URL:** https://patch.com/delaware/newark-de/calendar (click "Post Your Event")
- **Cost:** FREE to post. Optional paid promotion ($2/community/day, up to 30 days)
- **Account Required:** Yes (free Patch account — sign up with email)
- **Programmatic:** No (web form)
- **Steps:** Log in > click name > Create > Event > fill details > Post
- **Image:** 1200x900px recommended
- **Priority:** HIGH — very local, free, easy to post.

### Patch — Wilmington, DE
- **Submit URL:** https://patch.com/delaware/wilmington-de/calendar (click "Post Your Event")
- **Same process as Newark above**
- **Priority:** HIGH

### Patch — Hockessin, DE
- **Submit URL:** https://patch.com/delaware/hockessin-de/calendar (click "Post Your Event")
- **Same process as Newark above**
- **Priority:** MEDIUM — nearby community, some overlap.

---

## 7. LOCAL NEWSPAPERS

### Newark Post
- **Submit URL:** https://www.newarkpostonline.com/local-events/ (submit event form) or email news@newarkpostonline.com
- **Cost:** FREE
- **Account Required:** Unknown — may need account on their calendar platform
- **Programmatic:** Email option (could automate)
- **Priority:** HIGH — THE local newspaper for Newark, DE since 1910.

---

## 8. CITY/COUNTY GOVERNMENT

### City of Newark, DE
- **Calendar:** https://newarkde.gov/calendar.aspx?CID=21
- **Submit URL:** Review Calendar Posting Policy at https://newarkde.gov/162/Community-Events
- **Contact:** Parks & Recreation at 302-366-7000
- **Cost:** FREE
- **Priority:** MEDIUM — government calendar, may have restrictions on commercial events.

### City of Wilmington, DE
- **Calendar:** https://www.wilmingtonde.gov/about-us/events-calendar
- **Note:** Primarily city government events. Less likely to accept commercial workshop listing.
- **Priority:** LOW

---

## 9. BONUS: GOOGLE EVENTS (via Schema Markup)

### Your Own Website (learnandleverageai.com/workshops)
- **How:** Add Event schema markup (JSON-LD) to your workshop page
- **Cost:** FREE
- **Programmatic:** YES — add structured data to your page HTML
- **Docs:** https://developers.google.com/search/docs/appearance/structured-data/event
- **Note:** This makes your event appear in Google Search and Google Maps event carousels. No submission needed — Google crawls it automatically.
- **Priority:** CRITICAL — this is the highest-impact free listing. Already on your own site.

---

## SUBMISSION PRIORITY ORDER (Recommended)

### Do First (Programmatic/API — can automate):
1. **Eventbrite** — Full API, create event + free tickets programmatically
2. **Facebook Events** — Graph API, create from your FB Page
3. **LinkedIn Events** — Marketing API, create from company page
4. **Google Events Schema** — Add JSON-LD to your workshop page (already your site)

### Do Second (Quick Web Forms — 5 min each):
5. **Patch Newark DE** — Free account, post event
6. **Patch Wilmington DE** — Same account, post to second community
7. **Patch Hockessin DE** — Same account, post to third community
8. **Delaware ToDo** — No account needed, quick form
9. **Delaware Division of Small Business** — No account needed, perfect audience
10. **6ABC Community Calendar** — Free form submission

### Do Third (Account Required — 10 min each):
11. **Delaware Today** — Create account, submit event
12. **Delaware Business Times** — Create account, submit event
13. **DelawareScene** — No account needed but registration recommended. Auto-syncs to Visit Wilmington.
14. **AllEvents.in** — Create account, publish event

### Do Fourth (Email/Contact):
15. **WDEL** — Email wdelnews@wdel.com
16. **Newark Post** — Email news@newarkpostonline.com or use web form
17. **Nextdoor** — Post to Newark/Christiana area event calendar
18. **Visit Delaware** — Submit form

### Optional/Lower Priority:
19. **NBC10 Community Calendar** — Check for submit form
20. **PHL17 Community Calendar** — Check for submit form
21. **WHYY** — Email, but may not accept
22. **NCC Chamber of Commerce** — Only if you're a member
23. **Luma** — Free web creation, no API without paid plan
24. **Meetup** — Only if willing to pay $30/mo for organizer plan

---

## EVENTBRITE API QUICK REFERENCE

```bash
# 1. Get your org ID
curl -X GET "https://www.eventbriteapi.com/v3/users/me/organizations/" \
  -H "Authorization: Bearer YOUR_TOKEN"

# 2. Create event (as draft)
curl -X POST "https://www.eventbriteapi.com/v3/organizations/ORG_ID/events/" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "event": {
      "name": {"html": "Free AI Workshop — Never Used AI? Start Here."},
      "description": {"html": "Join us for a free, hands-on AI workshop designed for business professionals who have never used AI tools. Learn practical AI applications you can implement immediately. Only 10 seats available."},
      "start": {"timezone": "America/New_York", "utc": "2026-04-02T22:00:00Z"},
      "end": {"timezone": "America/New_York", "utc": "2026-04-03T00:00:00Z"},
      "currency": "USD",
      "online_event": false,
      "venue_id": "VENUE_ID",
      "listed": true,
      "shareable": true,
      "capacity": 10
    }
  }'

# 3. Add free tickets
curl -X POST "https://www.eventbriteapi.com/v3/events/EVENT_ID/ticket_classes/" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "ticket_class": {
      "name": "Free Admission",
      "free": true,
      "quantity_total": 10
    }
  }'

# 4. Publish event
curl -X POST "https://www.eventbriteapi.com/v3/events/EVENT_ID/publish/" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

*Last updated: 2026-03-27*
