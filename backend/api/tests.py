from decimal import Decimal

from django.contrib.auth.models import User
from rest_framework.test import APITestCase

from .models import Order, Product, Profile


class AccountAndPromotionTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="shopper@example.com",
            email="shopper@example.com",
            password="StrongPass123!",
        )
        Profile.objects.create(user=self.user, user_type="B2C")
        self.product = Product.objects.create(
            name="Test Makhana",
            slug="test-makhana",
            flavor="Classic",
            description="Roasted fox nuts",
            price=Decimal("500.00"),
        )
        self.client.force_authenticate(user=self.user)

    def test_festive_code_applies_server_side_discount(self):
        response = self.client.post("/api/orders/", {
            "items": [{"product_id": self.product.id, "quantity": 2}],
            "promo_code": "festive15",
        }, format="json")

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Decimal(response.data["subtotal"]), Decimal("1000.00"))
        self.assertEqual(Decimal(response.data["discount"]), Decimal("150.00"))
        self.assertEqual(Decimal(response.data["total"]), Decimal("850.00"))

    def test_festive_code_requires_minimum_subtotal(self):
        response = self.client.post("/api/orders/", {
            "items": [{"product_id": self.product.id, "quantity": 1}],
            "promo_code": "FESTIVE15",
        }, format="json")

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Order.objects.count(), 0)

    def test_unknown_promo_code_is_rejected(self):
        response = self.client.post("/api/orders/", {
            "items": [{"product_id": self.product.id, "quantity": 2}],
            "promo_code": "NOTREAL",
        }, format="json")

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Order.objects.count(), 0)

    def test_profile_cannot_change_account_role(self):
        response = self.client.put("/api/auth/me/", {"user_type": "ADMIN"}, format="json")

        self.assertEqual(response.status_code, 403)
        self.user.profile.refresh_from_db()
        self.assertEqual(self.user.profile.user_type, "B2C")

    def test_registration_rejects_invalid_phone_number(self):
        response = self.client.post("/api/auth/register/", {
            "first_name": "Riya",
            "last_name": "Shah",
            "email": "riya@example.com",
            "phone": "12345",
            "password": "StrongPass123!",
            "user_type": "B2B",
            "favorite_flavor": "Classic",
        }, format="json")

        self.assertEqual(response.status_code, 400)
        self.assertIn("phone", response.data)