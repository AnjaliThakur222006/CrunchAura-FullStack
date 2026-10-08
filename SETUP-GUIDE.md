# CrunchAura — Setup, Run (VS Code) aur Netlify Deploy Guide

## Jo errors fix hue
1. `about`, `checkout`, `why-makhana` components mein `styles:[` band nahi tha (`]` missing) -> build fail ho raha tha. Fixed.
2. `angular.json` mein `fileReplacements` nahi tha -> deployed site `127.0.0.1:8000` ko call karti. Ab production build `environment.prod.ts` use karta hai. Fixed.
3. `netlify.toml` mein Node version add kiya (Node 22) taaki Netlify par build fail na ho.
4. `.gitignore` add kiya (node_modules, dist, .angular, venv ko GitHub par nahi bhejna).

## Part 1: VS Code mein run karna (Local)
Zaroori: Node.js 22 (ya 20.19+), Python 3.11+, VS Code.

### Frontend (Terminal 1)
    cd frontend
    npm install
    npm start
Browser: http://localhost:4200

### Backend (Terminal 2)
Windows:
    cd backend
    python -m venv venv
    venv\Scripts\activate
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py seed_data
    python manage.py runserver
Mac/Linux: `source venv/bin/activate` use karein.
API: http://127.0.0.1:8000/api/products/

Demo login: demo@crunchaura.com / CrunchAuraDemo@123
B2B login: partner@crunchaura.com / CrunchAuraPartner@123

## Part 2: Real website (Live) — 2 steps
Netlify sirf frontend host karta hai. Django backend alag host karna padta hai (Render free).

### Step A: Code GitHub par daalo
    git init
    git add .
    git commit -m "CrunchAura"
GitHub par naya repo banao aur push karo.

### Step B: Backend Render.com par
1. Render -> New -> Web Service -> apna GitHub repo select karo.
2. Root Directory: `backend`
3. Build Command: `pip install -r requirements.txt && python manage.py migrate && python manage.py seed_data && python manage.py collectstatic --noinput`
4. Start Command: `gunicorn config.wsgi:application`
5. Environment Variables:
   - SECRET_KEY = koi lamba random text
   - DEBUG = False
   - ALLOWED_HOSTS = your-backend.onrender.com
   - CORS_ALLOWED_ORIGINS = https://your-site.netlify.app   (Netlify deploy ke baad update karo)
   - DATABASE_URL = Render PostgreSQL ka URL (free Postgres bana lo)
6. Deploy ke baad URL milega, jaise `https://crunchaura-api.onrender.com`

### Step C: Frontend mein backend URL daalo
File: `frontend/src/environments/environment.prod.ts`
    export const environment = {
      production: true,
      apiUrl: 'https://crunchaura-api.onrender.com/api'
    };
Change commit + push karo.

### Step D: Netlify par deploy
1. https://app.netlify.com -> Add new site -> Import from Git -> GitHub repo select karo.
2. Settings `netlify.toml` se automatic aa jayengi (base: frontend, publish: dist/crunch-aura/browser).
3. Deploy dabao. Site URL milega, jaise `https://crunchaura.netlify.app`.
4. Ye URL Render ke `CORS_ALLOWED_ORIGINS` mein daalo aur backend redeploy karo.

Alternative (bina GitHub): local par `npm run build` chalao, phir `frontend/dist/crunch-aura/browser` folder Netlify Drop (app.netlify.com/drop) mein drag-drop karo. Is se pehle `environment.prod.ts` mein backend URL zaroor daalo.

## Common problems
- `ng` not found -> pehle `npm install` chalao.
- Netlify par page refresh par 404 -> `netlify.toml` ka redirect already set hai.
- Site par products nahi dikh rahe -> `environment.prod.ts` ka URL ya Render ka CORS check karo.
- Render free plan 15 min baad sleep ho jata hai, pehli request 30-60 sec le sakti hai.
