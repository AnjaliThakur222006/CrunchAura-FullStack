# CrunchAura — Premium Makhana Brand Website + REST API

CrunchAura is a production-style Angular + Django REST website for a premium Indian makhana/snack brand.

## What is included

- Public marketing website: Home, About, Flavors/Shop, Product Detail, B2B Export, Contact
- Customer area: Login, Register, Dashboard, Profile, Orders, Feedback
- Admin-ready backend: Products, orders, feedback, B2B enquiries and users
- Django REST API + SQLite for development
- Angular standalone components, lazy routes, Signals, HttpClient, RxJS, reactive forms, guards, custom pipe/directive
- Responsive desktop/mobile design
- Premium CrunchAura visual system based on the supplied reference: deep forest green, ivory, muted gold, serif display typography + clean sans-serif body
- SEO-friendly page titles/meta basics
- Accessible buttons, labels, focus states and responsive navigation
- Netlify-ready Angular frontend
- Render/Railway-style backend deployment guide
- Complete SRS and developer plan in `docs/`

## Important

This is a real website structure, not an exam/demo-only CRUD screen.

For the first version, checkout is intentionally "enquiry/cart" rather than real payment. If you later want production payments, add Razorpay/Stripe only after business, tax, shipping and refund rules are finalized.

## Local setup

### Frontend

Requirements:
- Node.js 22+
- npm 10+

```bash
cd frontend
npm install
npm start
```

Open:
`http://localhost:4200`

### Backend

Requirements:
- Python 3.12/3.13 recommended

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver
```

API:
`http://127.0.0.1:8000/api/`

Django admin:
`http://127.0.0.1:8000/admin/`

Seed admin:
- username: `admin`
- password: `CrunchAura@123`

Change the password before any real deployment.

## Connect Angular to the API

The development API URL is already:
`http://127.0.0.1:8000/api`

For deployment, edit:
`frontend/src/environments/environment.prod.ts`

Set:
```ts
apiUrl: 'https://YOUR-BACKEND-DOMAIN.onrender.com/api'
```

Then build:
```bash
cd frontend
npm run build
```

## Netlify

Build command:
```bash
npm run build
```

Publish directory:
```text
dist/crunch-aura/browser
```

The included `netlify.toml` handles SPA route fallback.

## Backend deployment

Use Render/Railway/Fly.io/a similar Python host for Django. Netlify is for the Angular frontend; it is not a normal Django application host.

After deployment:
1. Set `CORS_ALLOWED_ORIGINS` to your Netlify URL.
2. Set a strong `SECRET_KEY`.
3. Use PostgreSQL for production instead of SQLite.
4. Run migrations.
5. Create a new admin account.
6. Put the backend URL into `environment.prod.ts` and rebuild Angular.

## Project structure

```text
CrunchAura-FullStack/
├── frontend/        Angular website
├── backend/         Django REST API
├── docs/
│   ├── SRS.md
│   ├── USER-FLOWS.md
│   ├── DESIGN-SYSTEM.md
│   ├── API-SPEC.md
│   ├── DEPLOYMENT.md
│   └── SYLLABUS-MAPPING.md
└── README.md


 Push-Location 'C:\Users\thaku\Downloads\CrunchAura-FullStack\CrunchAura-FullStack\frontend'; npm run build
```


