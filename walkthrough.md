# Walkthrough: Scale

Scale is a modern, premium business and financial decision-support advisor. It is tailored for aspiring entrepreneurs, startup teams, and small business owners to evaluate opportunities, run operational diagnostics, forecast monthly runways, and optimize budgets.

## Features Accomplished

### 1. Brand Identity & Color System
- Designed a minimal, modern CSS theme in [tailwind.config.js](file:///c:/bootcamp/frontend/tailwind.config.js) using curated colors (Indigo `#4F46E5` background/buttons, Blue `#3B82F6` lines, Emerald `#10B981` indicators) and custom fonts (Poppins for headings, Inter for copy, and Space Grotesk for metrics).
- Created a custom vector logo in the navigation header depicting a gradient rocket symbol.

### 2. Public Advisory Modules
- **Landing Page**: Large animated mesh backdrop, floating preview panels, and automated statistical count counters.
- **Opportunity Explorer**: Sidebar selector filtering by industry, maximum budget limits, risk profiles, and growth potentials, listing detailed cards and AI recommendation badges.
- **Startup Analyzer**: Split-panel layout with inputs (Idea, Industry, Budget, Audience, Team) on the left, and AI audits on the right (Circular progress meters, SWOT matrix, and roadmap plans).
- **Financial Planner**: Computes runways and break-evens, displays recommendations, and graphs a 6-month cash projection line chart (Recharts).
- **Resource Optimizer**: Custom checklist to allocate monthly budgets, mapping departments on a Pie chart (Recharts) alongside recruiting schedules.
- **Market Insights**: Renders sectoral growth bars (Recharts) and detailed schemes directory.

### 3. Admin Portal CRUD
- Split-screen admin login credentials: `admin@venturepilot.ai` / `admin123`.
- Admin dashboard: metrics widgets (Opportunities, Trends, Funding Schemes, Reports count) and activity summaries.
- Independent tables displaying CRUD operations (Create, Edit, Delete, Search, and Status Toggles) for Opportunities, Market Trends, and Funding sources using overlay modals.

### 4. Dual Database Mode
- Seamless fallbacks: uses MongoDB (Mongoose) if a `MONGO_URI` is present in [.env](file:///c:/bootcamp/backend/.env), otherwise falls back to local database [db.json](file:///c:/bootcamp/backend/db.json) dynamically.

---

## Verification Summary

### 1. Backend API Unit Tests
All 10 Jest endpoint tests passed successfully under mock-JSON fallback conditions:
- **Auth**: Success and failure check on JWT login tokens.
- **Opportunities**: Creation, draft filtering, publishing updates, and deletion.

```bash
PASS ./server.test.js
  VenturePilot AI API Tests
    √ GET /health returns server status (28 ms)
    √ POST /api/auth/login returns 400 for incorrect details (83 ms)
    √ POST /api/auth/login returns token for correct details (75 ms)
    √ GET /api/auth/me returns admin information if authorized (8 ms)
    √ GET /api/public/opportunities returns published entries only (6 ms)
    √ POST /api/admin/opportunities creates a new item when authorized (5 ms)
    √ GET /api/public/opportunities does not return draft items in query list (4 ms)
    √ PUT /api/admin/opportunities/:id modifies item and publishes it (6 ms)
    √ GET /api/public/opportunities/:id returns item details now that it is published (4 ms)
    √ DELETE /api/admin/opportunities/:id removes the item (5 ms)

Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Ran all test suites.
```

### 2. Frontend Compiles Flawlessly
The React client built cleanly with zero compilation errors:
```bash
vite v8.0.16 building client environment for production...
transforming...✓ 2395 modules transformed.
rendering chunks...
dist/index.html                   0.88 kB
dist/assets/index-imYEwAXY.css   10.11 kB
dist/assets/index-B6ZXTb8j.js   791.63 kB
✓ built in 1.70s
```

---

## Visual Slideshow Walkthrough

````carousel
![1. Landing Page](C:/Users/AKSHAYA%20S%20ANILKUMAR/.gemini/antigravity-ide/brain/8e1a58b0-6100-49d7-b3a5-b589d1fec049/landing_page_1781780269048.png)
<!-- slide -->
![2. Opportunity Explorer](C:/Users/AKSHAYA%20S%20ANILKUMAR/.gemini/antigravity-ide/brain/8e1a58b0-6100-49d7-b3a5-b589d1fec049/opportunity_explorer_1781780312507.png)
<!-- slide -->
![3. Startup Analyzer](C:/Users/AKSHAYA%20S%20ANILKUMAR/.gemini/antigravity-ide/brain/8e1a58b0-6100-49d7-b3a5-b589d1fec049/idea_analyzer_1781780495249.png)
<!-- slide -->
![4. Financial Planner](C:/Users/AKSHAYA%20S%20ANILKUMAR/.gemini/antigravity-ide/brain/8e1a58b0-6100-49d7-b3a5-b589d1fec049/financial_planner_1781780727278.png)
<!-- slide -->
![5. Resource Optimizer](C:/Users/AKSHAYA%20S%20ANILKUMAR/.gemini/antigravity-ide/brain/8e1a58b0-6100-49d7-b3a5-b589d1fec049/resource_optimizer_1781780844340.png)
<!-- slide -->
![6. Admin Dashboard](C:/Users/AKSHAYA%20S%20ANILKUMAR/.gemini/antigravity-ide/brain/8e1a58b0-6100-49d7-b3a5-b589d1fec049/admin_dashboard_1781781810522.png)
````

---

## How to Run locally

1. **Install Dependencies**:
   ```bash
   npm run install-all
   ```
2. **Run Servers (Concurrently on ports 3000 & 5000)**:
   ```bash
   npm run dev
   ```
3. **Login Details**:
   - URL: `http://localhost:3000/admin/login`
   - Email: `admin@venturepilot.ai`
   - Password: `admin123`
