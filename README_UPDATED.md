# CrunchAura — Redesigned Angular + Django Full-Stack

This version keeps the existing Django REST + Angular foundation and upgrades the public experience into a premium makhana brand site.

## Frontend additions
- Premium responsive header, navigation and footer
- Redesigned homepage with hero, collection, brand philosophy, origin journey, B2B CTA, journal preview and testimonials
- New `/why-makhana` page
- New `/journal` and `/journal/:slug` pages with category filtering
- New `/checkout` UI flow connected to the existing Django order API
- Improved product storytelling and CTA hierarchy
- Improved About page
- B2B and contact flows retained and visually aligned
- Existing authentication, cart and dashboard flows preserved
- Existing product SVG assets are used across the catalogue; the two JPG food photos are retained

## Important image note
The supplied ZIP contained 2 raster food photos (`makhana-bowl.jpg`, `roasted-makhana.jpg`) plus flavour SVG artwork. It did **not** contain 15 separate uploaded photos. No external stock photos were silently substituted.

## Run
### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
python -m venv venv
# activate venv
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver
```

The Angular app expects the Django API configured in `frontend/src/environments/environment.ts`.

## Production note
The checkout UI is connected to the existing order endpoint. A real payment gateway, shipping calculation, invoice generation and verified business contact details should be connected before production launch.

## Latest image and dependency update
- Added client-supplied editorial makhana photography crops under `frontend/src/assets/images/` and assigned different visuals to hero, story, why-makhana and journal sections.
- Removed the old two JPG product photos from the shipped frontend assets.
- Added unique lightweight SVG product pack visuals for all ten catalogue products.
- Updated the included SQLite product records and Django seed data so no product references the removed JPGs.
- Removed the stale `frontend/package-lock.json` that pinned Angular Animations 20.1.8 while the project uses Angular 20.3.33. Run `npm install` in `frontend` to generate a fresh lockfile from the aligned `package.json`.
