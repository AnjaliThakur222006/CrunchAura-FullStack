import uuid
from decimal import Decimal,ROUND_HALF_UP
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import status,viewsets
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile,Product,Order,OrderItem,Feedback,ContactMessage,B2BEnquiry
from .serializers import *

def tokens_for(user):
    refresh=RefreshToken.for_user(user)
    return str(refresh.access_token)

class RegisterView(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        serializer=RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        return Response({"access":tokens_for(user),"user":UserSerializer(user).data},status=201)

class LoginView(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        email=request.data.get("email","").strip().lower()
        password=request.data.get("password","")
        account=User.objects.filter(email__iexact=email).only("username").first()
        user=authenticate(username=account.username if account else email,password=password)
        if not user: return Response({"detail":"Invalid credentials."},status=401)
        if not hasattr(user,"profile"): Profile.objects.create(user=user,user_type="ADMIN" if user.is_staff else "B2C")
        return Response({"access":tokens_for(user),"user":UserSerializer(user).data})

class MeView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        if not hasattr(request.user,"profile"): Profile.objects.create(user=request.user)
        return Response(UserSerializer(request.user).data)
    def put(self,request):
        if "user_type" in request.data:
            return Response({"detail":"Account type cannot be changed from profile settings."},status=403)
        user=request.user
        for key in ["first_name","last_name","email"]:
            if key in request.data: setattr(user,key,request.data[key])
        user.save()
        profile=user.profile
        for key in ["phone","favorite_flavor","marketing_consent"]:
            if key in request.data: setattr(profile,key,request.data[key])
        profile.save()
        return Response(UserSerializer(user).data)

class ProductViewSet(viewsets.ModelViewSet):
    queryset=Product.objects.all().order_by("id")
    serializer_class=ProductSerializer
    permission_classes=[IsAdminUser]
    def get_permissions(self):
        if self.action in ["list","retrieve"]: return [AllowAny()]
        return super().get_permissions()

@api_view(["GET"])
@permission_classes([AllowAny])
def product_by_slug(request,slug):
    product=get_object_or_404(Product,slug=slug)
    return Response(ProductSerializer(product).data)

class FeedbackViewSet(viewsets.ModelViewSet):
    serializer_class=FeedbackSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self): return Feedback.objects.filter(user=self.request.user).select_related("product").order_by("-created_at")
    def perform_create(self,serializer): serializer.save(user=self.request.user)
    def perform_update(self,serializer): serializer.save(user=self.request.user)

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class=OrderSerializer
    permission_classes=[IsAuthenticated]
    http_method_names=["get","post"]
    def get_queryset(self): return Order.objects.filter(user=self.request.user).prefetch_related("items").order_by("-created_at")
    def create(self,request,*args,**kwargs):
        items=request.data.get("items",[])
        if not items: return Response({"detail":"Cart is empty."},status=400)
        products={p.id:p for p in Product.objects.filter(id__in=[x.get("product_id") for x in items])}
        subtotal=Decimal("0.00")
        valid=[]
        for row in items:
            p=products.get(row.get("product_id"))
            try: q=int(row.get("quantity",1))
            except (TypeError,ValueError): continue
            if not p or not p.in_stock or q<1: continue
            subtotal += p.price*q; valid.append((p,q))
        if not valid:return Response({"detail":"No valid items."},status=400)
        promo_code=str(request.data.get("promo_code","")).strip().upper()
        discount=Decimal("0.00")
        if promo_code:
            if promo_code!="FESTIVE15":
                return Response({"detail":"This promo code is not valid."},status=400)
            if subtotal<Decimal("999.00"):
                return Response({"detail":"FESTIVE15 applies to orders of ₹999 or more."},status=400)
            discount=(subtotal*Decimal("0.15")).quantize(Decimal("0.01"),rounding=ROUND_HALF_UP)
        total=subtotal-discount
        order=Order.objects.create(
            user=request.user,order_number=f"CA-{uuid.uuid4().hex[:8].upper()}",
            subtotal=subtotal,discount=discount,promo_code=promo_code,total=total
        )
        for p,q in valid: OrderItem.objects.create(order=order,product=p,product_name=p.name,quantity=q,price=p.price)
        return Response(OrderSerializer(order).data,status=201)

@api_view(["POST"])
@permission_classes([AllowAny])
def contact(request):
    serializer=ContactSerializer(data=request.data);serializer.is_valid(raise_exception=True);serializer.save()
    return Response({"detail":"Message received."},status=201)

@api_view(["POST"])
@permission_classes([AllowAny])
def b2b(request):
    serializer=B2BSerializer(data=request.data);serializer.is_valid(raise_exception=True);serializer.save()
    return Response({"detail":"Enquiry received."},status=201)
