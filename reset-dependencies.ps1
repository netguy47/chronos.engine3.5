#!/usr/bin/env pwsh
# Chronos Engine - Dependency Reset Script
# Fixes: 'next' is not recognized error

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║      🔧 CHRONOS ENGINE - DEPENDENCY RESET SCRIPT 🔧     ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ ERROR: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from: D:\Dev\chronos.engine3.5" -ForegroundColor Yellow
    exit 1
}

# Step 1: Remove node_modules
Write-Host "Step 1️⃣  Removing node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    try {
        Remove-Item -Recurse -Force node_modules -ErrorAction Stop
        Write-Host "✅ node_modules removed" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Could not remove node_modules: $_" -ForegroundColor Yellow
        Write-Host "   Please close any applications accessing it and try again" -ForegroundColor Yellow
    }
} else {
    Write-Host "ℹ️  node_modules already removed" -ForegroundColor Cyan
}

# Step 2: Remove package-lock.json
Write-Host "`nStep 2️⃣  Removing package-lock.json..." -ForegroundColor Yellow
if (Test-Path "package-lock.json") {
    try {
        Remove-Item -Force package-lock.json -ErrorAction Stop
        Write-Host "✅ package-lock.json removed" -ForegroundColor Green
    } catch {
        Write-Host "❌ Could not remove package-lock.json: $_" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "ℹ️  package-lock.json already removed" -ForegroundColor Cyan
}

# Step 3: Verify package.json
Write-Host "`nStep 3️⃣  Verifying package.json..." -ForegroundColor Yellow
$packageContent = Get-Content package.json | ConvertFrom-Json
$tailwindVersion = $packageContent.dependencies.tailwindcss

Write-Host "   Tailwind version in package.json: $tailwindVersion" -ForegroundColor Cyan

if ($tailwindVersion -match "3\.4\.1") {
    Write-Host "✅ Correct: Tailwind 3.4.1 specified" -ForegroundColor Green
} elseif ($tailwindVersion -match "4\.") {
    Write-Host "⚠️  WARNING: Still Tailwind 4.x - this may cause issues" -ForegroundColor Yellow
    Write-Host "   To fix: Edit package.json and change tailwindcss to ^3.4.1" -ForegroundColor Yellow
} else {
    Write-Host "   Version: $tailwindVersion" -ForegroundColor Cyan
}

# Step 4: Clear npm cache
Write-Host "`nStep 4️⃣  Clearing npm cache..." -ForegroundColor Yellow
try {
    $cacheResult = npm cache clean --force 2>&1
    Write-Host "✅ npm cache cleared" -ForegroundColor Green
} catch {
    Write-Host "⚠️  npm cache clear failed (non-critical)" -ForegroundColor Yellow
}

# Step 5: Fresh npm install
Write-Host "`nStep 5️⃣  Running npm install..." -ForegroundColor Yellow
Write-Host "   ⏳ This may take 2-5 minutes..." -ForegroundColor Cyan

try {
    npm install
    $installStatus = $LASTEXITCODE
    
    if ($installStatus -eq 0) {
        Write-Host "`n✅ npm install completed successfully!" -ForegroundColor Green
    } else {
        Write-Host "`n⚠️  npm install exited with status $installStatus" -ForegroundColor Yellow
    }
} catch {
    Write-Host "`n❌ npm install failed: $_" -ForegroundColor Red
    Write-Host "`n💡 Troubleshooting:" -ForegroundColor Yellow
    Write-Host "   1. Check internet connection" -ForegroundColor Cyan
    Write-Host "   2. Run: npm cache clean --force" -ForegroundColor Cyan
    Write-Host "   3. Try again: npm install" -ForegroundColor Cyan
    exit 1
}

# Step 6: Verification
Write-Host "`nStep 6️⃣  Verifying installation..." -ForegroundColor Yellow

# Check if next is installed
$nextPackage = npm list next 2>$null | Select-String "next@"
if ($nextPackage) {
    Write-Host "✅ Next.js installed: $nextPackage" -ForegroundColor Green
} else {
    Write-Host "❌ Next.js not found in installation" -ForegroundColor Red
}

# Check if tailwindcss is installed
$tailwindPackage = npm list tailwindcss 2>$null | Select-String "tailwindcss@"
if ($tailwindPackage) {
    Write-Host "✅ Tailwind CSS installed: $tailwindPackage" -ForegroundColor Green
} else {
    Write-Host "❌ Tailwind CSS not found in installation" -ForegroundColor Red
}

# Final status
Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║               ✅ RESET COMPLETE & READY 🚀               ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝`n" -ForegroundColor Green

Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Run development server: npm run dev" -ForegroundColor Cyan
Write-Host "  2. Open: http://localhost:3000" -ForegroundColor Cyan
Write-Host "  3. Start developing!" -ForegroundColor Cyan

Write-Host "`n"
