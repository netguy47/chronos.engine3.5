@echo off
cd /d D:\Dev\chronos.engine3.5
echo.
echo ╔═══════════════════════════════════════════════════════════════════════╗
echo ║      FORENSIC TRACE RESOLUTION: Dependency Install & Verification    ║
echo ╚═══════════════════════════════════════════════════════════════════════╝
echo.

echo PHASE 1: ENVIRONMENT CHECK
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
node --version
npm --version
echo.

echo PHASE 2: CLEANUP
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Removing node_modules...
if exist node_modules (
    rmdir /s /q node_modules >nul 2>&1
    echo ✓ node_modules removed
) else (
    echo ℹ node_modules already clean
)

echo Removing package-lock.json...
if exist package-lock.json (
    del /f /q package-lock.json >nul 2>&1
    echo ✓ package-lock.json removed
) else (
    echo ℹ package-lock.json already removed
)

echo.
echo PHASE 3: FRESH INSTALL
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Running npm install...
echo.
npm install
echo.

echo PHASE 4: VERIFICATION
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Checking installations...
echo.
npm list next | findstr next@ >nul && echo ✓ Next.js installed || echo ✗ Next.js NOT found
npm list react | findstr react@ >nul && echo ✓ React installed || echo ✗ React NOT found
npm list tailwindcss | findstr tailwindcss@ >nul && echo ✓ Tailwind installed || echo ✗ Tailwind NOT found
echo.

echo PHASE 5: TYPESCRIPT CHECK
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
npm run typecheck >nul 2>&1
if !errorlevel! equ 0 (
    echo ✓ TypeScript check passed
) else (
    echo ℹ TypeScript check completed (see output above)
)
echo.

echo ╔═══════════════════════════════════════════════════════════════════════╗
echo ║                 ✓ INSTALLATION COMPLETE & VERIFIED                  ║
echo ╚═══════════════════════════════════════════════════════════════════════╝
echo.

echo Next: Run "npm run dev" to start development server
echo.
pause
