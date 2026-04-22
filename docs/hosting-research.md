# Hosting Research: Cheapest VPS + Coolify for 2 Next.js SaaS Apps

**Date:** April 2, 2026
**Goal:** Find the absolute cheapest reliable hosting for 2 Next.js SaaS applications with low traffic (<10K visits/month each)

---

## RECOMMENDATION (TL;DR)

**Winner: Hetzner CX23 (EU) + Coolify = ~$4.85/month total**

| Item | Cost |
|------|------|
| Hetzner CX23 (Nuremberg/Helsinki) | €3.99/mo (~$4.35) |
| IPv4 address (included w/ CX23) | €0.00 |
| Coolify (self-hosted, free) | $0.00 |
| Let's Encrypt SSL | $0.00 |
| **Total** | **~$4.35/mo** |

For US-only hosting, cheapest is CPX11 at ~$8/mo in Ashburn, but EU latency is fine for a SaaS with <10K visits.

**Runner-up (free):** Oracle Cloud Always Free ARM (4 OCPU, 24GB RAM) -- $0/month forever, but unreliable availability and harder setup.

**Runner-up (managed):** Cloudflare Workers via OpenNext -- free tier handles 100K requests/day, but Next.js support has rough edges.

---

## 1. Hetzner Cloud VPS Options (Prices as of April 2026)

### CX Series -- Cost-Optimized Shared vCPU (EU ONLY)

| Plan | vCPU | RAM | Disk | Traffic | Price (EUR) | Price (USD est.) |
|------|------|-----|------|---------|-------------|------------------|
| **CX23** | 2 | 4 GB | 40 GB | 20 TB | €3.99/mo | ~$4.35 |
| CX33 | 4 | 8 GB | 80 GB | 20 TB | €6.49/mo | ~$7.10 |
| CX43 | 8 | 16 GB | 160 GB | 20 TB | €11.99/mo | ~$13.10 |
| CX53 | 16 | 32 GB | 320 GB | 20 TB | €22.49/mo | ~$24.55 |

**Available in:** Nuremberg (DE), Falkenstein (DE), Helsinki (FI) -- NOT available in US or Singapore.

### CAX Series -- ARM Shared vCPU (EU ONLY)

| Plan | vCPU | RAM | Disk | Traffic | Price (EUR) |
|------|------|-----|------|---------|-------------|
| CAX11 | 2 | 4 GB | 40 GB | 20 TB | €4.49/mo |
| CAX21 | 4 | 8 GB | 80 GB | 20 TB | €7.99/mo |

**Available in:** Germany, Finland only. ARM is slightly more expensive than CX at the low end.

### CPX Series -- Regular Performance Shared vCPU (Available in US)

| Plan | vCPU | RAM | Disk | Traffic | Price EU | Price US (Ashburn) |
|------|------|-----|------|---------|----------|-------------------|
| **CPX11** | 2 | 2 GB | 40 GB | 20 TB | ~€5.49/mo | ~$8.00/mo |
| CPX22 | 2 | 4 GB | 80 GB | 20 TB | €7.99/mo | ~$9.50/mo |
| CPX32 | 4 | 8 GB | 160 GB | 20 TB | €13.99/mo | ~$16.00/mo |

**Available in:** All locations including Ashburn (VA) and Hillsboro (OR).

### CCX Series -- Dedicated vCPU (Overkill for our needs)

Starting at €15.99/mo -- skip this.

### Which Server for 2 Next.js Apps + Coolify?

**CX23 (2 vCPU, 4 GB RAM, 40 GB SSD) -- YES, this works.** Here's why:

- Coolify itself needs ~500MB RAM idle
- Each Next.js standalone app uses ~100-200MB RAM
- Total: ~800MB-1GB RAM used, leaving 3GB headroom
- 40 GB disk is plenty (Next.js Docker images are ~150-200MB each)
- 20 TB bandwidth is massive for <20K visits/month
- 2 shared vCPUs handle low-traffic Next.js fine

**If you need US datacenter:** CPX11 (2 vCPU, 2 GB RAM) at ~$8/mo works but is tighter on RAM. CPX22 at ~$9.50/mo gives more breathing room.

