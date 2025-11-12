# 🔄 GitHub Actions Workflows

Your project now has **3 separate, organized workflows**:

## 📋 Workflow Overview

### 1. **CI - Test & Build** (`ci.yml`)
**Triggers:** Push/PR to `main` or `develop`

**Jobs:**
- ✅ **lint-and-test**: Runs ESLint, builds app, uploads artifacts
- ✅ **docker-test**: Tests Docker build and container
- ✅ **status-check**: Verifies all tests passed

**Purpose:** Continuous Integration - runs on every push/PR to ensure code quality

---

### 2. **Docker Build & Push** (`docker-build.yml`)
**Triggers:** Push to `main`/`develop`, tags, or manual trigger

**Jobs:**
- 🐳 **docker-build-and-push**: Builds multi-platform images and pushes to Docker Hub

**Purpose:** Creates and publishes Docker images for deployment

**Requirements:**
- ✅ `DOCKER_USERNAME` secret (already set)
- ✅ `DOCKER_PASSWORD` secret (already set)

---

### 3. **Deploy to Vercel** (`vercel-deploy.yml`)
**Triggers:** Push to `main` or manual trigger

**Jobs:**
- 🚀 **deploy**: Deploys to Vercel production (main branch)
- 🔍 **deploy-preview**: Deploys preview (develop branch)

**Purpose:** Automatic deployment to Vercel

**Requirements:** (Need to set up - see below)
- ⚠️ `VERCEL_TOKEN`
- ⚠️ `VERCEL_ORG_ID`
- ⚠️ `VERCEL_PROJECT_ID`

---

## 🔧 Setting Up Vercel Deployment

### Step 1: Get Vercel Token

1. Go to https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Name it: `GitHub Actions`
4. Click **"Create"**
5. **Copy the token**

### Step 2: Get Vercel Project IDs

Run these commands in your project directory:

```bash
# Install Vercel CLI if not installed
npm install -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# View your project settings
vercel inspect
```

Or get them from Vercel dashboard:
1. Go to your project: https://vercel.com/dashboard
2. Click on your project → **Settings**
3. Find:
   - **Project ID** (in General settings)
   - **Team/Org ID** (in your account settings)

### Step 3: Add Secrets to GitHub

Go to: https://github.com/imani-prog/InspireMeFrontend/settings/secrets/actions

Add these three secrets:

1. **VERCEL_TOKEN**
   - Value: Token from Step 1

2. **VERCEL_ORG_ID**
   - Value: Your Vercel team/org ID (e.g., `team_xxxxx` or personal ID)

3. **VERCEL_PROJECT_ID**
   - Value: Your project ID (e.g., `prj_xxxxx`)

### Step 4: Enable Workflow

Once secrets are added, push any change:

```bash
git add .
git commit -m "feat: Add separate CI/CD workflows"
git push
```

---

## 📊 Workflow Execution Flow

### On Push to `main`:
```
1. CI (Test & Build) ────────────┐
                                 ▼
2. Docker Build & Push ──────────┤
                                 ▼
3. Vercel Deploy ────────────────┘
```

### On Push to `develop`:
```
1. CI (Test & Build) ────────────┐
                                 ▼
2. Docker Build & Push ──────────┤
                                 ▼
3. Vercel Preview Deploy ────────┘
```

### On Pull Request:
```
1. CI (Test & Build) ────────────✓
   (Only testing, no deployment)
```

---

## 🎯 Current Status

| Workflow | Status | Requirements |
|----------|--------|--------------|
| CI - Test & Build | ✅ Ready | No secrets needed |
| Docker Build & Push | ✅ Ready | ✅ Docker Hub configured |
| Vercel Deploy | ⚠️ Needs Setup | Need Vercel secrets |

---

## 🚀 Quick Commands

### Manually Trigger Workflows

You can manually trigger workflows from GitHub Actions tab:
1. Go to: https://github.com/imani-prog/InspireMeFrontend/actions
2. Select a workflow
3. Click **"Run workflow"**

### View Workflow Status

Check status badges in your README or:
- https://github.com/imani-prog/InspireMeFrontend/actions

---

## 📝 Workflow Files Location

```
.github/
└── workflows/
    ├── ci.yml              # Test & Build
    ├── docker-build.yml    # Docker Hub Push
    └── vercel-deploy.yml   # Vercel Deployment
```

---

## 🔒 Security Best Practices

✅ All secrets stored securely in GitHub  
✅ Secrets never exposed in logs  
✅ Workflow permissions properly scoped  
✅ Manual workflow triggers available  
✅ Multi-environment support (prod/preview)  

---

## 🆘 Troubleshooting

### Vercel Deployment Fails
- Verify all 3 Vercel secrets are set correctly
- Check Vercel CLI is properly linked: `vercel inspect`
- Ensure Vercel project is connected to the correct Git repository

### Docker Push Fails
- Verify Docker Hub credentials are still valid
- Check if repository exists on Docker Hub
- Regenerate access token if needed

### CI Tests Fail
- Check linting errors in the logs
- Ensure all dependencies are properly listed in package.json
- Review build errors in the GitHub Actions tab

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Docker Hub Documentation](https://docs.docker.com/docker-hub/)

---

**Next Step:** Set up Vercel secrets to enable automatic deployments! 🚀
