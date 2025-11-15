# 🐛 Troubleshooting: ERR_BLOCKED_BY_CLIENT

## Issue
```
localhost:8080/api/quotes:1  Failed to load resource: net::ERR_BLOCKED_BY_CLIENT
```

## Root Cause
This error means a **browser extension** (ad blocker, privacy extension, etc.) is blocking your API requests.

---

## ✅ Solutions

### Solution 1: Disable Browser Extensions (Quickest)

**Common culprits:**
- uBlock Origin
- AdBlock / AdBlock Plus
- Privacy Badger
- Ghostery
- NoScript
- Any privacy/security extensions

**Steps:**
1. Open your browser extensions page
2. Disable ad blockers temporarily
3. Refresh the page
4. Try creating a quote again

**OR** whitelist in your ad blocker:
- Add `localhost:8080` to whitelist
- Add `127.0.0.1:8080` to whitelist

---

### Solution 2: Use 127.0.0.1 Instead of localhost

I've created `.env.development` with `127.0.0.1` instead of `localhost`.

**Test this:**
1. Make sure dev server is running: `npm run dev`
2. Open browser DevTools → Console
3. Type: `console.log(import.meta.env.VITE_API_URL)`
4. Should show: `http://127.0.0.1:8080/api/quotes`
5. Try creating a quote again

---

### Solution 3: Try Incognito/Private Mode

1. Open browser in Incognito/Private mode
2. Extensions are usually disabled by default
3. Navigate to `http://localhost:5173`
4. Try creating a quote

---

### Solution 4: Change Browser

Try a different browser without extensions:
- Chrome/Chromium (fresh install)
- Firefox (fresh install)
- Edge
- Brave (disable Shields for localhost)

---

### Solution 5: Verify Backend is Running

```bash
# Test backend directly
curl http://localhost:8080/api/quotes/random

# Should return a quote like:
# {"id":null,"text":"...","author":"..."}
```

If this works but browser fails, it's **definitely a browser extension**.

---

## 🧪 Testing

### Check API URL in Browser Console:
```javascript
console.log('API URL:', import.meta.env.VITE_API_URL)
```

### Test Backend Health:
```bash
# Local backend
curl http://localhost:8080/api/quotes/random

# Production backend
curl https://inspiremebackend.onrender.com/api/quotes/random
```

---

## 📋 Environment Files Priority

Vite uses these files in order:
1. `.env.development.local` (highest priority for dev)
2. `.env.development`
3. `.env.local`
4. `.env`

For production build:
1. `.env.production.local`
2. `.env.production`
3. `.env.local`
4. `.env`

---

## 🔍 Current Configuration

| File | URL | Used When |
|------|-----|-----------|
| `.env.development` | `http://127.0.0.1:8080/api/quotes` | `npm run dev` |
| `.env.local` | `http://localhost:8080/api/quotes` | Fallback |
| `.env.production` | `https://inspiremebackend.onrender.com/api/quotes` | `npm run build` |

---

## ✅ Verification Steps

1. **Start backend** (if not running)
2. **Start frontend**: `npm run dev`
3. **Open DevTools** → Network tab
4. **Click "New Quote"** or "Create Quote"
5. **Check Network tab** for the request:
   - ❌ Red = Blocked by extension
   - ✅ Green/200 = Success
   - ⚠️ Yellow/CORS = Backend CORS issue

---

## 🎯 Quick Test

Run this in your browser console (while on localhost:5173):

```javascript
fetch(import.meta.env.VITE_API_URL + '/random')
  .then(r => r.json())
  .then(d => console.log('✅ Success:', d))
  .catch(e => console.error('❌ Error:', e))
```

---

## 📝 Summary

- ✅ Backend is running on `localhost:8080`
- ✅ Frontend is configured correctly
- ❌ Browser extension is blocking requests
- 🔧 **Solution**: Disable ad blocker OR use incognito mode OR whitelist localhost

---

**Status:** ⚠️ Browser extension blocking requests  
**Next Step:** Disable ad blocker or use incognito mode  
**Last Updated:** November 15, 2025
