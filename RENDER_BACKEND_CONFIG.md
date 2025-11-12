# 🚀 Frontend Configuration for Render Backend

This guide explains the frontend configuration updates to work with your Render-deployed backend.

## ✅ What Was Updated

### 1. **API Service Configuration** (`src/services/quoteService.js`)
- ✅ Now uses `import.meta.env.VITE_API_URL` for dynamic API URL
- ✅ Falls back to `localhost:8080` for local development
- ✅ Logs API URL in development mode for debugging

### 2. **Environment Files**
- ✅ `.env.local` - Local development (localhost)
- ✅ `.env.production` - Production (Render backend URL)
- ✅ `.gitignore` updated to exclude sensitive env files

### 3. **Vercel Configuration** (`vercel.json`)
- ✅ Added `VITE_API_URL` environment variable
- ✅ Points to Render backend: `https://quotes-backend.onrender.com/api/quotes`

### 4. **Docker Configuration**
- ✅ `Dockerfile` - Added build argument for `VITE_API_URL`
- ✅ `docker-compose.yml` - Supports environment variable injection
- ✅ GitHub Actions - Passes production API URL during build

### 5. **GitHub Actions**
- ✅ Docker build workflow includes API URL as build argument
- ✅ Automatically uses production backend URL for Docker images

---

## 🎯 Usage

### Local Development
```bash
# Uses .env.local (localhost:8080)
npm run dev
```

### Production Build
```bash
# Uses .env.production (Render backend)
npm run build
npm run preview
```

### Docker Build (Local)
```bash
# Uses localhost by default
docker-compose build frontend
docker-compose up frontend

# Or with custom URL
VITE_API_URL=https://quotes-backend.onrender.com/api/quotes docker-compose build frontend
```

### Docker Build (Production)
```bash
# Build with production backend
docker build \
  --build-arg VITE_API_URL=https://quotes-backend.onrender.com/api/quotes \
  -t inspireme-frontend:prod .
```

---

## 🔧 Backend URL Configuration

| Environment | API URL | File |
|------------|---------|------|
| Local Dev | `http://localhost:8080/api/quotes` | `.env.local` |
| Production | `https://quotes-backend.onrender.com/api/quotes` | `.env.production` |
| Vercel | Set in Vercel Dashboard or `vercel.json` | `vercel.json` |
| Docker | Pass as build arg `VITE_API_URL` | `Dockerfile` |

---

## 🌐 Vercel Deployment

### Option 1: Via Dashboard
1. Go to https://vercel.com/dashboard
2. Import repository
3. Add Environment Variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://quotes-backend.onrender.com/api/quotes`
4. Deploy

### Option 2: Via GitHub Actions
The Vercel workflow will automatically use the URL from `vercel.json` when you add the Vercel secrets.

---

## 🐛 Troubleshooting

### API Not Connecting

**Check API URL:**
```javascript
// In browser console
console.log('API URL:', import.meta.env.VITE_API_URL)
```

**Test Backend:**
```bash
curl https://quotes-backend.onrender.com/actuator/health
```

### CORS Errors

Make sure your backend has CORS configured for your frontend domain:
```java
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:3000",
    "https://inspiremefrontend.vercel.app"
})
```

### Environment Variables Not Working

1. Make sure variable starts with `VITE_`
2. Restart dev server after changing `.env` files
3. Clear Vite cache:
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

### Docker Build Issues

```bash
# Clear Docker cache
docker builder prune -a

# Rebuild without cache
docker-compose build --no-cache frontend
```

---

## 📝 Testing Checklist

- [ ] Local dev connects to localhost backend
- [ ] Production build uses Render backend URL
- [ ] Docker image builds successfully
- [ ] Vercel deployment uses correct API URL
- [ ] API calls work (fetch, save, delete)
- [ ] CORS is properly configured
- [ ] No console errors in browser

---

## 🔗 Important URLs

- **Backend (Render):** https://quotes-backend.onrender.com
- **Backend Health:** https://quotes-backend.onrender.com/actuator/health
- **Backend API:** https://quotes-backend.onrender.com/api/quotes
- **Frontend (Vercel):** https://inspiremefrontend.vercel.app (when deployed)

---

## 📚 Next Steps

1. ✅ All frontend files updated
2. ⚠️ Update your Render backend CORS to include Vercel domain
3. ⚠️ Test locally with `npm run dev`
4. ⚠️ Deploy to Vercel (add `VERCEL_TOKEN` secrets if using GitHub Actions)
5. ⚠️ Test production deployment

---

**Last Updated:** November 13, 2025  
**Backend:** Render  
**Frontend:** Vercel  
**Status:** ✅ Configured and ready to deploy
