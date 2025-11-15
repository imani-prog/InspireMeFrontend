# 🔧 CORS Fix Required for Backend

## ❌ Current Issue
```
Access to XMLHttpRequest at 'https://inspiremebackend.onrender.com/api/quotes/random' 
from origin 'https://inspire-me-one.vercel.app' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## ✅ Solution: Update Backend CORS Configuration

Your Spring Boot backend needs to allow requests from your Vercel frontend domain.

### Option 1: Global CORS Configuration (Recommended)

Create `src/main/java/com/example/quotes/config/CorsConfig.java`:

```java
package com.example.quotes.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(
                            "http://localhost:5173",              // Vite dev server
                            "http://localhost:4173",              // Vite preview
                            "http://localhost:3000",              // Docker
                            "https://inspire-me-one.vercel.app"   // Production Vercel
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600);
            }
        };
    }
}
```

### Option 2: Controller-Level CORS

Add `@CrossOrigin` to your `QuoteController.java`:

```java
@RestController
@RequestMapping("/api/quotes")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:4173",
    "http://localhost:3000",
    "https://inspire-me-one.vercel.app"
})
public class QuoteController {
    // your existing controller methods
}
```

### Option 3: Allow All Origins (Development Only - NOT Recommended for Production)

```java
@CrossOrigin(origins = "*")
```

---

## 🧪 Testing CORS After Fix

### Test CORS preflight:
```bash
curl -I -X OPTIONS https://inspiremebackend.onrender.com/api/quotes/random \
  -H "Origin: https://inspire-me-one.vercel.app" \
  -H "Access-Control-Request-Method: GET"
```

**Expected Response:**
```
HTTP/2 200
access-control-allow-origin: https://inspire-me-one.vercel.app
access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS
access-control-allow-headers: *
```

### Test actual request:
```bash
curl -H "Origin: https://inspire-me-one.vercel.app" \
  https://inspiremebackend.onrender.com/api/quotes/random
```

---

## 📝 Deployment Steps

1. Add CORS configuration to your backend code
2. Commit and push changes to your backend repository
3. Render will automatically redeploy your backend
4. Wait for deployment to complete (~2-5 minutes)
5. Test CORS using the commands above
6. Refresh your Vercel app - it should now work!

---

## 🔗 Frontend URLs to Allow

Make sure your backend CORS config includes:

| Environment | URL | Purpose |
|------------|-----|---------|
| Vite Dev | `http://localhost:5173` | Local development |
| Vite Preview | `http://localhost:4173` | Local production preview |
| Docker | `http://localhost:3000` | Docker container |
| Vercel Prod | `https://inspire-me-one.vercel.app` | Production deployment |

---

## ⚠️ Important Notes

- **NEVER use `origins = "*"` in production** - it's a security risk
- After backend changes, Render will auto-deploy (check logs)
- CORS errors only appear in browser, not with curl/Postman
- The backend must send CORS headers BEFORE the frontend can access it

---

## 📚 Additional Resources

- [Spring Boot CORS Documentation](https://spring.io/guides/gs/rest-service-cors/)
- [MDN CORS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Render Deployment Logs](https://dashboard.render.com)

---

**Status:** ⚠️ Awaiting backend CORS configuration  
**Last Updated:** November 15, 2025  
**Frontend:** ✅ Ready  
**Backend:** ⚠️ Needs CORS update
