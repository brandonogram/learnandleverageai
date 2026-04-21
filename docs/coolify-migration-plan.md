# LLAI → Coolify Migration Plan

**Target host:** `root@5.161.102.158` (Hetzner, Coolify) — same box as ReplyCadet (`replycadet.com`).
**NOT** `178.156.193.142` (that's the Nettie bare-systemd box; leave alone).
**Deploy pattern:** `docker build` local → `docker save` + `scp` image OR git-based Coolify auto-deploy.

---

## Environment variable inventory (from `grep process.env src/`)

| Variable | Where used | Build-time / Runtime | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `src/lib/supabase.ts` | **Build** (Next inlines `NEXT_PUBLIC_*`) | Supabase read |
| `SUPABASE_SERVICE_ROLE_KEY` | `src/lib/supabase.ts` | Runtime | Server-side only |
| `NEXT_PUBLIC_META_PIXEL_ID` | `src/app/workshops/layout.tsx`, `src/app/assessment/layout.tsx` | **Build** | Meta Pixel ID 1494764092013977 |
| `NEXT_PUBLIC_GA_ID` | layouts | **Build** | GA4 |
| `NEXT_PUBLIC_POSTHOG_KEY` | layouts | **Build** | Project 352506 |
| `NEXT_PUBLIC_POSTHOG_HOST` | layouts | **Build** | |
| `GHL_API_KEY` / `GHL_LLAI_API_KEY` | register, workshop-register, voice-inbound, waitlist, email-inbound, sms-inbound, connect, webhook/stripe | Runtime | Agency token (GHL_API_KEY) + LLAI sub-account token (GHL_LLAI_API_KEY); code prefers LLAI |
| `GHL_LOCATION_ID` / `GHL_LLAI_LOCATION_ID` | same | Runtime | |
| `GHL_PIPELINE_ID` | workshop-register | Runtime | Default `Lb2EtR2nnxlLGRWCwBpD` hard-coded in code |
| `GHL_STAGE_ID` | workshop-register | Runtime | Default `cda116cd-7fa9-428f-9e44-073d9de85036` hard-coded |
| `AGENTMAIL_API_KEY` | workshop-register, waitlist, email-inbound | Runtime | brandon@learnandleverageai.com |
| `STRIPE_SECRET_KEY` | `src/app/api/checkout/route.ts`, `src/app/api/webhook/stripe/route.ts` | Runtime | |
| `STRIPE_WEBHOOK_SECRET` | webhook/stripe | Runtime | |
| `TWILIO_ACCOUNT_SID` | workshop-register, sms-inbound | Runtime | |
| `TWILIO_AUTH_TOKEN` | workshop-register, sms-inbound | Runtime | |
| `TWILIO_PHONE` | workshop-register, sms-inbound | Runtime | `+13024166285` |
| `GROQ_API_KEY` | email-inbound, sms-inbound, voice-inbound | Runtime | LLM for reply drafting |
| `EVENTBRITE_PRIVATE_TOKEN` | eventbrite-webhook | Runtime | Default hard-coded in code |
| `LINKEDIN_WEBHOOK_SECRET` | linkedin-lead | Runtime | Default hard-coded in code |

**Source of truth for actual values:** `.env.local` (exists, mode 600, 778 bytes) and `/Users/brandonbot/.config/launchd-env/com.learnandleverageai.website.env` (exists, mode 600, 1053 bytes, updated 2026-04-09). Do not paste into this doc.

---

## Build flow

Local (Claude Code or Brandon's Mac):
```
cd /Users/brandonbot/projects/workbench/learnandleverageai
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL" \
  --build-arg NEXT_PUBLIC_META_PIXEL_ID="$NEXT_PUBLIC_META_PIXEL_ID" \
  --build-arg NEXT_PUBLIC_GA_ID="$NEXT_PUBLIC_GA_ID" \
  --build-arg NEXT_PUBLIC_POSTHOG_KEY="$NEXT_PUBLIC_POSTHOG_KEY" \
  --build-arg NEXT_PUBLIC_POSTHOG_HOST="$NEXT_PUBLIC_POSTHOG_HOST" \
  -t llai:latest .
```

Local smoke:
```
docker run --rm -p 3000:3000 \
  --env-file .env.local \
  llai:latest
curl -sI http://localhost:3000/           # 200 OK
curl -sI http://localhost:3000/assessment # 200 OK
```

**Known local-build gotcha (2026-04-21):** On Brandon's Mac the colima VM is allocated 2 GB RAM, and Next.js 16 Turbopack CSS processing OOMs during `npm run build` inside the container. Two paths:

1. **Server-side build on Coolify** (preferred, matches ReplyCadet's proven pattern). The Hetzner box has 4 GB swap configured. Coolify's build runs server-side, so the Mac VM size doesn't matter.
2. **Local build if needed:** `colima stop && colima start --memory 6 --cpu 4` before `docker build`.

TypeScript check (`npx tsc --noEmit`) passes clean on the full repo — the Dockerfile is structurally correct. Local OOM is purely a VM-sizing issue, not a code issue.

---

## Coolify app setup (on Hetzner)

Option A — **Git-based** (recommended for LLAI, matches ReplyCadet pattern):
1. Coolify → New Resource → Application → Public Repository
2. Repo: `https://github.com/BrandonBot67/learnandleverageai.git` (verify repo URL — the earlier `gh` lookup returned "not resolvable"; may need to push to a new repo or invite deploy key)
3. Build pack: **Dockerfile**
4. Port: **3000**
5. Domain: `learnandleverageai.com` + `www.learnandleverageai.com` (both via CF proxy)
6. Paste all runtime env vars from `.env.local` into Coolify env UI
7. Paste `NEXT_PUBLIC_*` as **build args** (Coolify distinguishes these)
8. Deploy. Monitor logs (Coolify UI or `docker logs`).

Option B — **Image push** (faster, but no auto-deploy):
1. `docker build` locally
2. `docker save llai:latest | ssh root@5.161.102.158 'docker load'`
3. Create Coolify "Docker Image" resource pointing to `llai:latest`
4. Same port + domain + env setup

**Preferred:** A. B is fallback if git access is friction.

---

## DNS cut-over

Pre-req: Preview URL working on Coolify (e.g., `llai.5-161-102-158.sslip.io` or Coolify's assigned hostname). Smoke-test in browser.

Cloudflare DNS → `learnandleverageai.com`:
1. Remove old A/AAAA records pointing at Vercel's IPs (if any remain)
2. Add: `A @ 5.161.102.158` (proxy ON)
3. Add: `A www 5.161.102.158` (proxy ON) OR `CNAME www @` if already flat
4. Wait ~30s, `dig learnandleverageai.com +short` should still return Cloudflare IPs (104.21.x / 172.67.x) — that's correct, CF is still the edge
5. `curl -sI https://learnandleverageai.com/` → 200 OK

Coolify will auto-request a Let's Encrypt cert the moment the origin is reachable.

---

## Validation checklist (before declaring done)

- [ ] `curl -sI https://learnandleverageai.com/` → 200
- [ ] `curl -sI https://learnandleverageai.com/workshops` → 200
- [ ] `curl -sI https://learnandleverageai.com/assessment` → 200
- [ ] `curl -sI https://learnandleverageai.com/privacy` → 200
- [ ] `curl -sI https://learnandleverageai.com/terms` → 200
- [ ] Submit workshop form → contact lands in GHL pipeline `Lb2EtR2nnxlLGRWCwBpD`
- [ ] Place test call to `+13024166285` → voice agent answers (existing workshop prompt; will be replaced in Chunk 2)
- [ ] Send test email to `info@learnandleverageai.com` → AgentMail inbound webhook fires
- [ ] Playwright screenshot smoke: `/`, `/workshops`, `/assessment` — render correctly
- [ ] CONTEXT.md updated to say "Coolify on Hetzner (5.161.102.158)" (remove the stale "Cloudflare Pages" claim)
- [ ] Delete `.vercel/` directory from repo

---

## Rollback

If production is worse than "down":
1. Coolify → stop the app
2. Cloudflare → put the `learnandleverageai.com` domain into "Under Attack Mode" or set up a temporary page rule returning a static "We'll be right back" page
3. Fix forward — no old Vercel to roll back to (account deleted)

There is no safe rollback target. This is a one-way migration.
