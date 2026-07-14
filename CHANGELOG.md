# Changelog

All notable changes documented here.

## [2.0.0] - 2025-07-14

### Added
- Crypto-only payment system (BTC, ETH, USDT, LTC)
- Admin panel with Products, Orders, Payments, Upload tabs
- Real-time sync between admin and store (1s polling)
- Product images support
- Direct download links after admin verification
- Shop page with search & category filter
- Cart-less checkout flow

### Changed
- Removed fake/sample data - starts empty
- Simplified Buy flow to crypto payment modal
- Admin now manages wallet addresses per currency

### Fixed
- Click handlers on product cards
- Re-render optimization with JSON comparison

## [1.0.0] - 2025-07-13

### Added
- Initial Next.js 15 + TypeScript + Tailwind setup
- Homepage with Hero, Featured, Checkers sections
- Product cards with ratings, categories, sales count
- Admin panel (Products, Orders, Upload)
- LocalStorage-based data persistence
- Real-time sync via storage events + polling

### Infrastructure
- Static export ready (`output: 'export'`)
- Vercel/Netlify deployable