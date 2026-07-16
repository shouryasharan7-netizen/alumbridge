# AlumBridge — Vercel Deployment Guide

## Prerequisites

- GitHub repository pushed to remote
- [Vercel account](https://vercel.com) (free tier is sufficient)
- Gemini API key (optional, for AI chatbot)

---

## Step 1: Connect Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your AlumBridge GitHub repository
4. Vercel auto-detects **Vite** as the framework

## Step 2: Configure Build Settings

| Setting | Value |
|---------|-------|
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Node Version** | 18.x or higher |

## Step 3: Add Environment Variables

In the Vercel dashboard, go to **Settings → Environment Variables** and add:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `VITE_GEMINI_API_KEY` | Your Gemini API key | Production, Preview, Development |

> **Note:** If you don't have a Gemini API key yet, the chatbot will gracefully fall back to the rule-based engine. You can add the key later.

## Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (~30-60 seconds)
3. Your site will be live at `https://your-project-name.vercel.app`

## Step 5: Custom Domain (Optional)

1. Go to **Settings → Domains**
2. Add your custom domain (e.g., `alumbridge.in`)
3. Follow DNS configuration instructions

---

## Environment Variables Reference

```bash
# Required for AI-powered chatbot (optional)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Get a Gemini API key at: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

Free tier limits: ~10-15 requests/minute, 1500 requests/day

---

## Updating After Deploy

- Push changes to GitHub → Vercel auto-deploys
- To redeploy manually: Vercel Dashboard → Deployments → Redeploy
- To add/change env vars: Settings → Environment Variables → Redeploy

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails | Check `npm run build` runs locally first |
| Blank page | Ensure `base` in `vite.config.js` matches your domain path |
| Chatbot shows no AI responses | Verify `VITE_GEMINI_API_KEY` is set in Vercel env vars |
| 404 on refresh | Vercel handles SPA routing automatically for Vite |