### Datacenter Location Decision

For a US-targeted SaaS with <10K visits each:
- **EU (Nuremberg/Helsinki)** adds ~100-150ms latency to US East Coast
- At low traffic, this latency is barely noticeable
- Save $4-5/month by going EU
- **Recommendation:** Start with CX23 in EU. Move to US CPX only if latency complaints arise.

### Additional Costs

| Item | Cost |
|------|------|
| IPv4 address | Included with CX23; +€0.50/mo if you need extra |
| Automatic backups | +20% of server cost (~€0.80/mo) |
| Block storage | €0.0572/GB/mo (probably don't need) |
| Traffic overage | €1/TB in EU, $1/TB in US (you won't hit 20TB) |
| Snapshots | €0.0119/GB/mo |

---

## 2. Coolify Setup Guide

### Why Coolify?

Coolify is a free, open-source, self-hosted alternative to Vercel/Netlify/Heroku. It provides:
- Web UI for managing deployments
- Git-push deploy (connect GitHub/GitLab)
- Automatic SSL via Let's Encrypt
- Docker-based deployments
- Built-in reverse proxy (Traefik)
- Multiple apps on one server
- Database management
- Environment variable management
- Zero monthly cost

### Coolify vs Dokku vs CapRover

| Feature | Coolify | Dokku | CapRover |
|---------|---------|-------|----------|
| **UI** | Modern web GUI | CLI only | Web GUI |
| **Ease of use** | Easiest | Hardest (CLI) | Medium |
| **RAM usage (idle)** | ~500MB | ~200MB | ~400MB |
| **Docker Compose** | Full support | Limited | No |
| **SSL** | Auto (Let's Encrypt) | Plugin needed | Auto |
| **Git deploy** | Built-in | Built-in | Built-in |
| **Active development** | Very active (2026) | Stable/slow | Moderate |
| **Next.js support** | Excellent (Nixpacks) | Good | Good |
| **Multi-app** | Easy via UI | CLI commands | Easy via UI |
| **Monitoring** | Built-in (Grafana) | External needed | NetData |
| **Best for** | Teams/beginners | Minimalists | Simplicity |

**Winner: Coolify** -- Best UI, most features, great Next.js support, actively maintained.

### Installation Steps (Hetzner + Coolify)

#### Step 1: Create Hetzner VPS

1. Sign up at hetzner.com/cloud
2. Create new project
3. Add server:
   - Location: Nuremberg (nbg1) or Helsinki (hel1)
   - Image: Ubuntu 24.04
   - Type: CX23 (€3.99/mo)
   - SSH key: Add your public key
   - Name: "coolify-prod"
4. Note the server IP address

#### Step 2: Initial Server Setup

```bash
# SSH into server
ssh root@YOUR_SERVER_IP

# Update system
apt update && apt upgrade -y

# Set up firewall (optional but recommended)
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 8000/tcp  # Coolify dashboard
ufw enable
```

#### Step 3: Install Coolify

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
```

This single command installs Docker, Docker Compose, and Coolify. Takes 2-3 minutes.

#### Step 4: Access Coolify Dashboard

1. Open browser: `http://YOUR_SERVER_IP:8000`
2. Create admin account (first user becomes admin)
3. Complete initial setup wizard

#### Step 5: Connect GitHub

1. In Coolify: Settings > GitHub
2. Create GitHub App (Coolify walks you through it)
3. Install the app on your repositories
4. Now you can deploy from any connected repo

#### Step 6: Deploy First Next.js App

1. Click "New Resource" > "Application"
2. Select your GitHub repo
3. Coolify auto-detects Next.js (uses Nixpacks or Dockerfile)
4. Set environment variables in the UI
5. Set the domain (e.g., `app1.yourdomain.com`)
6. Click Deploy

#### Step 7: Custom Domain + SSL

1. In your DNS provider, create an A record:
   - `app1.yourdomain.com` -> YOUR_SERVER_IP
   - `app2.yourdomain.com` -> YOUR_SERVER_IP
2. In Coolify app settings, set domain to `https://app1.yourdomain.com`
3. Coolify/Traefik automatically provisions Let's Encrypt SSL
4. Certificates auto-renew before expiry

#### Step 8: Deploy Second Next.js App

Repeat Step 6 with different repo and domain. Traefik routes traffic by hostname automatically.

### Git-Push Deploy Workflow

Once connected, the workflow is:
1. Push code to GitHub (main branch or configured branch)
2. Coolify webhook fires automatically
3. Coolify pulls code, builds Docker image, deploys
4. Zero-downtime deployment (new container starts, old one stops)
5. ~2-3 minute build time for typical Next.js app

### Deploying Multiple Apps

Each app gets its own:
- Container (isolated)
- Domain (routed by Traefik)
- SSL certificate
- Environment variables
- Build settings
- Deploy logs

All on the same $4.35/month server. No extra cost per app.

---

## 3. Alternative Ultra-Cheap Options

### Oracle Cloud Always Free -- $0/month (forever)

**Specs (Always Free ARM):**
- 4 OCPUs (ARM Ampere A1)
- 24 GB RAM
- 200 GB boot volume
- 10 TB/month outbound transfer
- 1 reserved public IP

**Pros:**
- Literally free forever (not a trial)
- Massively over-specced for 2 Next.js apps
- Can run Coolify + many apps
- 10 TB bandwidth included

**Cons:**
- ARM instances often "Out of Capacity" -- may take days/weeks to provision
- Oracle could change/kill the free tier (they've hinted at it)
- Oracle Cloud UI is confusing
- Less community support than Hetzner
- No SLA on free tier
- Must keep instances active (Oracle reclaims idle free resources)

**Verdict:** Great if you can get an instance. Don't depend on it for production.

### Cloudflare Workers + OpenNext -- $0-5/month

**Free Tier:**
- 100,000 requests/day (3M/month)
- Unlimited bandwidth
- Free SSL, free custom domains
- Global CDN edge deployment

**Paid ($5/month):**
- 10 million requests/month
- More CPU time

**Pros:**
- Edge deployment (fast globally)
- No server to manage
- Free tier is generous
- Scales automatically

**Cons:**
- Next.js support via OpenNext adapter -- works but has rough edges
- Not all Next.js features supported (middleware quirks, some API route limitations)
- Cold starts on free tier
- Debugging is harder than a VPS
- Lock-in to Cloudflare ecosystem
- Need Durable Objects ($5/mo min) if you need any persistent state

**Verdict:** Best free option if your Next.js apps are simple. Not recommended for complex SSR apps.

### Railway -- $5-10/month for 2 apps

**Pricing:**
- Hobby plan: $5/month (includes $5 credit)
- Usage: vCPU ($0.000463/min) + RAM ($0.000231/GB/min) + Storage + Egress ($0.10/GB)
- A small Next.js app typically costs $2-5/month

**For 2 low-traffic Next.js apps:**
- Estimated: $5-10/month total (within or slightly over Hobby credits)

**Pros:**
- Zero ops -- just push and deploy
- Auto-detect Next.js
- Good DX, nice dashboard
- Easy environment variables

**Cons:**
- Usage-based means unpredictable bills
- No free tier anymore
- More expensive than Hetzner for always-on apps
- Egress charges add up

**Verdict:** Easy but more expensive than Hetzner. Good if you value simplicity over savings.

### Fly.io -- $3-8/month for 2 apps

**Pricing:**
- No free tier for new users (removed 2024)
- Pay-as-you-go
- Shared 256MB instance: ~$1.94/month
- Shared 512MB instance: ~$3.88/month

**For 2 Next.js apps:**
- 2x 256MB instances: ~$3.88/month
- But 256MB is tight for Next.js -- realistically need 512MB each: ~$7.76/month

**Pros:**
- Edge deployment (fly machines worldwide)
- Good Next.js support
- Auto-scaling to zero possible
- Nice CLI

**Cons:**
- No free tier
- 256MB too small for Next.js SSR
- More complex than Railway
- Pricing can be confusing

**Verdict:** Competitive but harder to use than Coolify. Similar cost to Hetzner with less control.

### Render -- $7-14/month for 2 apps

**Pricing:**
- Free tier: Static sites only (or web services that spin down after 15min inactivity, 30s-2min cold start)
- Paid web services: $7/month each minimum

**For 2 Next.js apps:**
- Free tier: Both apps sleep after 15min -- terrible UX with 30s+ cold starts
- Paid: $14/month (2 x $7)

**Pros:**
- Simple deployment
- Good GitHub integration
- Managed PostgreSQL available

**Cons:**
- Free tier has crippling cold starts
- Paid tier is expensive for what you get ($14/mo for 2 apps)
- Less flexible than a VPS

**Verdict:** Too expensive. Hetzner + Coolify gives you way more for $4.35/mo.

---

## 4. Docker Setup for Next.js

### next.config.mjs (Required)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
};

export default nextConfig;
```

### Optimized Dockerfile (Next.js 15 Standalone)

```dockerfile
# Stage 1: Install dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Stage 2: Build the application
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: Production runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only what's needed
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### .dockerignore

```
node_modules
.next
.git
.gitignore
README.md
.env*.local
Dockerfile
docker-compose.yml
```

### Key Points

- **Image size:** ~150-200MB (vs 1-2GB without optimization)
- **Build time:** ~60-90 seconds on CX23
- **Memory usage:** ~100-200MB per running container
- **`output: "standalone"`** is critical -- bundles only needed node_modules
- **Multi-stage build** keeps source code and dev dependencies out of production image
- **Non-root user** is a security best practice

### Environment Variables

Two approaches with Coolify:

**Build-time variables** (baked into image):
- Set in Coolify UI under app settings > Environment Variables
- Prefix with `NEXT_PUBLIC_` for client-side access
- Available during `npm run build`

**Runtime variables** (read at startup):
- Set in Coolify UI, marked as "runtime"
- Available via `process.env` in API routes and server components
- NOT available in client components (use NEXT_PUBLIC_ prefix for those)

---

## 5. Complete Cost Comparison

### Monthly Cost for 2 Low-Traffic Next.js Apps

| Option | Monthly Cost | vCPU | RAM | Storage | Bandwidth | Ease | Reliability |
|--------|-------------|------|-----|---------|-----------|------|-------------|
| **Hetzner CX23 + Coolify (EU)** | **$4.35** | 2 | 4 GB | 40 GB | 20 TB | Medium | High |
| Oracle Cloud Free ARM | $0 | 4 | 24 GB | 200 GB | 10 TB | Hard | Low* |
| Cloudflare Workers (free) | $0 | N/A | N/A | N/A | Unlimited | Medium | Medium** |
| Fly.io (2x 256MB) | $3.88 | 1+1 | 512 MB | 1 GB each | 100 GB | Medium | High |
| Fly.io (2x 512MB) | $7.76 | 1+1 | 1 GB | 1 GB each | 100 GB | Medium | High |
| Hetzner CPX11 + Coolify (US) | $8.00 | 2 | 2 GB | 40 GB | 20 TB | Medium | High |
| Railway Hobby | $5-10 | Shared | Shared | 1 GB | Paid | Easy | High |
| Hetzner CPX22 + Coolify (US) | $9.50 | 2 | 4 GB | 80 GB | 20 TB | Medium | High |
| Render (paid, 2 apps) | $14.00 | Shared | 512 MB ea | N/A | 100 GB | Easy | High |
| Vercel Pro (current) | $20.00 | N/A | N/A | N/A | 1 TB | Easiest | High |

*Oracle: Free tier availability is unpredictable; instances can be reclaimed if idle.
**Cloudflare: Next.js support via OpenNext is functional but not 100% feature-complete.

### Hidden Costs to Watch

| Cost | Hetzner+Coolify | Railway | Fly.io | Render | Cloudflare |
|------|-----------------|---------|--------|--------|------------|
| SSL certificates | Free (Let's Encrypt) | Free | Free | Free | Free |
| Custom domains | Free (bring your own) | Free | Free | Free | Free |
| Domain registration | ~$10-15/year (separate) | Same | Same | Same | Same |
| Bandwidth overage | $1/TB (won't hit) | $0.10/GB | $0.02/GB | Included | Free |
| Backups | +$0.80/mo (optional) | N/A | N/A | N/A | N/A |
| Database | Self-host free | $5+/mo | $5+/mo | $7+/mo | D1 free tier |
| Monitoring | Built into Coolify | Built-in | Built-in | Built-in | Built-in |

### Scalability Path

When you outgrow the CX23:
1. **CX33** (4 vCPU, 8GB RAM): €6.49/mo -- handles 10-50K visits/month
2. **CX43** (8 vCPU, 16GB RAM): €11.99/mo -- handles 50-200K visits/month
3. **Add second server:** Coolify supports multi-server setups
4. **Move to US datacenter:** CPX22 at ~$9.50/mo if latency matters

---

## 6. Step-by-Step Action Plan

### Phase 1: Get Running ($4.35/month)

1. Sign up at [hetzner.com/cloud](https://www.hetzner.com/cloud)
2. Create CX23 server in Nuremberg (Ubuntu 24.04)
3. SSH in, run Coolify install script
4. Access Coolify at `http://IP:8000`, create admin account
5. Connect GitHub repos
6. Add `output: "standalone"` to both Next.js apps' `next.config.mjs`
7. Deploy App 1 with custom domain
8. Deploy App 2 with custom domain
9. Point DNS A records to server IP
10. SSL auto-provisions via Let's Encrypt

### Phase 2: Harden (Same cost)

1. Enable Hetzner firewall (free)
2. Disable password SSH, use keys only
3. Set up Coolify auto-updates
4. Enable Coolify's built-in monitoring
5. Optional: Enable Hetzner backups (+€0.80/mo)

### Phase 3: Scale (When needed)

1. Monitor RAM/CPU usage in Coolify dashboard
2. If consistently >80% RAM: upgrade to CX33 (€6.49/mo)
3. If US latency matters: migrate to CPX22 Ashburn (~$9.50/mo)
4. If >50K visits: consider CX43 or add second server

---

## Sources

- [Hetzner Cloud Pricing Calculator (Apr 2026)](https://costgoat.com/pricing/hetzner)
- [Hetzner Cloud](https://www.hetzner.com/cloud)
- [Hetzner New CX Plans](https://www.hetzner.com/pressroom/new-cx-plans/)
- [Hetzner Cloud Review 2026 - Better Stack](https://betterstack.com/community/guides/web-servers/hetzner-cloud-review/)
- [Coolify Installation Docs](https://coolify.io/docs/get-started/installation)
- [Coolify Next.js Docs](https://coolify.io/docs/applications/nextjs)
- [Coolify Domain Setup](https://coolify.io/docs/knowledge-base/domains)
- [Coolify vs Dokku vs CapRover](https://cybersnowden.com/coolify-vs-dokku-vs-caprover-self-hosted-platform/)
- [Deploy Next.js on Hetzner with Coolify](https://deepakness.com/raw/nextjs-on-hetzner-vps/)
- [Hetzner + Coolify Guide - Medium](https://medium.com/@kapildevkhatik2/escaping-paas-pricing-deploying-a-next-js-full-stack-app-on-hetzner-with-coolify-0e1024931c23)
- [Railway Pricing Docs](https://docs.railway.com/pricing)
- [Fly.io Pricing](https://fly.io/pricing/)
- [Render Pricing](https://render.com/pricing)
- [Cloudflare Workers Pricing](https://developers.cloudflare.com/workers/platform/pricing/)
- [Cloudflare OpenNext Adapter](https://opennext.js.org/cloudflare)
- [Oracle Cloud Free Tier](https://www.oracle.com/cloud/free/)
- [Next.js Docker Standalone Optimization](https://dev.to/angojay/optimizing-nextjs-docker-images-with-standalone-mode-2nnh)
- [Next.js Docker Config Guide](https://oneuptime.com/blog/post/2026-01-24-nextjs-docker-configuration/view)
- [Hetzner Datacenter Locations](https://docs.hetzner.com/cloud/general/locations/)
