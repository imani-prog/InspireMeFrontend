# 🐳 Docker Quick Reference

## Quick Commands

### Using the Interactive Script
```bash
./docker-start.sh
```

### Using Make Commands
```bash
make build          # Build production image
make up             # Start production container
make down           # Stop containers
make logs           # View logs
make dev-up         # Start development mode
make help           # Show all commands
```

### Using Docker Compose Directly

#### Production Mode
```bash
# Build and start
docker-compose up -d frontend

# Stop
docker-compose down

# View logs
docker-compose logs -f frontend

# Restart
docker-compose restart frontend
```

#### Development Mode
```bash
# Start development with hot reload
docker-compose --profile dev up frontend-dev

# Run in background
docker-compose --profile dev up -d frontend-dev

# Stop
docker-compose --profile dev down
```

## 🚀 Deployment Steps

### 1. Local Testing
```bash
# Build the image
docker-compose build frontend

# Test locally
docker-compose up frontend

# Access at http://localhost:3000
```

### 2. Push to Docker Hub
```bash
# Login to Docker Hub
docker login

# Tag the image
docker tag inspireme-frontend:latest yourusername/inspireme-frontend:latest

# Push to registry
docker push yourusername/inspireme-frontend:latest
```

### 3. Deploy to Server
```bash
# On your server
docker pull yourusername/inspireme-frontend:latest
docker run -d -p 80:80 --name inspireme-frontend yourusername/inspireme-frontend:latest
```

## 📦 What's Included

- **Dockerfile** - Production build with Nginx
- **Dockerfile.dev** - Development build with hot reload
- **docker-compose.yml** - Orchestration configuration
- **nginx.conf** - Custom Nginx configuration
- **.dockerignore** - Build optimization
- **Makefile** - Convenience commands
- **docker-start.sh** - Interactive setup script
- **DOCKER.md** - Complete documentation

## 🔧 Port Configuration

- Production: `3000:80`
- Development: `5173:5173`

To change ports, edit `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Change 8080 to your desired port
```

## 📊 Container Management

### Check Status
```bash
docker-compose ps
docker inspect --format='{{.State.Health.Status}}' inspireme-frontend
```

### View Logs
```bash
# All logs
docker-compose logs frontend

# Follow logs
docker-compose logs -f frontend

# Last 100 lines
docker-compose logs --tail=100 frontend
```

### Execute Commands
```bash
# Shell access
docker-compose exec frontend sh

# View Nginx config
docker-compose exec frontend cat /etc/nginx/conf.d/default.conf
```

## 🧹 Cleanup

```bash
# Stop and remove containers
docker-compose down

# Remove everything including volumes
docker-compose down -v

# Remove images too
docker-compose down -v --rmi all

# Clean Docker system
docker system prune -af
```

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Use different port
docker-compose up -d -p 8080:80 frontend
```

### Build Cache Issues
```bash
# Build without cache
docker-compose build --no-cache frontend
```

### Container Won't Start
```bash
# Check logs
docker-compose logs frontend

# Check system resources
docker system df
docker stats
```

## 📚 More Information

See [DOCKER.md](./DOCKER.md) for complete documentation.
