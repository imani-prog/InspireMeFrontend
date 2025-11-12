# Docker Deployment Guide for InspireMe Frontend

This guide provides instructions for building and deploying the InspireMe frontend application using Docker.

## 📋 Prerequisites

- Docker installed (version 20.10 or higher)
- Docker Compose installed (version 2.0 or higher)
- Git (for cloning the repository)

## 🏗️ Project Structure

```
quote-frontend/
├── Dockerfile              # Production Docker image
├── Dockerfile.dev          # Development Docker image
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx server configuration
├── .dockerignore          # Files to exclude from Docker build
├── Makefile               # Convenience commands
└── DOCKER.md              # This file
```

## 🚀 Quick Start

### Production Mode

1. **Build the Docker image:**
   ```bash
   docker-compose build frontend
   ```
   Or using Make:
   ```bash
   make build
   ```

2. **Start the container:**
   ```bash
   docker-compose up -d frontend
   ```
   Or using Make:
   ```bash
   make up
   ```

3. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`

4. **View logs:**
   ```bash
   docker-compose logs -f frontend
   ```
   Or using Make:
   ```bash
   make logs
   ```

### Development Mode

For local development with hot reload:

1. **Start development container:**
   ```bash
   docker-compose --profile dev up frontend-dev
   ```
   Or using Make:
   ```bash
   make dev-up
   ```

2. **Access the application:**
   Open your browser and navigate to `http://localhost:5173`

## 🐳 Docker Commands

### Production Commands

```bash
# Build the image
docker-compose build frontend

# Start container in background
docker-compose up -d frontend

# Stop container
docker-compose down

# Restart container
docker-compose restart frontend

# View logs
docker-compose logs -f frontend

# Check container status
docker-compose ps

# Execute commands in container
docker-compose exec frontend sh
```

### Development Commands

```bash
# Start development container
docker-compose --profile dev up frontend-dev

# Stop development container
docker-compose --profile dev down

# View development logs
docker-compose --profile dev logs -f frontend-dev
```

## 🏭 Building for Production

### Multi-stage Build Process

The Dockerfile uses a multi-stage build:

1. **Stage 1 (Builder):** Builds the React application
   - Uses Node.js 20 Alpine
   - Installs dependencies
   - Runs `npm run build`

2. **Stage 2 (Production):** Serves the built files
   - Uses Nginx Alpine
   - Copies built files from Stage 1
   - Configured with custom nginx.conf

### Build Image Manually

```bash
# Build image with custom tag
docker build -t inspireme-frontend:v1.0.0 .

# Run the image
docker run -d -p 3000:80 --name inspireme-frontend inspireme-frontend:v1.0.0
```

## 🌐 Nginx Configuration

The application uses Nginx with the following features:

- **SPA Routing:** Redirects all routes to index.html
- **Gzip Compression:** Enabled for text files
- **Caching:** Static assets cached for 1 year
- **Security Headers:** X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
- **Health Checks:** Built-in health check endpoint

## 🔧 Environment Variables

You can pass environment variables through docker-compose.yml or command line:

```bash
docker run -d \
  -p 3000:80 \
  -e NODE_ENV=production \
  --name inspireme-frontend \
  inspireme-frontend:latest
```

## 📦 Pushing to Container Registry

### Docker Hub

```bash
# Tag the image
docker tag inspireme-frontend:latest yourusername/inspireme-frontend:latest

# Push to Docker Hub
docker push yourusername/inspireme-frontend:latest
```

### Private Registry

```bash
# Tag the image
docker tag inspireme-frontend:latest registry.example.com/inspireme-frontend:latest

# Login to registry
docker login registry.example.com

# Push to registry
docker push registry.example.com/inspireme-frontend:latest
```

## 🚢 Deployment Options

### Option 1: Docker Compose (Recommended)

```bash
# On production server
git clone <your-repo>
cd quote-frontend
docker-compose up -d frontend
```

### Option 2: Docker Run

```bash
docker pull yourusername/inspireme-frontend:latest
docker run -d -p 80:80 --name inspireme-frontend yourusername/inspireme-frontend:latest
```

### Option 3: Docker Swarm

```bash
docker stack deploy -c docker-compose.yml inspireme
```

### Option 4: Kubernetes

Create a deployment manifest:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: inspireme-frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: inspireme-frontend
  template:
    metadata:
      labels:
        app: inspireme-frontend
    spec:
      containers:
      - name: frontend
        image: yourusername/inspireme-frontend:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: inspireme-frontend
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 80
  selector:
    app: inspireme-frontend
```

## 🔍 Health Checks

The Docker image includes health checks:

```bash
# Check health status
docker inspect --format='{{.State.Health.Status}}' inspireme-frontend

# View health check logs
docker inspect --format='{{json .State.Health}}' inspireme-frontend | jq
```

## 🧹 Cleanup

```bash
# Stop and remove containers
docker-compose down

# Remove containers and volumes
docker-compose down -v

# Remove everything including images
docker-compose down -v --rmi all

# Clean up unused Docker resources
docker system prune -af --volumes
```

Or using Make:
```bash
make clean      # Remove containers
make clean-all  # Remove everything
```

## 📊 Monitoring

### View Container Stats

```bash
# Real-time stats
docker stats inspireme-frontend

# Container logs
docker logs -f inspireme-frontend

# Nginx access logs
docker exec inspireme-frontend tail -f /var/log/nginx/access.log
```

## 🐛 Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs frontend

# Check if port is already in use
lsof -i :3000

# Try different port
docker-compose up -d -p 8080:80 frontend
```

### Build failures

```bash
# Clear build cache
docker-compose build --no-cache frontend

# Check Docker disk space
docker system df
```

### Can't connect to backend

Make sure your backend API is accessible from the container. Update the API URL in your code if needed, or use Docker networks to connect services.

## 📝 Best Practices

1. **Use .dockerignore:** Exclude unnecessary files from the build context
2. **Multi-stage builds:** Keep production images small
3. **Health checks:** Always include health checks in production
4. **Security:** Run containers as non-root user when possible
5. **Logging:** Use Docker logging drivers for centralized logs
6. **Secrets:** Never hardcode secrets, use Docker secrets or environment variables
7. **Tags:** Always tag images with version numbers for production

## 🔗 Useful Links

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Vite Documentation](https://vitejs.dev/)

## 📞 Support

For issues or questions, please open an issue in the repository or contact the development team.
