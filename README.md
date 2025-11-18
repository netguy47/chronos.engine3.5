# ⚡ Chronos Engine 3.5

> **Next-Generation Scenario Simulator & Cinematic Generator**

<div align="center">

[![Chronos Engine 3.5](https://img.shields.io/badge/Chronos%20Engine%203.5-Next%20Generation-blueviolet?style=for-the-badge)](https://github.com/yourusername/chronos-engine3.5)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Built With](https://img.shields.io/badge/Built%20With-Next.js%20%7C%20TypeScript%20%7C%20Supabase%20%7C%20Tailwind-10A595?style=for-the-badge)](https://nextjs.org)
[![Deploy Status](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

**Transform your ideas into interactive scenarios and cinematic experiences**

[🚀 Quick Start](#quick-start) • [📖 Documentation](#documentation) • [🎨 Features](#features) • [🤝 Contributing](#contributing)

</div>

---

## ✨ Features

### 🎬 Cinematic Generation
- AI-powered cinematic sequence generation
- Real-time camera control and framing
- Professional-grade effects and transitions
- Multi-layer composition system

### ⚙️ Advanced Simulation
- Physics-based scenario simulation
- AI-driven character interactions
- Complex environmental systems
- Real-time parameter adjustment

### 🎨 Content Creation
- Intuitive visual editor
- Drag-and-drop interface
- Template library
- Custom asset management

### 🔄 Real-time Collaboration
- Live project sharing
- Multi-user workspace
- Version control integration
- Automatic backup system

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** or **yarn**
- **Git** (for cloning)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/chronos-engine3.5.git
cd chronos-engine3.5

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Configure your .env.local with:
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### Development Server

```bash
# Start the development server
npm run dev

# Open in browser
# http://localhost:3000
```

The application will hot-reload on file changes.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start

# Type checking
npm run typecheck
```

---

## 📁 Project Structure

```
chronos-engine3.5/
├── app/
│   ├── globals.css          # Global styles & design system
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page component
│   ├── admin/               # Admin dashboard routes
│   ├── dashboard/           # Main dashboard routes
│   └── dashboard/_components/ # Dashboard sub-components
├── src/                     # Source utilities
├── public/                  # Static assets
├── .github/workflows/       # CI/CD pipeline
│   └── deploy.yml          # Vercel deployment config
├── env.d.ts                # Environment type definitions
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies & scripts
```

---

## 🛠 Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Next.js** | React framework | 14.2.5+ |
| **TypeScript** | Type safety | 5.4.5+ |
| **Tailwind CSS** | Utility-first styling | 4.1.17+ |
| **Supabase** | Backend & Auth | 2.45.1+ |
| **Framer Motion** | Animations | 12.23.24+ |
| **React Headless UI** | Accessible components | 2.2.9+ |

---

## 🎨 Design System

### Color Palette

```
Primary (Cyan):       #0ea5e9
Accent (Violet):      #a855f7
Success (Emerald):    #10b981
Warning (Amber):      #f59e0b
Danger (Red):         #ef4444

Background (Dark):    #0f172a
Surface:              #1e293b
Text Primary:         #f1f5f9
Text Secondary:       #cbd5e1
```

### Component Library

Chronos Engine includes pre-built premium components:

- **Cards**: `.card`, `.card-elevated`
- **Buttons**: `.btn-primary`, `.btn-secondary`, `.btn-accent`
- **Badges**: `.badge-cyan`, `.badge-violet`
- **Status Indicators**: `.status-active`
- **Effects**: Glassmorphism, glow effects, animations

### Custom Utilities

```html
<!-- Typography -->
<h1 class="text-hero">Hero Heading</h1>
<h2 class="text-section">Section Heading</h2>
<h3 class="text-subsection">Subsection</h3>

<!-- Backgrounds -->
<div class="bg-gradient-brand">Gradient Brand</div>
<div class="bg-gradient-cyan">Cyan Gradient</div>

<!-- Animations -->
<div class="animate-glow">Glowing Element</div>
<div class="animate-shimmer">Shimmer Effect</div>
<div class="animate-float">Float Animation</div>
```

---

## 📚 Documentation

### Configuration

#### Environment Variables

See `.env.example` for all available configuration options.

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Deployment (GitHub Actions Secrets)
VERCEL_TOKEN=your-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
```

#### TypeScript Configuration

All environment variables are strongly typed via `env.d.ts`. This provides:
- IDE autocomplete
- Type safety
- Development-time error checking
- Production validation

#### Tailwind Configuration

Tailwind v4 is configured with:
- Dark mode support
- NextUI component library
- Custom color extensions
- Responsive breakpoints

### API Routes

*(To be implemented)*

### Database Schema

*(To be implemented)*

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add GitHub Actions Secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

4. Automatic deployment on push to `main` branch

```bash
# Deploy manually
npm run build
npm run start
```

### Environment Variables in Production

All secrets are managed through GitHub Actions Secrets and Vercel environment variables. Never commit `.env.local` to version control.

---

## 🧪 Testing & Quality

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Build verification
npm run build
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Use TypeScript for all new code
- Follow the existing component structure
- Write meaningful commit messages
- Keep components focused and reusable
- Update documentation when needed

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙋 Support

- 📖 **Documentation**: [Read the docs](https://github.com/yourusername/chronos-engine3.5/wiki)
- 🐛 **Report Issues**: [GitHub Issues](https://github.com/yourusername/chronos-engine3.5/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/chronos-engine3.5/discussions)
- 📧 **Email**: support@chronos-engine.dev

---

## 🙏 Acknowledgments

Built with love using:
- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com)
- [Framer Motion](https://www.framer.com/motion)
- [Heroicons](https://heroicons.com)

---

<div align="center">

**[⬆ Back to Top](#chronos-engine-35)**

Made with ⚡ by the Chronos Team

</div>
