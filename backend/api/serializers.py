from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile,Product,Order,OrderItem,Feedback,ContactMessage,B2BEnquiry

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=Profile
        fields=["phone","user_type","favorite_flavor","points","marketing_consent"]

class UserSerializer(serializers.ModelSerializer):
    profile=ProfileSerializer(read_only=True)
    phone=serializers.CharField(source="profile.phone",read_only=True)
    user_type=serializers.CharField(source="profile.user_type",read_only=True)
    favorite_flavor=serializers.CharField(source="profile.favorite_flavor",read_only=True)
    points=serializers.IntegerField(source="profile.points",read_only=True)
    class Meta:
        model=User
        fields=["id","username","email","first_name","last_name","phone","user_type","favorite_flavor","points","profile"]

class RegisterSerializer(serializers.Serializer):
    first_name=serializers.CharField()
    last_name=serializers.CharField()
    email=serializers.EmailField()
    phone=serializers.CharField()
    password=serializers.CharField(write_only=True,min_length=8)
    user_type=serializers.ChoiceField(choices=["B2C","B2B"])
    favorite_flavor=serializers.CharField()
    marketing_consent=serializers.BooleanField(required=False,default=False)
    def validate_phone(self,value):
        digits="".join(character for character in value if character.isdigit())
        if len(digits)<10 or len(digits)>15:
            raise serializers.ValidationError("Enter a valid phone number with 10 to 15 digits.")
        return value
    def create(self,validated):
        email=validated["email"].lower()
        if User.objects.filter(username=email).exists(): raise serializers.ValidationError({"email":"Email already registered."})
        user=User.objects.create_user(username=email,email=email,password=validated["password"],first_name=validated["first_name"],last_name=validated["last_name"])
        Profile.objects.create(user=user,phone=validated["phone"],user_type=validated["user_type"],favorite_flavor=validated["favorite_flavor"],marketing_consent=validated.get("marketing_consent",False))
        return user

class ProductSerializer(serializers.ModelSerializer):
    inStock=serializers.BooleanField(source="in_stock",read_only=True)
    packSize=serializers.CharField(source="pack_size",read_only=True)
    class Meta:
        model=Product
        fields=["id","name","slug","category","flavor","description","price","pack_size","packSize","image","badge","in_stock","inStock","ingredients"]

class FeedbackSerializer(serializers.ModelSerializer):
    product_name=serializers.CharField(source="product.name",read_only=True)
    class Meta:
        model=Feedback
        fields=["id","product","product_name","rating","comment","created_at"]
        read_only_fields=["created_at"]
    def validate_rating(self,value):
        if value<1 or value>5: raise serializers.ValidationError("Rating must be 1 to 5.")
        return value

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=OrderItem
        fields=["product_name","quantity","price"]

class OrderSerializer(serializers.ModelSerializer):
    items=OrderItemSerializer(many=True,read_only=True)
    class Meta:
        model=Order
        fields=["id","order_number","subtotal","discount","promo_code","total","status","created_at","items"]

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model=ContactMessage
        fields=["name","email","phone","message"]

class B2BSerializer(serializers.ModelSerializer):
    class Meta:
        model=B2BEnquiry
        fields=["company","contact_person","email","country","quantity","product_interest","message"]
