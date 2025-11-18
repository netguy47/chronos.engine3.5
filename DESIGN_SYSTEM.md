# 🎨 Chronos Engine Design System

## Overview

Chronos Engine 3.5 uses a modern, sci-fi inspired dark theme with cyan and violet accents. The design system is built on Tailwind CSS v4 with custom components and animations.

## Design Tokens

### Color System

**Primary Colors**
```
Cyan:       #0ea5e9 (Sky 500) - Primary action
Violet:     #a855f7 (Violet 600) - Accent highlight
```

**Semantic Colors**
```
Success:    #10b981 (Emerald 600) - Positive states
Warning:    #f59e0b (Amber 500) - Caution states
Danger:     #ef4444 (Red 500) - Error states
```

**Neutral Palette**
```
Slate 950:  #020817 - Darkest background
Slate 900:  #0f172a - Primary background
Slate 800:  #1e293b - Secondary surface
Slate 700:  #334155 - Tertiary surface
Slate 300:  #cbd5e1 - Secondary text
Slate 100:  #f1f5f9 - Primary text
Slate 50:   #f8fafc - Lightest surface
```

### Typography Hierarchy

**Typography Scales**

```
.text-hero         # 48-60px | Main page titles
.text-section      # 30-36px | Section headers
.text-subsection   # 20-24px | Subsection headers
.text-lg           # 18px    | Body large
.text-base         # 16px    | Body regular (default)
.text-sm           # 14px    | Body small
.text-xs           # 12px    | Metadata
```

**Font Families**

```
Headings: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif (Bold: 700)
Body:     -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif (Regular: 400)
Code:     ui-monospace, SFMono-Regular, "SF Mono", monospace
```

## Component Library

### Cards

**Standard Card**
```html
<div class="card">
  <!-- Content -->
</div>
```

Features:
- `rounded-xl` border radius
- `bg-slate-900` background
- `border border-slate-800` styling
- Hover state: Border lightens, background darkens slightly

**Elevated Card**
```html
<div class="card-elevated">
  <!-- Content with shadow -->
</div>
```

Adds: `shadow-lg shadow-cyan-500/10` for depth

### Buttons

**Primary Button (CTA)**
```html
<button class="btn-primary">Action</button>
```

**Secondary Button (Alternative)**
```html
<button class="btn-secondary">Action</button>
```

**Accent Button (Special)**
```html
<button class="btn-accent">Action</button>
```

States:
- Default
- Hover (brightened)
- Active (darkened)
- Disabled (opacity: 50%)

### Badges

**Cyan Badge**
```html
<span class="badge-cyan">New</span>
```

**Violet Badge**
```html
<span class="badge-violet">Featured</span>
```

Features:
- Semi-transparent background
- Matching text and border colors
- Inline-flex layout
- Responsive padding

### Status Indicators

**Active Status**
```html
<div class="status-active">System Active</div>
```

Features:
- Emerald green color
- Animated pulse indicator
- Always-visible indicator dot

## Effects & Animations

### Glassmorphism

```html
<div class="glass">
  <!-- Frosted glass effect -->
</div>
```

Effects:
- Backdrop blur
- Semi-transparent white background
- Subtle border

### Glow Effects

```html
<div class="glow-cyan">Cyan glow</div>
<div class="glow-violet">Violet glow</div>
```

Creates shadow halos:
- Cyan: `shadow-lg shadow-cyan-500/20`
- Violet: `shadow-lg shadow-violet-500/20`

### Custom Animations

**Pulse Glow** (breathing effect)
```html
<div class="animate-glow">Glowing content</div>
```

Duration: 2 seconds, easing: cubic-bezier(0.4, 0, 0.6, 1)

**Shimmer** (sweep effect)
```html
<div class="animate-shimmer">Shimmer text</div>
```

Duration: 2 seconds, infinite loop

**Float** (levitation)
```html
<div class="animate-float">Floating element</div>
```

Duration: 3 seconds, oscillation: ±10px vertical

## Gradients

**Brand Gradient** (Primary)
```html
<div class="bg-gradient-brand">Cyan to Violet</div>
```

Direction: `to-br` (bottom-right)
Colors: `from-cyan-600 via-violet-600 to-cyan-600`

**Cyan Gradient**
```html
<div class="bg-gradient-cyan">Cyan accent</div>
```

Direction: `to-r` (right)
Colors: `from-cyan-600 to-cyan-400`

**Violet Gradient**
```html
<div class="bg-gradient-violet">Violet accent</div>
```

Direction: `to-r` (right)
Colors: `from-violet-600 to-violet-400`

## Responsive Design

Tailwind breakpoints:
```
sm:  640px  (Small screens)
md:  768px  (Tablets)
lg:  1024px (Desktops)
xl:  1280px (Large desktops)
2xl: 1536px (Extra large)
```

Example:
```html
<h1 class="text-4xl md:text-5xl lg:text-6xl">
  Responsive heading
</h1>
```

## Dark Mode

All components automatically support dark mode via:
- Root element: `<html lang="en" class="dark">`
- `suppressHydrationWarning` prevents mismatches
- Tailwind CSS `dark:` variant support

No additional configuration needed for components.

## Spacing System

Based on 4px grid:

```
0    = 0
1    = 4px
2    = 8px
3    = 12px
4    = 16px
6    = 24px
8    = 32px
12   = 48px
16   = 64px
20   = 80px
24   = 96px
```

Usage: `p-4` (padding), `m-8` (margin), `gap-6` (gap)

## Usage Examples

### Feature Card

```html
<div class="card">
  <div class="text-4xl mb-4">🚀</div>
  <h3 class="text-lg font-semibold text-slate-100 mb-2">
    Feature Title
  </h3>
  <p class="text-slate-400 text-sm">
    Description of the feature
  </p>
</div>
```

### CTA Section

```html
<div class="bg-gradient-brand p-12 rounded-xl">
  <h2 class="text-section text-white mb-4">Call to Action</h2>
  <p class="text-slate-200 mb-6">Compelling copy</p>
  <button class="btn-primary">Get Started</button>
</div>
```

### Status Card

```html
<div class="card-elevated border-cyan-500/30">
  <div class="flex items-start gap-4">
    <SparklesIcon class="w-6 h-6 text-cyan-400 flex-shrink-0" />
    <div>
      <h3 class="text-subsection mb-2 text-cyan-300">Status</h3>
      <p class="text-slate-400">Descriptive text</p>
    </div>
  </div>
</div>
```

## Accessibility Considerations

- Color contrast ratios exceed WCAG AA standards
- All interactive elements are keyboard accessible
- Semantic HTML structure
- ARIA labels on interactive components
- Focus states visible on all buttons and links

## Performance Optimizations

- Tailwind CSS purges unused styles
- CSS variables for theme switching
- Optimized animations (GPU acceleration)
- Minimal DOM complexity
- Lazy loading for images

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

- Light mode variant
- Custom theme configurator
- Additional animation library
- Component storybook
- Design tokens export
