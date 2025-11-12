# 🧪 Testing Guide: Frontend with Render Backend

## Quick Test Commands

### 1. Test Local Development
```bash
cd /home/imanitim/CODE/OnlineQuotes/Frontend/quote-frontend

# Start dev server (uses localhost backend)
npm run dev

# Open http://localhost:5173
# Backend should be running at http://localhost:8080
```

### 2. Test Production Build
```bash
# Build with production backend URL
npm run build

# Preview production build
npm run preview

# Open http://localhost:4173
# Will connect to Render backend
```

### 3. Test API Connection
```bash
# Check what API URL is being used
grep VITE_API_URL .env.production

# Test Render backend is accessible
curl https://quotes-backend.onrender.com/actuator/health

# Test API endpoint
curl https://quotes-backend.onrender.com/api/quotes/random
```

### 4. Test Docker Build
```bash
# Build Docker image with production backend
docker build \
  --build-arg VITE_API_URL=https://quotes-backend.onrender.com/api/quotes \
  -t inspireme-frontend:test .

# Run the container
docker run -d -p 3000:80 --name test-frontend inspireme-frontend:test

# Test it
curl http://localhost:3000

# Stop and remove
docker stop test-frontend && docker rm test-frontend
```

## 🔍 Debugging Checklist

### Check Environment Variables
```bash
# In your browser console (when app is running)
console.log('API URL:', import.meta.env.VITE_API_URL)
console.log('Mode:', import.meta.env.MODE)
```

### Test Backend Connectivity
```bash
# Health check
curl https://quotes-backend.onrender.com/actuator/health

# Get random quote
curl https://quotes-backend.onrender.com/api/quotes/random

# List all quotes
curl https://quotes-backend.onrender.com/api/quotes
```

### Check CORS
```bash
# Test CORS from your frontend domain
curl -H "Origin: https://inspiremefrontend.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     https://quotes-backend.onrender.com/api/quotes/random -v
```

## 🚦 Expected Behavior

### Local Development (npm run dev)
- ✅ Frontend: http://localhost:5173
- ✅ Backend: http://localhost:8080
- ✅ API URL: http://localhost:8080/api/quotes

### Production Build (npm run build)
- ✅ Frontend: Built to `dist/` folder
- ✅ Backend: https://quotes-backend.onrender.com
- ✅ API URL: https://quotes-backend.onrender.com/api/quotes

### Docker Container
- ✅ Frontend: http://localhost:3000
- ✅ Backend: https://quotes-backend.onrender.com (or as configured)
- ✅ API URL: Set via build argument

### Vercel Deployment
- ✅ Frontend: https://inspiremefrontend.vercel.app
- ✅ Backend: https://quotes-backend.onrender.com
- ✅ API URL: From vercel.json or environment variables

## ⚠️ Common Issues

### Issue: "Network Error" or "CORS Error"
**Solution:** Make sure your Render backend has CORS configured:
```java
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://inspiremefrontend.vercel.app"
})
```

### Issue: Environment variables not loading
**Solution:**
1. Make sure variable starts with `VITE_`
2. Restart dev server: `npm run dev`
3. Clear cache: `rm -rf node_modules/.vite`

### Issue: API calls to localhost in production
**Solution:**
1. Check `.env.production` file exists
2. Rebuild: `npm run build`
3. Verify: Check browser console for API URL

### Issue: Docker image uses wrong API URL
**Solution:**
```bash
# Pass build argument explicitly
docker build --build-arg VITE_API_URL=https://quotes-backend.onrender.com/api/quotes -t inspireme-frontend .
```

## ✅ Success Indicators

- [ ] Dev server connects to local backend
- [ ] Production build connects to Render backend
- [ ] No CORS errors in browser console
- [ ] Quotes load successfully
- [ ] Can save new quotes
- [ ] Can delete quotes
- [ ] Can fetch random quotes
- [ ] Docker image works correctly
- [ ] Vercel deployment (when ready) connects properly

## 📊 Current Configuration

```
Local Development:
Frontend: localhost:5173
Backend:  localhost:8080
API URL:  http://localhost:8080/api/quotes

Production:
Frontend: Vercel (when deployed)
Backend:  quotes-backend.onrender.com
API URL:  https://quotes-backend.onrender.com/api/quotes
```

---

**Ready to test!** Start with local development first, then production build.
