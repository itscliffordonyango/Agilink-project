
AgriLink — Improved demo (web)
==============================

What I changed:
- Modern green plant-inspired UI (index.html, style.css)
- Offline-capable listing queue (localStorage) with Sync Now button (script.js)
- Simple mock backend (Node/Express) in /backend providing endpoints:
  - GET /api/prices
  - POST /api/estimates/profit
  - POST /api/listings
  - GET /api/listings
  - GET /api/weather
  - POST /api/auth/otp/request
  - POST /api/auth/otp/verify

How to run:
1. Open index.html in a local web server (recommended) or open directly in browser.
2. Run mock backend:
   cd backend
   npm install express
   node server.js
3. The frontend expects the backend at http://localhost:4000

Notes:
- This is a front-end demo; no production features included.
- To extend: integrate JWT auth, persistent DB, and a Kotlin Android client as planned.
