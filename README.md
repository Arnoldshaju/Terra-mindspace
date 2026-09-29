# Terra Mindspace

A modern restaurant website built with TanStack Start, React, TypeScript, Tailwind CSS, and Vite. Order authentic Kerala and Malabar cuisine online for delivery or pickup in Chalakudy.

## About

TERRA Mindspace is a Kerala restaurant based in Chalakudy, Thrissur, serving traditional Malabar food — puttum beefum, dum biryani, kudampuli fish curry, and more. The website features online ordering, a full menu with filtering, a persistent shopping cart, and WhatsApp-based order confirmation.

## Features

- **Full menu browsing** — 18+ menu items across 6 categories (Kerala Combos, Biryani & Rice, Curries, Breads & Breakfast, Starters, Beverages & Sweets) with Veg/Non-veg filtering
- **Shopping cart** — Persistent cart using localStorage with add, remove, and quantity controls
- **Online checkout** — Delivery or pickup modes with name, phone, address, and kitchen notes fields
- **WhatsApp order sharing** — Confirmed orders sent via WhatsApp with itemized details
- **Order confirmation** — Unique order ID with itemized summary and ETA
- **Free delivery** — Free delivery on orders above ₹499, ₹30 delivery fee otherwise
- **About page** — Restaurant story, interior gallery, ratings, and stats
- **Contact & reservations** — Google Maps embed, phone/WhatsApp links, opening hours
- **SEO optimized** — Every page has unique meta tags, OG tags, Twitter cards, and Schema.org structured data
- **Dark theme** — Polished dark UI with TanStack Start and Tailwind CSS
- **Toast notifications** — Sonner-based feedback for form validation and order actions
- **Responsive design** — Fully responsive across mobile, tablet, and desktop
- **Fixed cart bar** — Persistent bottom cart summary on the menu page
- **Radix UI components** — Accessible dropdowns, dialogs, and form inputs
- **React Query** — Data fetching and caching via TanStack Query

## Tech Stack

- **TanStack Start** — Full-stack React framework with file-based routing
- **React** — UI library (v19)
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS** — Utility-first CSS framework
- **Vite** — Build tool and dev server
- **Nitro** — Deployment adapter for TERRA
- **@tanstack/react-query** — Server state management
- **@tanstack/react-router** — Type-safe routing
- **Radix UI** — Accessible component primitives
- **Lucide React** — Icon library
- **Sonner** — Toast notifications
- **React Hook Form + Zod** — Form handling and validation
- **Recharts** — Chart rendering
- **clsx + tailwind-merge** — Conditional class utilities
- **class-variance-authority** — Component variant management

## Project Structure

```
terra-mindspace/
├── public/                  # Static assets and favicons
├── src/
│   ├── assets/              # Images (hero, menu items, interior)
│   │   ├── dish-biryani.jpg
│   │   ├── dish-fishcurry.jpg
│   │   ├── dish-kappa-meen.jpg
│   │   ├── dish-puttum-beefum.jpg
│   │   ├── hero-puttu.jpg
│   │   ├── hero-restaurant-vibe.jpg
│   │   ├── hero-simple-vibe.jpg
│   │   └── interior.jpg
│   ├── components/          # Shared components
│   │   ├── CartSheet.tsx    # Slide-out cart panel
│   │   ├── MenuCard.tsx     # Individual menu item card
│   │   ├── SiteFooter.tsx   # Site footer
│   │   ├── SiteHeader.tsx   # Navigation header
│   │   └── ui/              # Radix UI primitives (button, input, etc.)
│   ├── hooks/               # Custom React hooks
│   ├── lib/
│   │   ├── cart.tsx         # Cart context (localStorage persistence)
│   │   ├── menu-data.ts     # Menu items and restaurant info
│   │   ├── utils.ts         # Utility functions
│   │   └── error-capture.ts # Error boundary utilities
│   ├── routes/              # File-based routes (TanStack Start)
│   │   ├── __root.tsx       # Root layout with cart provider, header, footer
│   │   ├── index.tsx        # Home page (hero, signatures, reviews, CTA)
│   │   ├── about.tsx        # About page (story, images, stats)
│   │   ├── menu.tsx         # Menu page with filtering and cart bar
│   │   ├── checkout.tsx     # Checkout form with delivery/pickup
│   │   └── contact.tsx      # Contact page with Google Maps
│   ├── styles.css           # Global styles and CSS variables
│   ├── router.tsx           # Router configuration
│   ├── routeTree.gen.ts     # Auto-generated route tree
│   └── server.ts            # Server entry point
├── components.json          # Radix UI configuration
├── eslint.config.js         # ESLint configuration
├── .prettierrc              # Prettier configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── bunfig.toml              # Bun package manager config
└── pnpm-lock.yaml           # pnpm lockfile
```

## Setup

### Prerequisites

- **Node.js** 20+ or **Bun** installed
- Package manager: **pnpm** (recommended) or **bun**

### Install dependencies

```bash
pnpm install
```

### Start the development server

```bash
pnpm dev
```

Open the app at:

```
http://localhost:3000
```

### Build for production

```bash
pnpm build
```

### Preview production build

```bash
pnpm preview
```

### Lint and format

```bash
pnpm lint
pnpm format
```

## Available Routes

| Route       | Page     | Description                                                             |
| ----------- | -------- | ----------------------------------------------------------------------- |
| `/`         | Home     | Hero section, signature dishes, features strip, reviews, CTA            |
| `/menu`     | Menu     | Browse menu with category filtering, Veg/Non-veg toggle, fixed cart bar |
| `/checkout` | Checkout | Delivery/pickup form, order summary, WhatsApp confirmation              |
| `/about`    | About    | Restaurant story, interior images, ratings, stats                       |
| `/contact`  | Contact  | Address, hours, phone, Google Maps embed, reservations                  |

## Cart System

The cart is managed via React Context (`CartProvider`) with localStorage persistence:

- **Add items** — Clicking "Add to cart" increments quantity for existing items
- **Remove items** — Removes item entirely from cart
- **Quantity update** — Adjust item quantities
- **Persist** — Cart state survives page refresh via `localStorage`
- **Delivery fee** — ₹30 flat fee, free above ₹499 subtotal
- **Pickup** — No delivery fee

## Restaurant Info

| Detail          | Value                                    |
| --------------- | ---------------------------------------- |
| **Name**        | TERRA Mindspace                          |
| **Cuisine**     | Kerala / Malabar / Indian                |
| **Location**    | Kottatt, Chalakudy, Kerala 680731, India |
| **Phone**       | 62380 46258                              |
| **WhatsApp**    | +91 62380 46258                          |
| **Hours**       | 11:30 am – 10:30 pm, every day           |
| **Rating**      | 4.2 across 83 Google reviews             |
| **Price Range** | ₹200–400 per person                      |

## SEO & Structured Data

Every page includes:

- Unique `<title>` and meta description
- Open Graph tags (`og:title`, `og:description`, `og:type`)
- Twitter Card tags
- **Schema.org JSON-LD** structured data on the homepage (`Restaurant` type with aggregate rating, address, price range)

## Deployment

The project uses **Nitro** as the deployment adapter, making it deployable to:

- Vercel
- Netlify
- Cloudflare Pages
- Node.js servers

## License

MIT
