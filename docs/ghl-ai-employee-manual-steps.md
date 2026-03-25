# GHL AI Employee — Brandon Manual Setup Steps

**Created:** 2026-03-23
**Why manual:** GHL blocks automated browser login (Tandem fails, Playwright hits 2FA to brandon@boothlaunchpad.com which has no MX records)

## What Claude Code Already Did (via API)

1. **Voice AI Agent created** — ID: `69c08755d5cbc88fcd870d8c`
   - Name: "Learn & Leverage AI Assistant"
   - Greeting: "Hi, thanks for calling Learn and Leverage AI. How can I help you today?"
   - Full workshop knowledge base (April 2, free, 6-8 PM, Wilmington DE, all paid services with pricing)
   - Timezone: America/New_York
   - Max call duration: 10 minutes

2. **Custom fields created** (7 total):
   - Company (TEXT)
   - Job Title (TEXT)
   - Workshop Date (TEXT)
   - Purchased (TEXT)
   - AI Skill Score Before (NUMERICAL)
   - AI Skill Score After (NUMERICAL)
   - Biggest AI Challenge (DROPDOWN: 7 options)

## What Brandon Must Do (15-20 min total)

### Step 1: Fix the 2FA Email Problem (5 min)
The GHL 2FA sends to brandon@boothlaunchpad.com, but that domain has NO MX records — emails never arrive.

**Option A (recommended):** Change GHL login email to one that works (brandontcalloway@gmail.com or mcrbrandon@gmail.com)
**Option B:** Add MX records to boothlaunchpad.com in Siteground
**Option C:** Use "Send code to phone" option during 2FA (sends to +1*******576)

### Step 2: Enable AI Employee Add-on (2 min)
1. Log into https://app.gohighlevel.com
2. Select "BoothLaunchPad.com" account
3. Switch to **LearnAndLeverageAI** sub-account
4. Go to **Settings** > **AI Employee** (or **Settings** > **Labs**)
5. Enable the AI Employee add-on ($97/mo)

### Step 3: Import Twilio Phone Number (3 min)
1. In the LLAI sub-account, go to **Settings** > **Phone Numbers**
2. Click **Add Phone Number** or **Import**
3. The Twilio integration is already connected at the agency level
4. Find and import **+1 (302) 416-6285**
5. Assign it to the LLAI sub-account

### Step 4: Assign Phone to Voice AI Agent (2 min)
1. Go to **Settings** > **AI Employee** > **Voice AI**
2. Find "Learn & Leverage AI Assistant" (already created)
3. Under **Inbound Number**, select **+1 (302) 416-6285**
4. Save

### Step 5: Set Up Conversation AI for SMS (5 min)
1. Go to **Settings** > **AI Employee** > **Conversation AI**
2. Create a new bot or use the default
3. Set channel: **SMS**
4. Copy the knowledge base below into the bot's prompt/knowledge
5. Enable the bot
6. Assign to phone number +1 (302) 416-6285

### Knowledge Base to Copy-Paste

```
You are the Learn & Leverage AI Assistant for Learn and Leverage AI, run by Brandon Calloway in Wilmington, Delaware.

WORKSHOP DETAILS:
- Event: "AI Hands-On: See What AI Can Actually Do For Your Job"
- Date: Thursday, April 2, 2026
- Time: 6:00 PM to 8:00 PM Eastern
- Location: Wilmington, Delaware area
- Price: FREE
- Format: 2-hour in-person, hands-on workshop
- No AI experience needed
- Capacity: Limited to 25-30 people
- What you'll learn: ChatGPT, Claude, and other AI tools for your job. Hands-on practice. Prompting techniques.
- Register at: learnandleverageai.com/workshops
- 30-minute stay-after for 1-on-1 conversations with Brandon

PAID SERVICES:
- Full AI Workshop ($297): 4-hour deep dive
- AI Starter Pack ($497): Take-home resources + 1-on-1 call
- Advanced 2-Day Intensive ($997): Capped at 10
- Corporate Team Training ($5,000-$10,000/day)
- AI Consulting ($4,997+): Done-for-you implementation

CONTACT:
- Email: info@learnandleverageai.com
- Phone: (302) 416-6285
- Website: learnandleverageai.com
```

### Step 6: Create Registration Form (5 min)
1. Go to **Sites** > **Forms** > **Create Form**
2. Add these 7 fields:
   - Full Name (required)
   - Email (required)
   - Phone (required)
   - Company
   - Job Title
   - AI Skill Level 1-10 (use "AI Skill Score (Before)" custom field)
   - Biggest AI Challenge (dropdown — already configured with 7 options)
3. Set form action: Add to pipeline "Workshop Attendee Journey"
4. Save and get the embed code

## After Setup

Once Brandon completes these steps, Claude Code can:
- Verify the Voice AI agent is receiving calls
- Set up workflows triggered by form submissions
- Configure automated follow-up sequences
- Test the Conversation AI SMS bot

## Playwright Script for Future Login

A ready-to-use script exists at `/tmp/ghl-step1-login.js`. Once you can receive the 2FA code, run:

```bash
node /tmp/ghl-step1-login.js
# When it says "2FA_CODE_NEEDED", type the 6-digit code from email/phone
```

This saves auth state to `/tmp/ghl-auth-state.json` for reuse.
