# CrunchAura API Specification

Base:
`/api/`

## Auth

POST `/auth/register/`
POST `/auth/login/`
GET `/auth/me/`

## Products

GET `/products/`
GET `/products/<id>/`
POST `/products/` (admin)
PUT `/products/<id>/` (admin)
DELETE `/products/<id>/` (admin)

## Feedback

GET `/feedback/`
POST `/feedback/`
PUT `/feedback/<id>/`
DELETE `/feedback/<id>/`

## Orders

GET `/orders/`
POST `/orders/`

## Contact

POST `/contact/`

## B2B

POST `/b2b/enquiries/`

## Response principles

- JSON only
- proper HTTP status codes
- server-side validation
- authenticated endpoints use Bearer token
- frontend should never trust role information from the browser alone
