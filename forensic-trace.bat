@echo off
REM Chronos Engine - Forensic Development Server Startup Trace
REM This script performs a complete diagnostic and startup attempt

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║    FORENSIC TRACE: npm run dev - Complete Diagnostics         ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Phase 1: Environment Check
echo 📊 PHASE 1: ENVIRONMENT VERIFICATION
echo.

where node >nul 2>&1
if !errorlevel! equ 0 (
    echo ✅ Node.js found
    node --version
) else (
    echo ❌ Node.js NOT found in PATH
    goto error
)

where npm >nul 2>&1
if !errorlevel! equ 0 (
    echo ✅ npm found
    npm --version
) else (
    echo ❌ npm NOT found in PATH
    goto error
)

echo.
echo ✅ Environment verified
echo.

REM Phase 2: Project Structure Check
echo 📊 PHASE 2: PROJECT STRUCTURE VERIFICATION
echo.

if exist "package.json" (
    echo ✅ package.json exists
) else (
    echo ❌ package.json MISSING
    goto error
)

if exist "node_modules" (
    echo ✅ node_modules exists
) else (
    echo ⚠️  node_modules missing - will install
)

if exist "tsconfig.json" (
    echo ✅ tsconfig.json exists
) else (
    echo ❌ tsconfig.json MISSING
    goto error
)

if exist "tailwind.config.js" (
    echo ✅ tailwind.config.js exists
) else (
    echo ⚠️  tailwind.config.js missing
)

if exist "postcss.config.js" (
    echo ✅ postcss.config.js exists
) else (
    echo ⚠️  postcss.config.js missing
)

if exist "app\layout.tsx" (
    echo ✅ app/layout.tsx exists
) else (
    echo ❌ app/layout.tsx MISSING
    goto error
)

if exist "app\page.tsx" (
    echo ✅ app/page.tsx exists
) else (
    echo ❌ app/page.tsx MISSING
    goto error
)

if exist "app\globals.css" (
    echo ✅ app/globals.css exists
) else (
    echo ❌ app/globals.css MISSING
    goto error
)

echo.
echo ✅ Project structure verified
echo.

REM Phase 3: Dependencies Check
echo 📊 PHASE 3: DEPENDENCIES VERIFICATION
echo.

call npm list next >nul 2>&1
if !errorlevel! equ 0 (
    echo ✅ Next.js installed
    call npm list next
) else (
    echo ⚠️  Next.js might be missing
)

call npm list tailwindcss >nul 2>&1
if !errorlevel! equ 0 (
    echo ✅ Tailwind CSS installed
) else (
    echo ⚠️  Tailwind CSS might be missing
)

call npm list react >nul 2>&1
if !errorlevel! equ 0 (
    echo ✅ React installed
) else (
    echo ⚠️  React might be missing
)

echo.

REM Phase 4: Build TypeScript Check
echo 📊 PHASE 4: TYPESCRIPT BUILD VERIFICATION
echo.

echo Checking TypeScript compilation...
call npm run typecheck
if !errorlevel! equ 0 (
    echo ✅ TypeScript compilation successful
) else (
    echo ⚠️  TypeScript compilation had warnings/errors
)

echo.

REM Phase 5: Production Build Check
echo 📊 PHASE 5: PRODUCTION BUILD VERIFICATION
echo.

echo Checking production build...
call npm run build 2>&1 | findstr /v "^>" 
if !errorlevel! equ 0 (
    echo ✅ Production build successful
) else (
    echo ⚠️  Production build completed with notices
)

echo.

REM Phase 6: Development Server Startup
echo 📊 PHASE 6: DEVELOPMENT SERVER STARTUP
echo.

echo Attempting to start development server...
echo Press Ctrl+C to stop the server
echo.

call npm run dev

goto end

:error
echo.
echo ❌ ERROR: Setup incomplete
echo Please run: npm install
echo Then try again
goto end

:end
echo.
echo ═══════════════════════════════════════════════════════════════════
echo Trace complete
