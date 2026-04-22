# AI Agent Process Flow
## Based on: "Building AI Agents that actually work" — Greg Isenberg x Remy Gaskell

---

## The Big Picture

**Stage 1 (Chat):** You ask a question, AI answers. Ping pong.
**Stage 2 (Agents):** You set a goal, AI works until it's done. Golf.

Most people are stuck in Stage 1. This process flow gets you to Stage 2.

---

## The Agent Loop (Core Concept)

Every AI agent — regardless of platform — runs the same 3-step loop:

```
    +------------------+
    |                  |
    v                  |
 OBSERVE               |
 (check context,       |
  files, results)      |
    |                  |
    v                  |
  THINK                |
 (decide next          |
  action)              |
    |                  |
    v                  |
   ACT                 |
 (execute: research,   |
  write, call tool)    |
    |                  |
    +--- Task done? ---+
         |
         | YES
         v
      DELIVER
      RESULT
```

The loop repeats until the agent determines the task is complete. No babysitting required.

---

## Four Components of Every Agent

| Component | What It Is | Example |
|-----------|-----------|---------|
| **LLM** (Brain) | The language model doing the thinking | Claude Opus, GPT, Gemini |
| **Loop** | The observe-think-act cycle that keeps running | Built into the harness |
| **Tools** | External services the agent can use | Gmail, Stripe, Calendar, Notion |
| **Context** | All the information the agent has access to | Your business details, preferences, history |

**Agent Harness** = any platform that facilitates this loop (Claude Code, Cowork, Codex, etc.). They're all just different cars — once you learn to drive, you can use any of them.

---

## 7-Step Setup Process

### Step 1: Create Your Folder Structure

```
executive-assistant/
  claude.md          <-- context file (system prompt)
  memory.md          <-- persistent learning
  .claude/skills/    <-- reusable process files
  context/           <-- supporting context files
    brand-voice.md
    ideal-customer.md
    business-overview.md
```

Each "department" of your business gets its own folder with its own context, memory, and skills.

**Full business structure:**
```
workspaces/your-business/
  executive-assistant/
  content-team/
  head-of-marketing/
  sales/
  operations/
```

---

### Step 2: Create Your Context File (claude.md)

This is the most important file. It tells the agent WHO it is and HOW to work.

**What to include:**
- Role definition ("You are my executive assistant...")
- Business context (what you do, who you serve)
- Client/customer information
- Working preferences (communication style, priorities)
- Tools you use and how you use them
- Decision-making guidelines

**Key insight:** The era of "prompt engineering" is over. It's now about **context engineering** — loading your agent with rich business context so that simple 2-word prompts produce excellent results.

**Best practices:**
- Keep under ~200 lines
- For extensive context, create a `/context/` subfolder with separate files and reference them from the main file
- You can ask the AI to build this file through an interview-style Q&A: "Interview me to build a context file for an executive assistant agent"

---

### Step 3: Set Up Memory (memory.md)

Create a `memory.md` file and add these instructions to your `claude.md`:

> "Read memory.md at the start of every session. When I correct you or you learn something new, update the relevant section in memory.md. Keep it current. When something changes, update it in place and replace outdated info. Only save substantial corrections."

**How memory works:**
- Agent makes a mistake → you correct it → agent saves the correction
- Next session, agent reads memory → doesn't repeat the mistake
- Over time, errors decrease as memory compounds
- Examples: email sign-off preferences, tone rules, design choices, client communication rules

**Memory vs. Context:**
- `claude.md` = things you know upfront (static business info)
- `memory.md` = things the agent learns over time (dynamic preferences)

---

### Step 4: Connect Tools via MCP

**MCP (Model Context Protocol)** = Anthropic's universal translator between your agent and external tools.

```
Before MCP:
  Agent --> Custom integration --> Gmail
  Agent --> Different integration --> Stripe
  Agent --> Another integration --> Notion
  (expensive, slow, fragile)

After MCP:
  Agent --> MCP --> Gmail
                --> Stripe
                --> Notion
                --> Calendar
                --> Any tool
  (standardized, plug-and-play)
```

**Essential tools to connect:**
| Category | Tools |
|----------|-------|
| Communication | Gmail, Slack |
| Calendar | Google Calendar |
| Project Management | Notion, ClickUp, Linear |
| Payments | Stripe |
| Research | Perplexity |
| File Storage | Google Drive, Dropbox |
| Meeting Notes | Granola |

**How to connect:** Each harness has a connectors/integrations panel. Browse available connectors and add the ones you need.

---

### Step 5: Build Skills (SOPs for AI)

Skills are reusable markdown files that package a complete process. Explain something once, never explain it again.

**Two ways to create skills:**

#### Method A: From Source Material
1. Upload a course transcript, document, or reference material
2. Tell the agent: "Create a skill from this material"
3. Agent packages it into a reusable skill file with references

