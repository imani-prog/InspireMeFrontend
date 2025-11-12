# Docker Commands for InspireMe Frontend

# Production build and run
.PHONY: build
build:
	docker-compose build frontend

.PHONY: up
up:
	docker-compose up -d frontend

.PHONY: down
down:
	docker-compose down

.PHONY: restart
restart:
	docker-compose restart frontend

.PHONY: logs
logs:
	docker-compose logs -f frontend

# Development mode
.PHONY: dev-build
dev-build:
	docker-compose --profile dev build frontend-dev

.PHONY: dev-up
dev-up:
	docker-compose --profile dev up frontend-dev

.PHONY: dev-down
dev-down:
	docker-compose --profile dev down

.PHONY: dev-logs
dev-logs:
	docker-compose --profile dev logs -f frontend-dev

# Build and push to registry
.PHONY: build-push
build-push:
	docker build -t inspireme-frontend:latest .
	docker tag inspireme-frontend:latest your-registry/inspireme-frontend:latest
	docker push your-registry/inspireme-frontend:latest

# Clean up
.PHONY: clean
clean:
	docker-compose down -v --remove-orphans
	docker system prune -f

.PHONY: clean-all
clean-all:
	docker-compose down -v --remove-orphans
	docker system prune -af --volumes

# Health check
.PHONY: health
health:
	docker-compose ps
	docker inspect --format='{{.State.Health.Status}}' inspireme-frontend

.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make build        - Build production Docker image"
	@echo "  make up           - Start production container"
	@echo "  make down         - Stop containers"
	@echo "  make restart      - Restart production container"
	@echo "  make logs         - View production logs"
	@echo "  make dev-build    - Build development Docker image"
	@echo "  make dev-up       - Start development container"
	@echo "  make dev-down     - Stop development container"
	@echo "  make dev-logs     - View development logs"
	@echo "  make clean        - Remove containers and clean up"
	@echo "  make clean-all    - Remove everything including images"
	@echo "  make health       - Check container health"
