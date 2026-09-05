# 1Fi Marketplace — SDE Intern Assignment

A modern, responsive e-commerce marketplace built as an extension to the **1Fi Shop** experience. Engineered with Next.js 16 (Turbopack, App Router), React 19, TypeScript, and Tailwind CSS v4, adhering to 1Fi's design language and fintech-first product philosophy.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com/)

---

## 🚀 Live Demo & Deployment

- **Live URL**: [https://1fi-internship-submission.vercel.app](https://1fi-internship-submission.vercel.app) *(or your Vercel deployment URL)*
- **Default Route**: Automatically redirects from `/` to `/shop` with the **1Fi Marketplace** tab active.

---

## 📌 Problem Statement & Objective

Build the **1Fi Marketplace** section within the existing **Shop** experience of the 1Fi app:
1. **Explore & Align**: Match 1Fi's UI/UX, typography, layout, spacing, and micro-interactions.
2. **Shop Hub Navigation**: Include tab switching across:
   - **Top Brands** *(Placeholder tab)*
   - **Nearby Stores** *(Placeholder tab)*
   - **1Fi Marketplace** *(Full implementation)*
3. **Marketplace Features**:
   - Dynamic product listing with instant search & filtering
   - Rich product details with variants (storage, colors) and live price recalculation
   - Integrated 1Fi No-Cost EMI calculation engine with tenure selection
   - Resilient state handling (loading skeletons, empty states, error handling)
4. **Clean Architecture**: Decoupled API routes, reusable components, strict TypeScript typing, and responsive mobile-first layout.

---

## ✨ Key Features

### 1. 🛍️ Shop Navigation & Sub-Tabs
- Top navigation bar featuring the 1Fi branding, location picker, search, and notification action icons.
- Pill-based sub-tabs allowing seamless switching between **1Fi Marketplace**, **Top Brands**, and **Nearby Stores**.

### 2. 🔍 Product Discovery & Instant Filtering
- **Real-Time Search**: Instant search matching against product titles and brand names.
- **Category Filter Pills**: Quick-access tags (`All`, `Smartphones`, `Laptops`, `Tablets`, `Audio`, `Wearables`).
- **Advanced Filter Drawer**:
  - Sort by: *Popularity*, *Price: Low to High*, *Price: High to Low*, *Customer Rating*.
  - Brand selection filter.
  - Quick toggle for **0% No-Cost EMI Only** products.
  - Active filter badges with one-click reset.

### 3. 📱 Product Detail Page (`/shop/marketplace/[id]`)
- **Interactive Media Gallery**: Multi-angle product imagery with thumbnail switching.
- **Variant Selector**:
  - Storage capacities (e.g., 256GB, 512GB, 1TB) with dynamic incremental pricing.
  - Color options with visual color swatches and synchronized preview images.
- **Rich Specs**: Product highlights, stock availability, and delivery estimate badges.

### 4. 💳 Dynamic 1Fi EMI Calculator Engine
- Calculates exact monthly installments dynamically based on current selected variant price.
- **0% No-Cost EMI** tenures: 3, 6, 9, 12, 18, and 24 months.
- **Extended LAMF (Loan Against Mutual Funds) Tenures**: 36, 48, and 60 months with competitive interest rates (7.49% – 8.49%).
- Detailed breakdown modal displaying downpayment, monthly payment, interest rate, and total repayment amount.
- Sticky bottom action bar with selected EMI summary and **"Proceed with EMI"** CTA.

### 5. ⚡ Performance & Design Polish
- **Mobile-First & Fully Responsive**: Optimized for handheld devices (max-width mobile container) while adapting gracefully to tablet and desktop viewports.
- **Smooth Skeleton Loaders**: Shimmer placeholder states for product grids and detail views while fetching data.
- **Error Boundaries & Empty States**: User-friendly states when search queries yield zero results or network requests fail.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) | Server Components, dynamic client views, and route handlers |
| **Library** | [React 19](https://react.dev/) | Modern state and UI primitives |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-end type safety for models, API contracts, and components |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern CSS utility engine with zero runtime overhead |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent icons |

---

## 🔌 API Architecture

All endpoints are built using Next.js App Router Route Handlers (`src/app/api/marketplace/...`):

| Method | Endpoint | Description | Query / Body Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/marketplace/products` | Returns filtered and sorted products | `search`, `category`, `sort`, `brand`, `zeroCostOnly` |
| `GET` | `/api/marketplace/products/:id` | Returns single product details by ID | `:id` route parameter |
| `GET` | `/api/marketplace/categories` | Returns all available categories | None |
| `POST` | `/api/marketplace/emi-calculator` | Computes monthly EMI plans dynamically | `{ amount, supportedTenures, zeroCostTenures }` |

---

## 📂 Project Structure

```text
├── public/
│   ├── assets/              # Optimized product webp images & 1Fi SVG logo
├── src/
│   ├── app/
│   │   ├── api/marketplace/ # RESTful API Route Handlers
│   │   │   ├── categories/route.ts
│   │   │   ├── emi-calculator/route.ts
│   │   │   ├── products/route.ts
│   │   │   └── products/[id]/route.ts
│   │   ├── shop/
│   │   │   ├── marketplace/[id]/page.tsx  # Product Detail Page
│   │   │   └── page.tsx                   # Main Shop page with tabs
│   │   ├── globals.css      # Design tokens & animation utilities
│   │   ├── layout.tsx       # Root layout & font configuration
│   │   └── page.tsx         # Root redirect to /shop
│   ├── components/
│   │   ├── common/          # AppShell, SkeletonLoader, ErrorState
│   │   ├── marketplace/     # MarketplaceView, ProductCard, FilterSheet,
│   │   │                    # ProductGallery, VariantSelector, EMIPlanSelector
│   │   └── shop/            # ShopTabBar, ShopBanner, TopBrandsTab, NearbyStoresTab
│   ├── data/
│   │   └── products.ts      # Structured product catalog & categories
│   ├── lib/
│   │   ├── api.ts           # Typed client-side API fetchers
│   │   └── emi.ts           # Financial EMI calculation formulas & INR formatting
│   └── types/
│       └── marketplace.ts   # Core TypeScript interfaces & types
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 💻 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Omkarpatil-op/1Fi_Internship_Submission.git
   cd 1Fi_Internship_Submission
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) (redirects to `/shop`).