#### Method B: From a Manual Session
1. Walk through a process manually with the agent once
2. When done, say: "Create a skill for what we just did"
3. Agent captures the entire workflow as a repeatable skill

**Skill file structure:**
```
.claude/skills/
  morning-brief/
    skill.md          <-- process definition
    references/       <-- supporting materials (auto-created)
  ads-analyst/
    skill.md
    references/
  client-proposal/
    skill.md
```

**Example skills:**

| Skill | What It Does | Time Saved |
|-------|-------------|------------|
| **Morning Brief** | Summarizes calendar, inbox, projects | 30 min/day |
| **Ads Analyst** | Scrapes competitor Meta ads, screenshots landing pages, analyzes 200+ creatives, produces report | 3-4 hours |
| **Client Proposal** | Reads meeting notes, drafts proposal, creates Stripe link, sets up project in Notion | 1-2 hours |
| **Podcast Research** | Deep-dives upcoming guests before interviews | 1 hour |

**Chaining skills:** Reference one skill from another. Example: Morning Brief skill says "if there are meetings today, run the Podcast Research skill" — creating compound workflows.

---

### Step 6: Schedule Tasks (Automated Execution)

Turn any skill or prompt into a scheduled job:

```
+------------------+     +-----------+     +------------------+
|  Schedule/Cron   | --> | Run Skill | --> | Deliver Results  |
|  (9 AM daily)    |     | or Prompt |     | (email, file,    |
|                  |     |           |     |  notification)   |
+------------------+     +-----------+     +------------------+
```

**Examples:**
- "Run my morning briefing skill" at 9 AM daily
- "Scrape car marketplaces every 3 hours and notify me of matches"
- "Check inbox every hour and flag urgent items"
- "Generate weekly content calendar every Monday at 7 AM"

---

### Step 7: Global vs. Project-Level Configuration

```
Global (applies everywhere):
  ~/.claude/CLAUDE.md        <-- global context
  ~/.claude/skills/          <-- global skills (e.g., "make text shorter")
  ~/.claude/mcp-servers/     <-- global tool connections

Project-level (applies to one department):
  executive-assistant/
    claude.md                <-- role-specific context
    memory.md                <-- role-specific memory
    .claude/skills/          <-- role-specific skills
```

**Rule of thumb:**
- Skills used across all departments → global
- Skills specific to one function → project-level
- Same logic applies to context files and MCP connections

---

## Complete Process Flow: Executive Assistant in Action

Here's how all the pieces work together in a real scenario:

```
TRIGGER: "Review my meeting notes with the client, draft a follow-up proposal,
          create a payment link, and set up the project"

  1. OBSERVE
     |-- Read claude.md (knows role, business context)
     |-- Read memory.md (knows preferences, past corrections)
     |-- Check available tools (Gmail, Granola, Stripe, Notion)
     
  2. THINK
     |-- Plan: Need meeting notes → draft proposal → create payment → setup project
     
  3. ACT: Get meeting notes
     |-- Tool: Granola → pull today's meeting notes
     |-- Extract: client name, discussed scope, agreed pricing
     
  4. ACT: Draft proposal email
     |-- Tool: Gmail → compose email
     |-- Uses: brand voice from context, client preferences from memory
     |-- Includes: scope summary, pricing, next steps
     
  5. ACT: Create payment link
     |-- Tool: Stripe → create payment link
     |-- Amount: from meeting notes
     |-- Embeds link in proposal email
     
  6. ACT: Set up project
     |-- Tool: Notion → create project page
     |-- Populates: client info, scope, timeline, deliverables
     
  7. DELIVER
     |-- Email draft ready for review
     |-- Stripe link created
     |-- Notion project set up
     |-- Summary of everything done
```

---

## Key Mindset Shifts

1. **Chat → Agent:** Stop asking questions. Start setting goals.
2. **Prompt engineering → Context engineering:** Rich context + simple prompts > clever prompts + no context.
3. **One-shot → Compound:** Skills chain together. Memory accumulates. The system gets better every day.
4. **Manual → Scheduled:** Anything you do daily should be a scheduled skill.
5. **Platform-locked → Platform-agnostic:** Learn the concepts (loop, tools, context, skills). The harness doesn't matter.

---

## Getting Started Checklist

- [ ] Pick a harness (Claude Code, Cowork, or Codex)
- [ ] Create your first department folder (executive assistant)
- [ ] Write your context file (claude.md) — use the interview method
- [ ] Create memory.md with update instructions
- [ ] Connect 3-5 essential tools via MCP (Gmail, Calendar, Notion)
- [ ] Build your first skill from a manual session
- [ ] Schedule your first automated task (morning brief)
- [ ] Expand: add a second department folder when ready

---

*Process flow recreated from "Building AI Agents that actually work (Full Course)" — The Startup Ideas Podcast, Greg Isenberg x Remy Gaskell, March 2026*
