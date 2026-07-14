# Contributing Guide

Thank you for contributing to ToolHub!

## Development Setup

```bash
# Clone & install
git clone <repo-url>
cd WEBSITE
npm install

# Start dev server
npm run dev
```

## Code Style

- TypeScript strict mode
- Tailwind CSS for styling
- Lucide React for icons
- Functional components with hooks

## Pull Request Process

1. Fork the repo
2. Create feature branch: `git checkout -b feature/name`
3. Make changes with clear commits
4. Run build: `npm run build`
5. Open PR with description

## Adding Products

Use the Admin Panel (`/admin`) → Products tab → "Add Product"

Fields:
- **Name** - Display name
- **Description** - Feature list
- **Price** - USD amount
- **Category** - Checkers / Proxies / APIs / Bypasses
- **Image URL** - Optional product image
- **Download URL** - Direct file link
- **Version / File Size** - Metadata
- **Featured** - Shows on homepage

## Crypto Payments

Configure wallet addresses in Admin → Payments tab.
Supported: BTC, ETH, USDT (ERC-20/TRC-20), LTC