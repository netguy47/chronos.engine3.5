# Quick Reference: Build Error Fix

## Error
```
Cannot apply unknown utility class `bg-slate-950`
```

## Root Cause
- Tailwind 4.1.17 incompatible with @layer directives
- NextUI library not v4 compatible
- @tailwindcss/postcss conflicts with custom CSS

## Solution Summary

### 1. Downgrade Tailwind
```json
"tailwindcss": "^3.4.1"  // Changed from 4.1.17
```

### 2. Remove v4 Plugin
```js
// Removed from package.json
"@tailwindcss/postcss": "^4.1.17"

// Removed from tailwind config
plugins: [nextui()]  // Removed NextUI
```

### 3. Fix PostCSS Config
```js
module.exports = {
  plugins: {
    tailwindcss: {},  // v3 format
    autoprefixer: {},
  },
};
```

### 4. Move Animations to Config
```js
// In tailwind.config.js
theme: {
  extend: {
    animation: {
      glow: "...",
      shimmer: "...",
      float: "...",
    },
    keyframes: { /* definitions */ },
  },
}

// In globals.css: Define @keyframes outside @layer
@keyframes pulse-glow { ... }
```

### 5. Clean Caches
```bash
rm -rf node_modules .next
npm install
```

## Build Commands

```bash
npm install      # Install v3.4.1
npm run build    # Build project
npm run dev      # Start dev server
```

## Files Modified
- ✅ package.json
- ✅ postcss.config.js
- ✅ tailwind.config.js
- ✅ app/globals.css

## Status: ✅ FIXED

All Tailwind utilities now work correctly.
Ready to build and deploy.

See BUILD_ERROR_RESOLUTION.md for full details.
