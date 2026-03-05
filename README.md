# SU-30MKI — Cinematic Aircraft Website

A production-ready cinematic website for the **Sukhoi Su-30MKI** fighter aircraft, built with Vite + React + TypeScript. Features a scroll-driven 84-frame canvas animation in the hero section, military HUD aesthetics, and a full multi-page layout.

**Live:** [Deployed on Vercel](https://vercel.com)

## Features

- **Scroll-driven canvas animation** — 84 JPEG frames play sequentially as the user scrolls through the pinned hero section (GSAP ScrollTrigger, 4 000 px travel)
- **Military HUD UI** — Orbitron display font, scanlines, corner brackets, red accent lines, animated pulse indicators
- **Core Capabilities section** — 6 expandable data cards (BVR, Radar, TVC, Range, Maneuverability, Strike) with inline SVG radar-ring animations — no images
- **Aircraft Specifications** — animated counters that trigger on scroll into view
- **History timeline** — 6 key milestones from 1977 to 2024
- **Multi-page routing** — Home, Specifications, History, Contact (React Router v6, lazy-loaded)
- **Smooth scrolling** — Lenis scroll library integrated via manual RAF loop
- **Vercel-ready** — zero-config deployment with automatic SPA routing

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 19 + TypeScript (Vite 7, SWC) |
| Styling | Tailwind CSS v3 (custom aviation theme) |
| Scroll animation | GSAP ScrollTrigger |
| UI animation | Framer Motion |
| Smooth scroll | Lenis |
| Routing | React Router DOM v6 |
| Hosting | Vercel |

## Project Structure

```
src/
├── components/
│   ├── HeroCanvas.tsx          # Pinned scroll canvas animation
│   ├── AircraftSpecs.tsx       # Animated counter specs
│   ├── InteractiveGallery.tsx  # Core Capabilities cards
│   ├── HistorySection.tsx      # Timeline
│   ├── Header.tsx              # Fixed HUD navbar
│   └── Footer.tsx
├── hooks/
│   └── useCanvasSequence.ts    # Canvas preload + drawFrame engine
├── pages/
│   ├── Home.tsx
│   ├── Specifications.tsx
│   ├── History.tsx
│   └── Contact.tsx
public/
└── frames/
    ├── frame-0001.jpg          # 84 animation frames
    └── frame-0084.jpg
```

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # Production build -> dist/
```

## Frame Sequence

The hero animation requires 84 JPEG frames placed at `public/frames/frame-0001.jpg` through `public/frames/frame-0084.jpg`. All frames are preloaded before the hero is shown, with a progress bar displayed during loading.

## Deployment

Deployed on **Vercel**. To deploy your own instance:

1. Push the repo to GitHub
2. Import the project in [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — no extra configuration needed
4. Set the output directory to `dist` if prompted

SPA client-side routing is handled automatically by Vercel.
