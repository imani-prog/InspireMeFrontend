# ⚡ Quick Setup: Vercel Integration

## 🎯 You Need 3 Secrets for Vercel Deployment

### Method 1: Using Vercel Dashboard (Easiest)

#### Get VERCEL_TOKEN:
1. Go to: https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Copy the token

#### Get Project IDs:
1. Go to your Vercel project dashboard
2. Click **Settings**
3. Copy:
   - **Project ID** (under General)
   - **Org/Team ID** (under your team settings)

### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link your existing project
cd /home/imanitim/CODE/OnlineQuotes/Frontend/quote-frontend
vercel link

# This creates .vercel/project.json with your IDs
cat .vercel/project.json
```

The output will show:
```json
{
  "projectId": "prj_xxxxxxxxxxxxx",
  "orgId": "team_xxxxxxxxxxxxx"
}
```

---

## 📋 Add to GitHub Secrets

Go to: https://github.com/imani-prog/InspireMeFrontend/settings/secrets/actions

### Add these 3 secrets:

1. **Name:** `VERCEL_TOKEN`  
   **Value:** `your-vercel-token-here`

2. **Name:** `VERCEL_PROJECT_ID`  
   **Value:** `prj_xxxxxxxxxxxxx`

3. **Name:** `VERCEL_ORG_ID`  
   **Value:** `team_xxxxxxxxxxxxx` (or personal org ID)

---

## ✅ Test the Setup

```bash
# Commit the new workflows
git add .github/workflows/
git commit -m "feat: Add CI/CD workflows with Vercel deployment"
git push
```

Then check: https://github.com/imani-prog/InspireMeFrontend/actions

---

## 🎉 Done!

Once secrets are added, every push to `main` will:
1. ✅ Run tests
2. 🐳 Build & push Docker image
3. 🚀 Deploy to Vercel

---

**Need help?** See `.github/WORKFLOWS.md` for detailed documentation.
