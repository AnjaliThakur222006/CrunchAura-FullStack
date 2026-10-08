# CrunchAura — Software Requirements Specification

## 1. Product Vision

CrunchAura is a premium D2C + B2B website for Indian makhana products.

The website must communicate:
- premium Indian origin
- clean ingredients and quality
- modern packaging
- easy discovery and purchase intent
- export readiness
- community/feedback
- trust and transparency

## 2. User Roles

### Visitor
Can:
- view Home
- view About
- browse Flavors
- view product details
- view B2B Export
- contact the brand
- register/login

### B2C Customer
Can:
- manage profile
- maintain cart
- place an order/enquiry
- see order history
- submit feedback
- see community points
- manage preferences

### B2B Partner
Can:
- view export catalogue
- submit bulk/export enquiry
- provide country, quantity and business details
- track enquiry status

### Admin
Can:
- manage products
- review orders
- review feedback
- review B2B enquiries
- manage users
- change product visibility/stock
- use Django admin for database operations

## 3. Site Map

Public:
- `/`
- `/about`
- `/shop`
- `/shop/:slug`
- `/b2b-export`
- `/contact`

Auth:
- `/login`
- `/register`

Customer:
- `/dashboard`
- `/dashboard/profile`
- `/dashboard/orders`
- `/dashboard/feedback`

## 4. Home Page Sections

1. Announcement strip
2. Header/navigation
3. Hero
   - headline
   - subheadline
   - Shop Now CTA
   - Export Inquiry CTA
   - premium hero visual
4. Trust badges
5. Featured flavors
6. Why CrunchAura
7. Makhana journey / origin
8. Community/feedback teaser
9. B2B export CTA
10. Footer

## 5. Shop

Features:
- product grid
- category filters
- search
- sort
- stock indicator
- price/currency
- product badges
- quick view
- product detail route
- responsive cards

## 6. Product Detail

Must show:
- product image
- product name
- short description
- flavor/category
- pack size
- price
- stock status
- ingredients
- nutrition placeholder
- Add to Cart
- Enquire for Bulk
- related products

## 7. Registration

Step 1 — Account:
- first name
- last name
- email
- phone
- password
- confirm password

Step 2 — Preferences:
- user type B2C/B2B
- favorite flavor
- marketing consent

Validation:
- required fields
- email validation
- password strength
- password match
- phone validation

## 8. Customer Dashboard

Overview cards:
- Community Points
- Orders
- Saved/Pre-order status
- Feedback count

Dashboard modules:
- recent orders
- profile completion
- favorite products
- feedback
- quick actions

## 9. Contact

Keep it short:
- name
- email
- phone
- message
- WhatsApp CTA
- phone CTA
- email CTA

## 10. B2B Export

Fields:
- company name
- contact person
- business email
- country
- expected monthly quantity
- product interest
- message

The API stores the enquiry for admin follow-up.

## 11. Feedback

Authenticated customers can:
- create feedback
- view their feedback
- update their feedback
- delete their feedback

## 12. Orders

Version 1:
- order creation from cart
- order number
- items
- total
- status

Statuses:
- Pending
- Confirmed
- Processing
- Shipped
- Delivered
- Cancelled

## 13. Non-functional Requirements

- Responsive at 360px, 768px, 1024px and desktop widths
- WCAG-friendly contrast and keyboard focus
- lazy-loaded feature routes
- optimized images
- API errors shown as friendly messages
- no secrets in Angular source
- production API over HTTPS
- backend CORS restricted to known domains
- production database PostgreSQL
- server-side validation

## 14. Visual Direction

Reference:
- deep forest green
- ivory
- warm muted gold
- subtle botanical/food imagery
- large editorial typography
- generous whitespace
- rounded but not overly playful cards
- premium packaging presentation

Do not use:
- neon colors
- excessive gradients
- cartoon illustrations
- crowded dashboards
- too many animations

## 15. Future Phase

Optional production upgrades:
- Razorpay/Stripe
- shipping integration
- GST invoice PDF
- email/SMS/WhatsApp notifications
- inventory sync
- analytics
- CMS
- multilingual pages
- customer loyalty tiers
