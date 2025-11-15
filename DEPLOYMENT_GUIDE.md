# 🚀 Complete Deployment & Development Guide

## 📋 Environment Configuration

Your app now supports both **development** and **production** environments automatically.

### How It Works

| Environment | API URL | File Used | Command |
|------------|---------|-----------|---------|
| **Local Development** | `http://localhost:8080/api/quotes` | `.env.development` or `.env.local` | `npm run dev` |
| **Local Preview** | `https://inspiremebackend.onrender.com/api/quotes` | `.env.production` | `npm run build && npm run preview` |
| **Vercel Production** | `https://inspiremebackend.onrender.com/api/quotes` | `.env.production` + Vercel Dashboard | Auto-deploy on push |

---

## 🔧 Vercel Dashboard Configuration

### ⚠️ CRITICAL: Set Environment Variable in Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project: **inspire-me-one**
3. Go to **Settings** → **Environment Variables**
4. Add this variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://inspiremebackend.onrender.com/api/quotes`
   - **Environment:** Select **Production**, **Preview**, and **Development**
5. Click **Save**
6. **Redeploy** your application:
   - Go to **Deployments** tab
   - Click on the latest deployment
   - Click **⋮** (three dots) → **Redeploy**

### Why This Is Needed

- Vite environment variables are **baked into the build** at build time
- `vercel.json` alone is not enough - you MUST set it in the dashboard
- Without this, your production build will use the fallback: `localhost:8080`

---

## 🛠️ Development Workflow

### 1. Local Development (with Local Backend)

```bash
# Terminal 1: Start your backend
cd /path/to/backend
./mvnw spring-boot:run

# Terminal 2: Start frontend
cd /path/to/frontend/quote-frontend
npm run dev
```

**What happens:**
- Frontend runs on `http://localhost:5173`
- Connects to backend at `http://localhost:8080`
- Uses `.env.development` or `.env.local`
- Hot reload enabled ✅

### 2. Local Development (with Production Backend)

```bash
# Test against live backend
VITE_API_URL=https://inspiremebackend.onrender.com/api/quotes npm run dev
```

**What happens:**
- Frontend runs on `http://localhost:5173`
- Connects to **live** backend at `https://inspiremebackend.onrender.com`
- Useful for testing without running backend locally

### 3. Production Preview (Local)

```bash
# Build and preview production version
npm run build
npm run preview
```

**What happens:**
- Builds production bundle
- Runs on `http://localhost:4173`
- Uses production backend URL from `.env.production`
- No hot reload (production mode)

### 4. Production Deployment (Vercel)

```bash
# Just push to GitHub
git add .
git commit -m "Your changes"
git push
```

**What happens:**
- Vercel auto-deploys on push to `main` branch
- Uses environment variable from Vercel Dashboard
- Builds production bundle
- Deploys to `https://inspire-me-one.vercel.app`

---

## 🧪 Testing Your Setup

### Check API URL in Browser Console

**Development:**
```bash
npm run dev
# Open http://localhost:5173
# Open DevTools Console
# You should see: 🌐 API Configuration: { url: "http://localhost:8080/api/quotes", ... }
```

**Production (Vercel):**
```
# Open https://inspire-me-one.vercel.app
# Open DevTools Console
# You should see: 🌐 API Configuration: { url: "https://inspiremebackend.onrender.com/api/quotes", ... }
```

### Test Backend Directly

```bash
# Local backend
curl http://localhost:8080/api/quotes/random

# Production backend
curl https://inspiremebackend.onrender.com/api/quotes/random
```

---

## 📁 Environment Files Summary

```
quote-frontend/
├── .env.development         # Development mode (npm run dev)
│   └── VITE_API_URL=http://127.0.0.1:8080/api/quotes
│
├── .env.local              # Local override (git ignored)
│   └── VITE_API_URL=http://localhost:8080/api/quotes
│
├── .env.production         # Production mode (npm run build)
│   └── VITE_API_URL=https://inspiremebackend.onrender.com/api/quotes
│
└── vercel.json             # Vercel build config
    └── build.env.VITE_API_URL=https://inspiremebackend.onrender.com/api/quotes
```

---

## 🎯 Common Scenarios

### Scenario 1: Coding New Features
```bash
# Work with local backend for faster development
npm run dev
```
- Changes appear instantly (hot reload)
- No internet required
- Test locally before pushing

### Scenario 2: Testing with Live Data
```bash
# Test against production backend
VITE_API_URL=https://inspiremebackend.onrender.com/api/quotes npm run dev
```
- Use real production data
- Test CORS, network issues
- Verify backend integration

### Scenario 3: Pre-Deployment Testing
```bash
# Test production build locally
npm run build
npm run preview
```
- Test production bundle
- Verify build optimizations
- Check production backend connection

### Scenario 4: Deploy to Production
```bash
# Push changes
git add .
git commit -m "Add new feature"
git push origin main
```
- Vercel auto-deploys
- Uses production backend
- Live at https://inspire-me-one.vercel.app

---

## ⚠️ Troubleshooting

### Problem: Vercel still shows localhost:8080

**Solution:**
1. Set `VITE_API_URL` in Vercel Dashboard (see above)
2. Redeploy from Vercel dashboard
3. Clear browser cache
4. Check console for API URL log

### Problem: CORS errors on Vercel

**Solution:**
- Update backend CORS config (see `CORS_FIX.md`)
- Add `https://inspire-me-one.vercel.app` to allowed origins
- Redeploy backend

### Problem: Local dev blocked by ad blocker

**Solution:**
- Disable ad blocker for localhost
- Use `.env.development` (uses 127.0.0.1)
- Or use incognito mode

### Problem: Changes not appearing

**Solution:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

---

## 📊 Quick Reference

### Commands
```bash
npm run dev          # Development mode (localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build (localhost:4173)
npm run lint         # Check code quality
```

### Environment Variables
```bash
# Check current API URL
console.log(import.meta.env.VITE_API_URL)

# Override for one session
VITE_API_URL=https://... npm run dev
```

### Vercel CLI (Optional)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy manually
vercel --prod

# Check environment variables
vercel env ls
```

---

## ✅ Deployment Checklist

- [ ] Set `VITE_API_URL` in Vercel Dashboard
- [ ] Updated backend CORS to allow Vercel domain
- [ ] Tested locally with `npm run dev`
- [ ] Tested production build with `npm run preview`
- [ ] Pushed to GitHub
- [ ] Verified deployment on Vercel
- [ ] Checked browser console for correct API URL
- [ ] Tested all features on production

---

**Status:** ✅ Configured for both development and production  
**Next Step:** Set environment variable in Vercel Dashboard and redeploy  
**Last Updated:** November 15, 2025
