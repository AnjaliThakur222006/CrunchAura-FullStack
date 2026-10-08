# Deployment Plan

## Architecture

```text
User Browser
    |
    v
Netlify
Angular SPA
    |
    | HTTPS JSON
    v
Render / Railway
Django REST API
    |
    v
PostgreSQL
```

## Frontend

Build:
```bash
cd frontend
npm install
npm run build
```

Deploy the `dist/crunch-aura/browser` folder through Netlify.

Set the production API URL in:
`src/environments/environment.prod.ts`

## Backend

Install:
```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
```

Production command example:
```bash
gunicorn config.wsgi:application
```

Use environment variables:
- SECRET_KEY
- DEBUG=False
- ALLOWED_HOSTS
- CORS_ALLOWED_ORIGINS
- DATABASE_URL

## Production checklist

- HTTPS
- PostgreSQL
- strong secret
- restricted CORS
- DEBUG false
- real email provider
- backups
- payment gateway only after business setup
- rate limiting for auth endpoints
- logging/monitoring
