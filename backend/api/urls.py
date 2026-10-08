from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import RegisterView,LoginView,MeView,ProductViewSet,FeedbackViewSet,OrderViewSet,product_by_slug,contact,b2b

router=DefaultRouter()
router.register("products",ProductViewSet,basename="products")
router.register("feedback",FeedbackViewSet,basename="feedback")
router.register("orders",OrderViewSet,basename="orders")

urlpatterns=[
    path("auth/register/",RegisterView.as_view()),
    path("auth/login/",LoginView.as_view()),
    path("auth/me/",MeView.as_view()),
    path("products/by-slug/<slug:slug>/",product_by_slug),
    path("contact/",contact),
    path("b2b/enquiries/",b2b),
    path("",include(router.urls)),
]
