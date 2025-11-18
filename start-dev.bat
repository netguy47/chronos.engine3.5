@echo off
REM Chronos Engine 3.5 - Development Server Startup Script
REM This script properly sets up the environment and starts the dev server

echo.
echo ================================
echo Chronos Engine 3.5 - Dev Server
echo ================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Set IPv4 binding to fix localhost connection issues
set HOST=127.0.0.1
set NODE_ENV=development

echo Starting development server on http://127.0.0.1:3000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the dev server
call npm run dev

pause
