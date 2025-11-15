#!/bin/bash

# Quick script to check environment configuration

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║       Environment Configuration Check                      ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Check if .env files exist
echo "📁 Environment Files:"
echo "-------------------"
[ -f .env.development ] && echo "✅ .env.development exists" || echo "❌ .env.development missing"
[ -f .env.local ] && echo "✅ .env.local exists" || echo "❌ .env.local missing"
[ -f .env.production ] && echo "✅ .env.production exists" || echo "❌ .env.production missing"
echo ""

# Show content of env files
echo "🔧 Development (.env.development):"
echo "-----------------------------------"
[ -f .env.development ] && grep VITE_API_URL .env.development || echo "File not found"
echo ""

echo "🔧 Local (.env.local):"
echo "----------------------"
[ -f .env.local ] && grep VITE_API_URL .env.local || echo "File not found"
echo ""

echo "🔧 Production (.env.production):"
echo "---------------------------------"
[ -f .env.production ] && grep VITE_API_URL .env.production || echo "File not found"
echo ""

# Test backends
echo "🌐 Backend Status:"
echo "------------------"
echo -n "Local backend (localhost:8080): "
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/quotes/random 2>/dev/null | grep -q "200"; then
    echo "✅ Online"
else
    echo "❌ Offline or not responding"
fi

echo -n "Production backend (inspiremebackend.onrender.com): "
if curl -s -o /dev/null -w "%{http_code}" https://inspiremebackend.onrender.com/api/quotes/random 2>/dev/null | grep -q "200"; then
    echo "✅ Online"
else
    echo "❌ Offline or not responding"
fi
echo ""

# Test sample requests
echo "🧪 Sample API Responses:"
echo "------------------------"
echo "Local backend:"
curl -s http://localhost:8080/api/quotes/random 2>/dev/null | head -c 100 || echo "Error: Cannot connect"
echo "..."
echo ""

echo "Production backend:"
curl -s https://inspiremebackend.onrender.com/api/quotes/random 2>/dev/null | head -c 100 || echo "Error: Cannot connect"
echo "..."
echo ""

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  Usage:                                                    ║"
echo "║  - Development:  npm run dev                               ║"
echo "║  - Preview:      npm run preview                           ║"
echo "║  - Build:        npm run build                             ║"
echo "╚═══════════════════════════════════════════════════════════╝"