### Building for Production

```bash
npm run build
npm run start
```

---

## 🚢 Deploying to Vercel

1. Push your code to your GitHub repository.
2. Import the project in [Vercel](https://vercel.com/new).
3. Framework Preset will be auto-detected as **Next.js**.
4. Leave all build and install commands to default (`next build`, `npm install`).
5. **No environment variables are required**.
6. Click **Deploy**.

---

## 📋 Evaluation Criteria Mapping

| Evaluation Criteria | Implementation Highlights |
| :--- | :--- |
| **Product Understanding** | Native 1Fi branding, 0% No-Cost EMI prominence, LAMF tenure support, and financial clarity for the borrower. |
| **UI/UX Consistency** | Exact tab navigation (`Marketplace`, `Top Brands`, `Nearby Stores`), polished mobile-first layout, and consistent typography and iconography. |
| **Engineering Quality** | Strict TypeScript typings, component separation of concerns, DRY utility functions for financial maths. |
| **Functionality** | Real-time search, multi-factor filtering, dynamic variant switching with live price recalculation, and interactive EMI tenure selector. |
| **Data & API Handling** | Clean separation between presentation layer and data layer; dynamic API routes with query parameter parsing. |
| **Attention to Detail** | Micro-interactions, shimmer loading skeletons, error fallback states, and zero console warnings/errors. |

---

## 👤 Author

- **Omkar Patil** — [GitHub](https://github.com/Omkarpatil-op)
