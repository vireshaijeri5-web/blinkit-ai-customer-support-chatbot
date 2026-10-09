#!/bin/bash

# ============ Blinkit Chatbot - Local Server Launcher (Mac/Linux) ============
# This script starts a local HTTP server to run the chatbot

clear

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║     Blinkit Customer Support Chatbot - Local Server       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if Python is installed
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
    PYTHON_VERSION=$($PYTHON_CMD --version 2>&1)
    echo "✓ Python detected: $PYTHON_VERSION"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
    PYTHON_VERSION=$($PYTHON_CMD --version 2>&1)
    echo "✓ Python detected: $PYTHON_VERSION"
else
    echo "❌ Python is not installed"
    echo ""
    echo "Please install Python:"
    echo "  macOS: brew install python3"
    echo "  Linux: sudo apt-get install python3"
    exit 1
fi

# Check if Node.js is installed (alternative)
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✓ Node.js detected: $NODE_VERSION"
fi

echo ""
echo "Available options:"
echo ""
echo "[1] Start with Python (Recommended)"
echo "[2] Start with Node.js"
echo "[3] Start with Python (Background)"
echo "[0] Exit"
echo ""

read -p "Select option (0-3): " choice

case $choice in
    1)
        start_python
        ;;
    2)
        start_node
        ;;
    3)
        start_python_background
        ;;
    0)
        echo ""
        echo "Goodbye! 👋"
        echo ""
        exit 0
        ;;
    *)
        echo ""
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

function start_python() {
    echo ""
    echo "🚀 Starting Python HTTP Server..."
    echo ""
    echo "Server Details:"
    echo "┌─────────────────────────────────────────┐"
    echo "│ URL: http://localhost:8000             │"
    echo "│ Admin: http://localhost:8000/admin.html│"
    echo "│ Press Ctrl+C to stop the server        │"
    echo "└─────────────────────────────────────────┘"
    echo ""

    cd "$SCRIPT_DIR"
    $PYTHON_CMD -m http.server 8000
}

function start_python_background() {
    echo ""
    echo "🚀 Starting Python HTTP Server (Background)..."
    echo ""

    cd "$SCRIPT_DIR"
    $PYTHON_CMD -m http.server 8000 > /dev/null 2>&1 &
    
    echo "Server Details:"
    echo "┌─────────────────────────────────────────┐"
    echo "│ URL: http://localhost:8000             │"
    echo "│ Admin: http://localhost:8000/admin.html│"
    echo "│ PID: $!"
    echo "│                                         │"
    echo "│ To stop: kill $!"
    echo "└─────────────────────────────────────────┘"
    echo ""
    
    # Open in browser
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open http://localhost:8000
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open http://localhost:8000 2>/dev/null || echo "Please open http://localhost:8000 in your browser"
    fi
}

function start_node() {
    echo ""
    echo "🚀 Starting Node.js HTTP Server..."
    echo ""

    # Check if http-server is installed
    if ! command -v http-server &> /dev/null; then
        echo "Installing http-server globally..."
        npm install -g http-server
    fi

    echo ""
    echo "Server Details:"
    echo "┌─────────────────────────────────────────┐"
    echo "│ URL: http://localhost:8080             │"
    echo "│ Admin: http://localhost:8080/admin.html│"
    echo "│ Press Ctrl+C to stop the server        │"
    echo "└─────────────────────────────────────────┘"
    echo ""

    cd "$SCRIPT_DIR"
    http-server -p 8080 -o
}
