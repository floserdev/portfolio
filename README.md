<div align="center">

# floser.dev

**Modern Developer Portfolio**

A sleek, dark-themed developer portfolio with real-time Discord presence and Spotify integration — built with Next.js 16 and Tailwind CSS v4.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square&logo=typescript)](https://typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

[Live Demo](https://floser.dev) &bull; [Report Bug](https://github.com/floserdev/floser.dev/issues) &bull; [Request Feature](https://github.com/floserdev/floser.dev/issues)

</div>

---

## Features

- **Real-time Discord Status** — Shows current activity, status (online/idle/dnd/offline) and elapsed time via [Lantern API](https://lantern.rest)
- **Live Spotify Integration** — Displays currently playing track with album art, artist, and animated progress bar
- **Dark / Light Theme** — Smooth circular reveal transition using the View Transition API
- **Rainbow Avatar Glow** — Animated conic gradient border with synchronized drop-shadow
- **Fully Responsive** — Clean layout from mobile to desktop
- **Modular Architecture** — Atomic component structure for easy customization
- **Optimized Performance** — Next.js Image optimization, Google Fonts via `next/font`, static generation

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) (Oxide Engine) |
| Font | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via `next/font` |
| API | [Lantern REST API](https://lantern.rest/) |
| Deployment | [Vercel](https://vercel.com/) |

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind v4 @theme, animations, dark/light mode
│   ├── layout.tsx           # Root layout with font configuration
│   └── page.tsx             # Home page composing all sections
├── components/
│   ├── Navbar.tsx            # Navigation with avatar, socials, theme toggle
│   ├── Hero.tsx              # Profile intro section
│   ├── StatusCards.tsx       # Discord & Spotify real-time cards
│   ├── Projects.tsx          # Project showcase grid
│   ├── Technologies.tsx      # Tech stack grid
│   ├── Contact.tsx           # Contact links with gradient borders
│   ├── Footer.tsx            # Footer
│   ├── ThemeToggle.tsx       # Dark/light mode with view transitions
│   └── icons/
│       └── SocialIcons.tsx   # SVG icon components
├── lib/
│   ├── siteConfig.ts         # All site content and configuration
│   └── lantern.ts            # Lantern API client and types
└── public/
    └── *.png                 # Avatar and technology icons
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.17 or later
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

### Installation

```bash
# Clone the repository
git clone https://github.com/floserdev/floser.dev.git
cd floser.dev

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Build

```bash
npm run build
npm start
```

## Customization

### Site Content

All site content is centralized in **`lib/siteConfig.ts`**. Edit this single file to change:

- Profile name, title, bio
- Social links
- Projects
- Technologies
- Contact information
- Footer text

### Discord Integration

The Discord and Spotify cards pull real-time data from the [Lantern API](https://lantern.rest). To use your own Discord account:

1. Open **`lib/lantern.ts`**
2. Replace the `DISCORD_USER_ID` with your own Discord user ID
3. Make sure your account is being monitored on [lantern.rest](https://lantern.rest)

```ts
export const DISCORD_USER_ID = "YOUR_DISCORD_USER_ID";
```

### Theming

All custom colors, animations, and theme variables are defined in **`app/globals.css`** using Tailwind v4's `@theme` block. No `tailwind.config.js` needed.

## Deployment

The easiest way to deploy is with [Vercel](https://vercel.com/):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/floserdev/floser.dev)

Or deploy anywhere that supports Next.js:

```bash
npm run build
```

The output will be in the `.next` directory.

## Versioning

This project uses [Semantic Versioning](https://semver.org/):

```
MAJOR.MINOR.PATCH
```

- **MAJOR** — Breaking changes or complete redesigns
- **MINOR** — New features or sections added
- **PATCH** — Bug fixes and small tweaks

Current version: **v1.0.0**

To update the version:

```bash
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the project
2. Create your branch (`git checkout -b feature/cool-feature`)
3. Commit your changes (`git commit -m "feat: add cool feature"`)
4. Push to the branch (`git push origin feature/cool-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

---

<div align="center">
  <sub>Built with care by <a href="https://github.com/floserdev">Floser</a></sub>
</div>
