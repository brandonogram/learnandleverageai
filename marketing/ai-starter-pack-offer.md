# AI Starter Pack — Webinar-Only Offer

> **Price: $497 (one-time) | Webinar-only — not available on the website**
> **Availability: 48 hours after live webinar only**

---

## 1. Full Offer Description & Value Stack

### What's in the AI Starter Pack

✅ **AI Phone Receptionist Setup** — We build and configure your 24/7 AI receptionist. Custom greeting, your services, your calendar. Done for you. *(This alone is a $750 setup if you came to us outside the webinar.)*

✅ **1 Month of ContentCreationDude Pro** — A full month of social media posts tailored to your trade. Approve and post. ($49/mo value)

✅ **30-Minute Strategy Call with Brandon** — We map out where AI saves you the most time and money. Your custom 90-day plan.

✅ **Bonus: "10 Things AI Can Do for Your Business This Week"** — A hands-on playbook you can use the same day. On the house.

**You pay: $497 (one-time).** The phone receptionist setup alone normally runs $750. You're getting everything else on top of it.

### Internal Value Reference (NOT for customer-facing materials)

| Component | Internal Value |
|---|---|
| AI Phone Receptionist Setup | $750 (real service price) |
| ContentCreationDude Pro (1 month) | $49 (real subscription price) |
| Strategy Call with Brandon | $250 (realistic for early-stage) |
| "10 Things AI Can Do" PDF | Free bonus (no dollar value assigned) |

### Why This Exists

This offer is exclusively for webinar attendees. The goal: get them a quick win (phone receptionist + content), build trust on the strategy call, then grow from there. It is **not** to be listed on the website or offered outside the webinar funnel.

### ROI Framing (use in copy & script)

> "If your AI receptionist catches just **2 calls per week** you would have missed — at a 30% close rate and a $500 average job — that's **$15,600/year in recovered revenue**. You're paying $497 once. The math isn't close."

---

## 2. Stripe Checkout Page Requirements

### Page: `/checkout/ai-starter-pack`

**Product in Stripe:**
- **Name:** AI Starter Pack — Webinar Special
- **Price:** $497.00 USD (one-time)
- **Product ID:** Create as a one-time product in Stripe (not subscription)
- **Tax:** Auto-calculate via Stripe Tax, or exclude and note "tax not included"

**Checkout Fields (collect at payment):**
- Full Name
- Email Address
- Phone Number
- Business Name
- Business Type / Trade (dropdown: Plumbing, HVAC, Electrical, Landscaping, Roofing, General Contractor, Pool Service, Cleaning, Other)

**Page Elements:**
- Countdown timer showing hours remaining (synced to 48hr window)
- What's included summary (list all 4 components, anchor on $750 phone setup value)
- "What happens next" section:
  1. ✅ Instant confirmation email with PDF playbook
  2. 📞 Within 24 hours: we email you to schedule your strategy call
  3. 🤖 Within 5 business days: your AI receptionist is live
  4. 📱 ContentCreationDude Pro access activated within 24 hours
- Trust signals: "30-day money-back guarantee if your AI receptionist isn't live within 5 business days"
- Testimonial placeholder (add after first customers)
- Brandon's headshot + short bio

**Post-Purchase Automation:**
1. Stripe webhook → send confirmation email (include PDF attachment)
2. Create contact in CRM (GoHighLevel or equivalent)
3. Trigger onboarding sequence:
   - Email 1 (immediate): Confirmation + PDF + "what's next"
   - Email 2 (24hrs): Strategy call scheduling link (Calendly/Cal.com)
   - Email 3 (48hrs): ContentCreationDude Pro login credentials
   - Email 4 (5 days): "Your AI receptionist is live — here's how to test it"

**Expiration Logic:**
- URL should include a unique token or use Stripe coupon with `redeem_by` timestamp
- After 48hrs: redirect to a "This offer has expired" page with option to book a strategy call at full price ($500) or join the waitlist for the next webinar
- **Simplest approach:** Create a Stripe Payment Link, set it live manually after the webinar, disable it 48 hours later. No custom code needed for v1.

**Guarantee:**
- 30-day money-back guarantee: "If we don't deliver your AI receptionist within 5 business days, full refund, no questions."

---

## 3. 48-Hour Expiring Offer Email (Day After Webinar)

**Send time:** Day after webinar, 10:00 AM EST
**Subject lines (A/B test):**
- A: `The replay is live — plus your $497 AI Starter Pack (48 hrs only)`
- B: `You're still missing calls. Let's fix that for $497.`

---

**Email Body:**

Subject: The replay is live — plus your $497 AI Starter Pack (48 hrs only)

Hey {{first_name}},

Thanks for joining yesterday's webinar — **"AI for Contractors: Stop Losing Money to Missed Calls & Manual Work."**

If you missed any part (or want to rewatch the live demos), **here's the replay:**

