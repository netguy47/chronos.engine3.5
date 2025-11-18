# Quick Fix - 'next' Command Not Found

## Problem
```
'next' is not recognized as an internal or external command
npm run dev fails
```

## Root Cause
- node_modules incomplete
- package-lock.json has old Tailwind 4.1.17 version
- npm install partially failed

## Solution (4 Steps)

### 1. Delete node_modules
```powershell
# In File Explorer: Right-click node_modules → Delete
# Or in PowerShell:
cd D:\Dev\chronos.engine3.5
Remove-Item -Recurse -Force node_modules
```

### 2. Delete package-lock.json
```powershell
# In File Explorer: Right-click package-lock.json → Delete
# Or in PowerShell:
Remove-Item -Force package-lock.json
```

### 3. Verify package.json
```powershell
# Check it says tailwindcss 3.4.1 (not 4.1.17)
Get-Content package.json | Select-String "tailwindcss"
```

Should show: `"tailwindcss": "^3.4.1"`

### 4. Fresh install
```powershell
npm install
```

Wait for completion (~2-5 min)

## Test

```powershell
npm run dev
```

Should show:
```
▲ Next.js 14.2.5
- Local: http://localhost:3000
✓ Ready in XXXms
```

## If Still Fails

Use npx directly (bypasses PATH):
```powershell
npx next dev
```

---

**Status:** Ready to fix
**Time:** 5 minutes
**Difficulty:** Easy
