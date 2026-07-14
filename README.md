# ToolHub - Premium Checker Tools Marketplace

A Next.js 15 e-commerce site for selling checker tools with crypto-only payments.

## Features

- **Product Catalog** - Checkers, Proxies, APIs, Bypasses
- **Crypto Payments** - BTC, ETH, USDT (ERC-20/TRC-20), LTC
- **Admin Panel** - Manage products, orders, wallet addresses
- **Real-time Sync** - Changes reflect in ~1 second
- **Zero Dependencies** - LocalStorage only, no database needed

## Tech Stack

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Lucide React Icons
- LocalStorage for persistence

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build
npm run start
```

## Deploy

**Vercel (recommended):**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm run build
# Deploy the 'out' folder
```

## Admin Panel

Visit `/admin` → Password: `admin123`

Tabs:
- **Dashboard** - Stats overview
- **Products** - CRUD with images, prices, download URLs
- **Orders** - View all orders (completed/pending/refunded)
- **Payments** - Configure crypto wallet addresses
- **Upload** - Link download files

## Project Structure

```
app/
├── page.tsx          # Homepage
├── shop/page.tsx     # All tools with search/filter
├── admin/page.tsx    # Admin panel
├── layout.tsx        # Root layout
└── globals.css       # Tailwind imports
components/
├── Header.tsx        # Navigation + cart
├── Hero.tsx          # Landing hero
├── ProductCard.tsx   # Product + crypto payment modal
├── Footer.tsx
└── CartDrawer.tsx
lib/
├── data.ts           # Product types + getProducts()
├── cart-context.tsx  # Cart state (legacy)
└── crypto-context.tsx
```

## License

MIT