👉 **[Watch the Full Replay]({{replay_link}})**

---

Now here's the part I promised — the **AI Starter Pack**, available for the next **48 hours only.**

During the webinar, you saw what happens when a contractor has AI answering their phone 24/7. You saw a full week of social media posts generated in 60 seconds.

Here's your chance to get both — set up and done for you — at a price I won't offer again until the next live event.

### The AI Starter Pack — $497

✅ **AI Phone Receptionist** — fully set up for your business. Answers calls, books appointments, never sleeps. *(This setup alone is $750 outside the webinar.)*

✅ **1 Month of ContentCreationDude Pro** — AI-generated social posts for your trade. Just approve and publish.

✅ **30-Min Strategy Call with Me** — I'll map out your personalized AI roadmap. What to automate first, which tools to use, your 90-day plan.

✅ **Bonus: "10 Things AI Can Do for Your Business This Week"** — the hands-on playbook. Not theory — stuff you can implement today.

**You pay $497 once. The phone receptionist setup alone normally runs $750 — you're getting everything else on top.**

👉 **[Get the AI Starter Pack — $497]({{checkout_link}})**

---

**What happens after you buy:**
1. You'll get the PDF playbook immediately
2. Within 24 hours, I'll send a link to book your strategy call
3. Within 5 business days, your AI receptionist is live and answering calls
4. Your ContentCreationDude Pro access is activated within 24 hours

**My guarantee:** If your AI phone receptionist isn't live within 5 business days, you get a full refund. No questions asked.

---

⏰ **This offer expires {{expiry_date}} at {{expiry_time}} EST.** After that, the phone receptionist setup alone is $750.

If you have questions, just reply to this email. I read every one.

Talk soon,
**Brandon**
Learn & Leverage AI

P.S. — Remember the ROI math from the webinar: if your AI receptionist saves just 2 missed calls per week, that's potentially **$15,600/year** in recovered revenue. You're paying $497 once. If it saves you even one missed job per week, it pays for itself before the month is over.

👉 **[Get the AI Starter Pack — $497]({{checkout_link}})**

---

## 4. FAQ — Common Objections

**"$497 seems like a lot for something I don't fully understand yet."**
That's exactly why the strategy call is included. Before we build anything, you and Brandon will map out exactly what AI can do for YOUR business. And with our 5-day delivery guarantee (full refund if we don't deliver), the risk is zero. The real cost is the calls you're missing every week while you think about it.

**"Can't I just set up ChatGPT myself?"**
For some things, absolutely — and we'll show you how in the playbook. But the AI Phone Receptionist isn't ChatGPT — it's a fully integrated system connected to your calendar, your business hours, and your greeting. That's what takes expertise to set up. You stay focused on running jobs. We handle the tech.

**"I need to think about it."**
Totally fair. Just know this price ($497) is only available for 48 hours after the webinar. After that, the phone receptionist setup alone is $750, and the strategy call is $500. We limit how many of these we take on each month so we can deliver quality. If you're on the fence, grab it now — if it's not for you after the strategy call, just let us know.

**"Can you do it cheaper?"**
The phone receptionist setup alone is $750 if you came to us directly. You're getting that plus a month of content, a strategy call, and a playbook for $497. We're offering it at this price because we want to build case studies from webinar attendees and prove the ROI. If budget is tight, reply to this email and we can talk about a payment plan (2x $249).

**"What if I don't like it / it doesn't work?"**
If your AI receptionist isn't live and working within 5 business days, full refund. If after 30 days you're not happy with the results, email us and we'll make it right. We're betting on the fact that once you see it working, you'll want more.

**"I'm not tech-savvy. Will I be able to use this?"**
That's the whole point — we set it up FOR you. The phone receptionist works automatically. ContentCreationDude gives you posts to approve with one click. The strategy call is a conversation, not a tech tutorial. If you can answer a phone and scroll Facebook, you can use everything in this pack.

**"What are the ongoing costs after the first month?"**
Transparency is our thing. After the included month:
- AI Phone Receptionist: ~$50–$150/mo for the voice AI platform (depends on call volume)
- ContentCreationDude Pro: $49/mo (cancel anytime)
- No ongoing fees to us unless you want continued support (optional retainer starts at $150/mo)
We'll go over all of this on your strategy call so there are no surprises.

**"My buddy's kid can probably set this up."**
Maybe! But when your AI phone system goes down at 9 PM on a Friday and you're missing emergency calls, you want someone who understands both the tech AND how a service business actually runs. That's what you're paying for — reliability, expertise, and someone who picks up the phone when things break.

**"Is this just for contractors?"**
It works best for home service and trade businesses — plumbers, HVAC, electricians, roofers, landscapers, pool companies, cleaning services, general contractors. If you serve local customers and your phone rings, this is for you.

---

*Last updated: 2026-02-14 | Owner: Cash (Revenue)*
