# Deploy to Render

## 1. Create a Web Service (not Static Site)

Since Rigpel is a Next.js app with server-side routes, use **New Web Service**.

## 2. Connect Repository

- Click **New Web Service**
- Connect your GitHub repo (`yeshngedup-debug/rigpel-website`)
- Render auto-detects the repo

## 3. Configure Settings

| Field | Value |
|-------|-------|
| **Name** | `rigpel-website` |
| **Region** | `Singapore` (closest to Bhutan) |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npx next start -p $PORT` |
| **Plan** | `Free` |

## 4. Add Environment Variables

Under **Advanced** > **Environment Variables**:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `NEXT_PUBLIC_SUPABASE_URL` | your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your Supabase anon key |

## 5. Deploy

Click **Create Web Service**. Render builds and deploys automatically.

## 6. Redeploy on Changes

Push to `main` — Render auto-deploys. Or click **Manual Deploy** > **Deploy latest commit** in the Render dashboard.

## Notes

- **Free tier** spins down after 15 min inactivity — first request after idle takes ~30s to cold-start
- **Static Site** won't work because Next.js needs a Node server (for dynamic routes like `/worker/gigs/[id]`)
- Build log is visible live in the Render dashboard
