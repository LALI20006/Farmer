# 🌱 AgroConnect — Direct Farm-to-Table Agricultural Marketplace

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.13-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Security](https://img.shields.io/badge/Auth-WebCrypto_SHA--256-10B981?style=for-the-badge&logo=security&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
[![Deployment](https://img.shields.io/badge/Deployment-Surge.sh-4E5D6C?style=for-the-badge&logo=surge&logoColor=white)](https://agroconnect-marketplace.surge.sh)

> **AgroConnect** is a modern, high-performance agricultural marketplace platform engineered to bridge the gap between regional agricultural producers and urban consumers across India. By eliminating multi-tier intermediaries, AgroConnect delivers 100% farm traceability, transparent pricing, and fair value compensation directly to verified farmers.

---

## 🌐 Live Demo & Deployment

- **Live URL (Web)**: [https://agroconnect-marketplace.surge.sh](https://agroconnect-marketplace.surge.sh)
- **Streamlit Hub**: Run locally via `streamlit run streamlit_app.py` or deploy directly to [Streamlit Community Cloud](https://share.streamlit.io/) with `streamlit_app.py`.
- **Primary Domain (CNAME)**: `agroconnect-marketplace.surge.sh`

---

## 🎯 Key Capabilities & Role Portals

AgroConnect supports dedicated role-based workflows for **Customers**, **Farmers**, and **Administrators**:

### 1. 🛒 Customer Experience (Buyer Portal)
- **Extensive Marketplace**: Browse over 100+ curated agricultural products across 8 core categories (Fresh Vegetables, Fruits, Heirloom Grains, Pulses & Desi Dals, Spices & Herbs, Certified Organic, Farm Supplies, Dairy & Eggs).
- **Multi-Dimensional Filters**: Filter produce by state/region (Andhra Pradesh, Punjab, Kerala, Maharashtra, Himachal Pradesh, etc.), organic certification, price range, and star rating.
- **Product Traceability**: Detailed product views featuring farm origin, farmer background, harvest date, batch validity, and organic certification badges.
- **Streamlined Cart & Checkout**: Interactive side-drawer cart, delivery address configuration, and checkout supporting multiple payment methods:
  - 💵 Cash on Delivery (COD)
  - 📱 UPI / Instant QR Payment
  - 🏦 Net Banking
  - 💳 Credit / Debit Cards
- **Order Tracking & History**: Track order lifecycle states (*Confirmed*, *Processing*, *Shipped*, *Delivered*) with real-time status updates in the Customer Dashboard.
- **Direct Communication**: Instant in-app messaging modal to communicate directly with farmers about crop quality, harvest timing, and bulk inquiries.

### 2. 🚜 Farmer Producer Portal
- **Farmer Dashboard**: Real-time sales telemetry, total revenue metrics, customer orders count, and inventory health monitoring.
- **Inventory & Catalog Management**: Add new agricultural produce, update prices per kg/unit, configure organic certifications, and adjust available stock.
- **Order Fulfillment Pipeline**: View incoming buyer orders, review shipping addresses, and toggle fulfillment statuses (*Processing* ➔ *Dispatched* ➔ *Completed*).
- **Producer Profiles**: Showcase farm location, farming methodology (e.g., ZBNF, Vedic farming, chemical-free), awards, and soil certification.

### 3. 🛡️ Administrator & Governance Portal
- **User Directory & Management**: View all registered users (Customers, Farmers, Admins), search by name/mobile/email, filter by status, and activate/deactivate accounts in real time.
- **Session Audit & Login Activity**: Complete audit log recording every login event, session ID, user identity, role, timestamp, and active/expired/logged-out status.
- **Support & Inquiries**: Review submissions from the Contact & Support module.

### 4. 🌿 Interactive Agricultural Features
- **Seasonal Harvest Calendar**: Visual quarterly guide showing peak harvest months for seasonal produce to encourage seasonal and local consumption.
- **Impact & Savings Calculator**: Interactive tool showing estimated savings for consumers alongside income boosts for smallholder farmers.
- **Farm-to-Table Recipes**: Step-by-step traditional recipes paired directly with in-season farm produce.
- **Farmer Directory**: Map and directory of verified local sustainable growers across Indian agricultural hubs.

---

## 🔐 Built-in Relational Storage & Security Engine

AgroConnect includes a full relational database engine (`src/db/agroDatabase.js`) backed by browser persistence and compliant with standard SQL databases:

- **Salted SHA-256 Cryptographic Hashing**: Passwords are never stored in plaintext. They are hashed using the browser's native `window.crypto.subtle` API with 16-byte cryptographically secure random salts.
- **Relational Tables**:
  1. `users`: Master user identity, role-based metadata, contact info, and active states.
  2. `farmer_profiles`: Linked 1-to-1 with farmer user records, capturing farm names, districts, and verification status.
  3. `login_activity`: Audit log capturing every authentication session, timestamps, and termination status.
  4. `sessions`: Validated active user session tokens with expiration timestamps.
  5. `contact_messages`: Inquiries and customer feedback messages.
- **Production SQL Schema**: Ready-to-deploy schema included in [`database/schema.sql`](./database/schema.sql) for PostgreSQL, Supabase, or MySQL.

---

## 🔑 Quick Login Credentials (Demo Accounts)

You can sign in immediately using pre-seeded administrator credentials or register any new customer/farmer account in seconds:

| Role | Email / Identifier | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@agroconnect.in` | `admin123` | Full access to Admin Dashboard, User Management, and Login Activity Audit |
| **Farmer** | *Register in Register Page or enter your email* | *Your Password* | Farmer Dashboard, Inventory Management, Order Fulfillment |
| **Customer** | *Register in Register Page or enter your email* | *Your Password* | Marketplace, Cart, Checkout, Order Tracking, Farmer Messaging |

> 💡 **Tip**: When testing new accounts, you can quickly create an account via the **Create Account** page (`/create-account`), choosing either **Customer** or **Farmer**.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18** (`^18.3.1`) | Component-driven UI with state hooks and context API |
| **Build Tooling** | **Vite 5** (`^5.4.6`) | Next-generation frontend tooling with Instant HMR |
| **CSS & Styling** | **Tailwind CSS 3** (`^3.4.13`) | Custom emerald/earth palette tailored for agriculture |
| **Icons** | **Lucide React** (`^0.453.0`) | Clean, accessible SVG iconography |
| **Cryptography** | **Web Crypto API** (`SubtleCrypto`) | Cryptographically secure SHA-256 password hashing |
| **Typography** | **Google Fonts** | `Plus Jakarta Sans` (body) & `Playfair Display` (editorial headers) |
| **Database & SQL** | **IndexedDB / LocalStorage / SQL** | Client-side relational store + `database/schema.sql` for PostgreSQL |
| **Hosting & CI/CD** | **Surge / Static SPA** | Production build with `200.html` fallback routing |

---

## 📂 Project Structure

```text
farmer/
├── database/
│   └── schema.sql              # Production PostgreSQL/Supabase database schema
├── dist/                       # Production build output
│   ├── 200.html                # SPA fallback for static host routing
│   └── CNAME                   # Domain mapping for Surge
├── public/                     # Static public assets
├── src/
│   ├── components/
│   │   ├── auth/               # LoginPage, RegisterPage, AuthModal
│   │   ├── cart/               # CartDrawer, CheckoutView, CheckoutModal
│   │   ├── chat/               # MessagesView, MessagingModal (Customer-Farmer chat)
│   │   ├── dashboards/         # CustomerDashboard, FarmerDashboard, AdminDashboard,
│   │   │                       # AdminUsersView, AdminLoginActivityView
│   │   ├── farmer/             # FarmerDirectoryView, FarmerProfileView, ContactFarmerModal
│   │   ├── home/               # Hero, CategoryBrowse, FreshPicks, SeasonalHarvest,
│   │   │                       # ImpactCalculator, RecipesSection, WhyAgroConnect
│   │   ├── layout/             # Navbar (desktop/mobile), Footer, Toast system
│   │   ├── marketplace/        # MarketplaceView, ProductCard, ProductDetailView
│   │   └── pages/              # CategoriesView, CategoryDetailView, HowItWorksView,
│   │                           # AboutView, ContactView, NotificationsView
│   ├── context/
│   │   └── AppContext.jsx      # Global state provider (Auth, Cart, Navigation, Orders, Filters)
│   ├── data/
│   │   ├── categoriesData.js   # 8 Agricultural categories metadata
│   │   ├── farmersData.js      # Verified farmer listings with farm stories
│   │   ├── productsDataExtended.js # 100+ farm items with pricing, origins, ratings
│   │   ├── recipes.js          # Farm-fresh recipe pairings
│   │   └── seasonalCalendar.js # Seasonal harvest schedule
│   ├── db/
│   │   └── agroDatabase.js     # Salted SHA-256 auth, relational persistence & audit logs
│   ├── App.jsx                 # View router, toast notifications, layout wrapper
│   ├── index.css               # Tailwind directives and custom animation utilities
│   └── main.jsx                # Application root mounting React DOM
├── index.html                  # HTML entry template with SEO metadata & fonts
├── package.json                # Project dependencies and operational scripts
├── postcss.config.js           # PostCSS Tailwind and Autoprefixer configuration
├── tailwind.config.js          # Custom theme extensions, agricultural color tokens
└── vite.config.js              # Vite configuration with React plugin
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or `pnpm` / `yarn`)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/agroconnect-marketplace.git
cd farmer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:5173/` with hot module replacement (HMR).

### 4. Build for Production
```bash
npm run build
```
Optimized assets will be bundled into the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🚢 Deployment

### Deploy to Surge
AgroConnect is configured for automated deployment to Surge with SPA routing:

```bash
# Build production bundle and create 200.html SPA fallback
npm run build:deploy

# Deploy to custom Surge domain
npm run deploy:surge
```

### Deploy to Vercel or Netlify
- **Vercel**: Run `vercel deploy` or connect your GitHub repository (framework: Vite).
- **Netlify**: Set publish directory to `dist` and build command to `npm run build`. A `_redirects` file with `/* /index.html 200` ensures SPA route handling.

---

## 🗄️ Database Schema Reference

The repository provides a complete enterprise-grade SQL schema in [`database/schema.sql`](./database/schema.sql) supporting:

```sql
-- 1. Users Master Table
CREATE TABLE users (
    id VARCHAR(64) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile_number VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('Customer', 'Farmer', 'Admin')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

-- 2. Login Activity & Security Audit Table
CREATE TABLE login_activity (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    login_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    logout_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Active', 'Logged Out', 'Expired')),
    session_id VARCHAR(128) NOT NULL
);

-- 3. Farmer Profiles Table
CREATE TABLE farmer_profiles (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    farm_name VARCHAR(200) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    farm_category VARCHAR(100) DEFAULT 'Organic Produce',
    verification_status VARCHAR(50) DEFAULT 'Verified'
);

-- 4. Active Sessions Table
CREATE TABLE sessions (
    session_id VARCHAR(128) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_valid BOOLEAN DEFAULT TRUE
);
```

---

## 🗺️ Roadmap & Planned Enhancements

- [ ] **Live Backend Integration**: Connect to Supabase / PostgreSQL using Node.js & Prisma.
- [ ] **SMS OTP Authentication**: Add Indian mobile OTP verification via Twilio / Fast2SMS.
- [ ] **Payment Gateway**: Integration with Razorpay / Cashfree for automated UPI auto-pay and instant payouts to farmers.
- [ ] **Multilingual Support**: Localization for regional Indian languages (Hindi, Marathi, Punjabi, Telugu, Tamil, Bengali).
- [ ] **Logistics & Cold-Chain Tracking**: Live GPS tracking for temperature-controlled transport of perishable harvests.

---

## 📄 License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute for commercial or personal agricultural initiatives.
