@echo off
REM ============ Blinkit Chatbot - Local Server Launcher ============
REM This script starts a local HTTP server to run the chatbot

cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║     Blinkit Customer Support Chatbot - Local Server       ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Get the directory where this batch file is located
set SCRIPT_DIR=%~dp0

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo.
    echo Please install Python from https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation
    echo.
    pause
    exit /b 1
)

echo ✓ Python detected
echo.

REM Check if Node.js is installed (alternative to Python)
node --version >nul 2>&1
if not errorlevel 1 (
    echo ✓ Node.js detected
    echo.
)

echo Available options:
echo.
echo [1] Start with Python (Recommended)
echo [2] Start with Node.js
echo [3] Open in Browser Only
echo [0] Exit
echo.

set /p choice="Select option (0-3): "

if "%choice%"=="1" goto python_start
if "%choice%"=="2" goto node_start
if "%choice%"=="3" goto browser_only
if "%choice%"=="0" goto end
goto invalid_choice

:python_start
echo.
echo 🚀 Starting Python HTTP Server...
echo.
echo Server Details:
echo ┌─────────────────────────────────────────┐
echo │ URL: http://localhost:8000             │
echo │ Admin: http://localhost:8000/admin.html│
echo │ Press Ctrl+C to stop the server        │
echo └─────────────────────────────────────────┘
echo.

cd /d "%SCRIPT_DIR%"
python -m http.server 8000
goto end

:node_start
echo.
echo 🚀 Starting Node.js HTTP Server...
echo.

REM Check if http-server is installed
npm list -g http-server >nul 2>&1
if errorlevel 1 (
    echo Installing http-server globally...
    npm install -g http-server
)

echo.
echo Server Details:
echo ┌─────────────────────────────────────────┐
echo │ URL: http://localhost:8080             │
echo │ Admin: http://localhost:8080/admin.html│
echo │ Press Ctrl+C to stop the server        │
echo └─────────────────────────────────────────┘
echo.

cd /d "%SCRIPT_DIR%"
http-server -p 8080 -o
goto end

:browser_only
echo.
echo 🌐 Opening chatbot in browser...
echo.
echo Note: You need a server running to use all features
echo.

REM Try to open with default browser
start "" "%SCRIPT_DIR%index.html"
echo ✓ Browser opened (file:// protocol - some features may be limited)
echo.
timeout /t 3
goto end

:invalid_choice
echo.
echo ❌ Invalid choice. Please select 0-3.
echo.
timeout /t 2
cls
goto python_start

:end
echo.
echo Goodbye! 👋
echo.
pause
