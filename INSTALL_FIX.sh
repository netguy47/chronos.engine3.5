#!/bin/bash
# Windows batch-compatible cleanup script

echo "=== COMPLETE DEPENDENCY RESET ==="
echo.
echo "Step 1: Remove node_modules..."
rmdir /s /q node_modules 2>nul
echo "✓ node_modules removed"
echo.

echo "Step 2: Remove package-lock.json..."
del /f /q package-lock.json 2>nul
echo "✓ package-lock.json removed"
echo.

echo "Step 3: Remove npm cache..."
npm cache clean --force
echo "✓ npm cache cleaned"
echo.

echo "Step 4: Fresh install..."
npm install
echo "✓ Fresh install complete"
echo.

echo "Step 5: Verify installation..."
where npm
where node
npm -v
echo.

echo "=== RESET COMPLETE ==="
echo "Run: npm run dev"
