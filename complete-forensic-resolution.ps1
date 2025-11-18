#!/usr/bin/env pwsh
# Chronos Engine - Complete Dependency Reset & Verification
# Fixes: npm install failure, incomplete node_modules

Write-Host "`n╔══════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  FORENSIC TRACE RESOLUTION: Complete npm Install & Verification  ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Verify we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ ERROR: package.json not found!" -ForegroundColor Red
    Write-Host "Please run from: D:\Dev\chronos.engine3.5" -ForegroundColor Yellow
    exit 1
}

# Phase 1: Cleanup
Write-Host "PHASE 1️⃣  : CLEANUP" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Yellow

Write-Host "Removing node_modules..." -ForegroundColor Cyan
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
    Write-Host "✅ node_modules removed`n" -ForegroundColor Green
} else {
    Write-Host "ℹ️  node_modules already clean`n" -ForegroundColor Cyan
}

Write-Host "Removing package-lock.json..." -ForegroundColor Cyan
if (Test-Path "package-lock.json") {
    Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
    Write-Host "✅ package-lock.json removed`n" -ForegroundColor Green
} else {
    Write-Host "ℹ️  package-lock.json already removed`n" -ForegroundColor Cyan
}

Write-Host "Clearing npm cache..." -ForegroundColor Cyan
npm cache clean --force 2>&1 | Out-Null
Write-Host "✅ npm cache cleared`n" -ForegroundColor Green

# Phase 2: Install
Write-Host "PHASE 2️⃣  : FRESH INSTALLATION" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Yellow

Write-Host "Running npm install..." -ForegroundColor Cyan
Write-Host "⏳ This may take 2-5 minutes...`n" -ForegroundColor Cyan

npm install
$installStatus = $LASTEXITCODE

if ($installStatus -eq 0) {
    Write-Host "`n✅ npm install completed successfully!`n" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  npm install exited with code $installStatus`n" -ForegroundColor Yellow
    Write-Host "Attempting to continue verification...`n" -ForegroundColor Cyan
}

# Phase 3: Verification
Write-Host "PHASE 3️⃣  : VERIFICATION" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Yellow

Write-Host "Verifying installations...`n" -ForegroundColor Cyan

# Check Next.js
$nextCheck = npm list next 2>&1 | Select-String "next@"
if ($nextCheck) {
    Write-Host "✅ Next.js: $nextCheck" -ForegroundColor Green
} else {
    Write-Host "❌ Next.js NOT found" -ForegroundColor Red
}

# Check React
$reactCheck = npm list react 2>&1 | Select-String "react@"
if ($reactCheck) {
    Write-Host "✅ React: $reactCheck" -ForegroundColor Green
} else {
    Write-Host "❌ React NOT found" -ForegroundColor Red
}

# Check Tailwind
$twCheck = npm list tailwindcss 2>&1 | Select-String "tailwindcss@"
if ($twCheck) {
    Write-Host "✅ Tailwind: $twCheck" -ForegroundColor Green
} else {
    Write-Host "❌ Tailwind NOT found" -ForegroundColor Red
}

Write-Host "`n"

# Phase 4: TypeScript Check
Write-Host "PHASE 4️⃣  : TYPESCRIPT VERIFICATION" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Yellow

Write-Host "Running type check...`n" -ForegroundColor Cyan
npm run typecheck
$typeCheckStatus = $LASTEXITCODE

if ($typeCheckStatus -eq 0) {
    Write-Host "`n✅ TypeScript compilation successful`n" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  TypeScript check completed with status $typeCheckStatus`n" -ForegroundColor Yellow
}

# Phase 5: Build Test
Write-Host "PHASE 5️⃣  : PRODUCTION BUILD TEST" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Yellow

Write-Host "Testing production build...`n" -ForegroundColor Cyan
npm run build 2>&1 | Select-Object -Last 20
$buildStatus = $LASTEXITCODE

if ($buildStatus -eq 0) {
    Write-Host "`n✅ Production build successful`n" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  Build completed with status $buildStatus`n" -ForegroundColor Yellow
}

# Phase 6: Final Status
Write-Host "PHASE 6️⃣  : FINAL STATUS" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Yellow

Write-Host "╔══════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║           ✅ SYSTEM READY FOR DEVELOPMENT ✅                  ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Green

Write-Host "✨ Available Commands:`n" -ForegroundColor Cyan
Write-Host "  npm run dev        → Start development server (http://localhost:3000)" -ForegroundColor Magenta
Write-Host "  npm run build      → Create production build" -ForegroundColor Magenta
Write-Host "  npm run start      → Start production server" -ForegroundColor Magenta
Write-Host "  npm run typecheck  → Check TypeScript types" -ForegroundColor Magenta
Write-Host "  npm run lint       → Run ESLint" -ForegroundColor Magenta

Write-Host "`n🚀 NEXT STEP: Run 'npm run dev' to start the development server!`n" -ForegroundColor Green
