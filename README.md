# Exclusive - E-Commerce Store

A modern, fully responsive e-commerce frontend built with Next.js 15, React 18, TypeScript, and Tailwind CSS. Features a complete shopping experience with product browsing, cart management, wishlist, checkout flow, and user authentication UI.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss)

## Features

### Pages
- **Home** - Hero banner, flash sales with countdown timer, category browsing, best sellers, promotional banner, new arrivals, and service highlights
- **Products** - Full catalog with category sidebar filter, sort by price/rating, and product count
- **Product Detail** - Image gallery, quantity selector, color options, delivery info, and related products
- **Cart** - Quantity management, item removal, cart totals with shipping calculation, and free shipping progress indicator
- **Checkout** - Billing form, order summary, payment method selection, and coupon code input
- **Wishlist** - Save items for later, move all to cart, and personalized recommendations
- **About** - Company story, stats, and team section
- **Contact** - Contact form with phone and email info
- **Login / Sign Up** - Authentication forms with Google OAuth UI
- **Forgot Password** - Password reset flow with email confirmation

### Functionality
- Add to cart / remove from cart with quantity controls
- Wishlist with add/remove toggle from any product card
- Cart and wishlist persisted in localStorage
- Product filtering by category and sorting by price/rating
- Flash sale countdown timer
- Responsive design (mobile, tablet, desktop)
- Sticky navbar with mobile hamburger menu
- Search bar UI

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org/) | React framework with App Router |
| [React 18](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |
| [React Context](https://react.dev/reference/react/useContext) | State management (Cart & Wishlist) |

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd online-store

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
├── app/
│   ├── about/page.tsx           # About page
│   ├── cart/page.tsx            # Shopping cart
│   ├── checkout/page.tsx        # Checkout flow
│   ├── contact/page.tsx         # Contact form
│   ├── forgot-password/page.tsx # Password reset
│   ├── login/page.tsx           # Login page
│   ├── products/
│   │   ├── page.tsx             # Product listing
│   │   └── [id]/page.tsx        # Product detail
│   ├── signup/page.tsx          # Registration
│   ├── wishlist/page.tsx        # Wishlist
│   ├── globals.css              # Global styles
│   ├── icon.svg                 # Favicon
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/
│   ├── Footer.tsx               # Site footer
│   ├── Navbar.tsx               # Navigation bar
│   ├── Navicons.tsx             # Cart/wishlist/user icons
│   └── ProductCard.tsx          # Reusable product card
├── context/
│   └── CartContext.tsx           # Cart & wishlist state
├── data/
│   └── products.ts              # Product catalog data
└── types/
    └── product.ts               # TypeScript interfaces
```

## Current Limitations

This project is a **frontend-only** implementation. The following features are simulated and require backend integration for production use:

| Feature | Current State | Production Requirement |
|---------|--------------|----------------------|
| Authentication | localStorage mock | Auth provider (NextAuth.js, Firebase, etc.) |
| Payments | UI only | Payment gateway (Stripe, PayPal) |
| Checkout | Fake alert on submit | Order processing API |
| Search | Input exists, no filtering | Search API with indexing |
| Contact form | Alert on submit | Email service (SendGrid, etc.) |
| Coupon codes | Button does nothing | Validation API |
| Product data | Hardcoded in `/data` | Database (PostgreSQL, MongoDB) |
| User accounts | Not persisted | User database + sessions |

## Deploy on Vercel

The easiest way to deploy this app is with [Vercel](https://vercel.com/new):

```bash
npm i -g vercel
vercel
```

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for other hosting options.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Author

**Chiamaka Prosper Nkwazema**
