#!/bin/bash

# InspireMe Frontend - Docker Quick Start Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored message
print_message() {
    color=$1
    message=$2
    echo -e "${color}${message}${NC}"
}

# Print banner
print_banner() {
    echo ""
    print_message "$GREEN" "╔═══════════════════════════════════════╗"
    print_message "$GREEN" "║   InspireMe Frontend - Docker Setup   ║"
    print_message "$GREEN" "╚═══════════════════════════════════════╝"
    echo ""
}

# Check if Docker is installed
check_docker() {
    print_message "$BLUE" "Checking Docker installation..."
    if ! command -v docker &> /dev/null; then
        print_message "$RED" "❌ Docker is not installed. Please install Docker first."
        exit 1
    fi
    print_message "$GREEN" "✅ Docker is installed"
}

# Check if Docker Compose is installed
check_docker_compose() {
    print_message "$BLUE" "Checking Docker Compose installation..."
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        print_message "$RED" "❌ Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    print_message "$GREEN" "✅ Docker Compose is installed"
}

# Build production image
build_production() {
    print_message "$BLUE" "Building production Docker image..."
    docker-compose build frontend
    print_message "$GREEN" "✅ Production image built successfully"
}

# Build development image
build_development() {
    print_message "$BLUE" "Building development Docker image..."
    docker-compose --profile dev build frontend-dev
    print_message "$GREEN" "✅ Development image built successfully"
}

# Start production container
start_production() {
    print_message "$BLUE" "Starting production container..."
    docker-compose up -d frontend
    print_message "$GREEN" "✅ Production container started"
    print_message "$YELLOW" "🌐 Application is running at: http://localhost:3000"
}

# Start development container
start_development() {
    print_message "$BLUE" "Starting development container..."
    docker-compose --profile dev up -d frontend-dev
    print_message "$GREEN" "✅ Development container started"
    print_message "$YELLOW" "🌐 Application is running at: http://localhost:5173"
}

# Stop containers
stop_containers() {
    print_message "$BLUE" "Stopping containers..."
    docker-compose down
    print_message "$GREEN" "✅ Containers stopped"
}

# View logs
view_logs() {
    mode=$1
    if [ "$mode" == "dev" ]; then
        print_message "$BLUE" "Viewing development logs (press Ctrl+C to exit)..."
        docker-compose --profile dev logs -f frontend-dev
    else
        print_message "$BLUE" "Viewing production logs (press Ctrl+C to exit)..."
        docker-compose logs -f frontend
    fi
}

# Clean up
cleanup() {
    print_message "$YELLOW" "⚠️  This will remove all containers, volumes, and images."
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_message "$BLUE" "Cleaning up..."
        docker-compose down -v --rmi all
        print_message "$GREEN" "✅ Cleanup completed"
    else
        print_message "$YELLOW" "Cleanup cancelled"
    fi
}

# Show status
show_status() {
    print_message "$BLUE" "Container status:"
    docker-compose ps
    echo ""
    if docker ps | grep -q inspireme-frontend; then
        health=$(docker inspect --format='{{.State.Health.Status}}' inspireme-frontend 2>/dev/null || echo "N/A")
        print_message "$GREEN" "Health status: $health"
    fi
}

# Main menu
show_menu() {
    print_banner
    echo "Please select an option:"
    echo ""
    echo "1) Build & Start Production"
    echo "2) Build & Start Development"
    echo "3) Stop All Containers"
    echo "4) View Production Logs"
    echo "5) View Development Logs"
    echo "6) Show Container Status"
    echo "7) Clean Up Everything"
    echo "8) Exit"
    echo ""
    read -p "Enter your choice [1-8]: " choice
}

# Process menu choice
process_choice() {
    case $choice in
        1)
            check_docker
            check_docker_compose
            build_production
            start_production
            ;;
        2)
            check_docker
            check_docker_compose
            build_development
            start_development
            ;;
        3)
            stop_containers
            ;;
        4)
            view_logs "prod"
            ;;
        5)
            view_logs "dev"
            ;;
        6)
            show_status
            ;;
        7)
            cleanup
            ;;
        8)
            print_message "$GREEN" "Goodbye!"
            exit 0
            ;;
        *)
            print_message "$RED" "Invalid option. Please try again."
            ;;
    esac
}

# Main loop
main() {
    while true; do
        show_menu
        process_choice
        echo ""
        read -p "Press Enter to continue..."
    done
}

# Run main function
main
