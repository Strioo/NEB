# NEB Website

A modern, responsive website for NEB built with SolidJS, TypeScript, and TailwindCSS.

## Features

- 🚀 **Fast** - Built with SolidJS for optimal performance
- 📱 **Responsive** - Mobile-first design that works on all devices
- ♿ **Accessible** - Keyboard navigation and ARIA support
- 🎨 **Modern UI** - Clean MaterialMe-inspired design

## Pages

1. **Home** - Hero section, services preview, FAQ accordion
2. **Services** - Main service details, coming soon section
3. **Tutorial** - Tab-based step-by-step guides
4. **Contact** - Contact form with validation

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server will start at `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Accordion.tsx
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Container.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── SectionHeader.tsx
│   ├── Tabs.tsx
│   └── index.ts
├── data/                # Content data files
│   ├── faq.ts
│   ├── services.ts
│   └── tutorial.ts
├── pages/               # Page components
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── Tutorial.tsx
│   └── Contact.tsx
├── App.tsx              # Main app with routing
├── index.tsx            # Entry point
└── index.css            # Global styles

public/
└── assets/              # Static assets (images, etc.)
```

## Editing Content

### FAQ Items

Edit `src/data/faq.ts` to add or modify FAQ questions and answers.

### Services

Edit `src/data/services.ts` to update service information and benefits.

### Tutorial Steps

Edit `src/data/tutorial.ts` to modify tutorial tabs and steps.

## Adding Images

Place images in the `public/assets/` directory. Reference them in code as:

```typescript
// In tutorial.ts
image: "/assets/tutorial-install.png";
```

## Tech Stack

- [SolidJS](https://www.solidjs.com/) - Reactive UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [Vite](https://vitejs.dev/) - Build tool
- [@solidjs/router](https://github.com/solidjs/solid-router) - Client-side routing

## License

MIT
