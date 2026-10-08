from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    USER_TYPES=[("B2C","B2C Customer"),("B2B","B2B Partner"),("ADMIN","Admin")]
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name="profile")
    phone=models.CharField(max_length=20,blank=True)
    user_type=models.CharField(max_length=10,choices=USER_TYPES,default="B2C")
    favorite_flavor=models.CharField(max_length=80,default="Classic")
    points=models.PositiveIntegerField(default=0)
    marketing_consent=models.BooleanField(default=False)
    def __str__(self): return self.user.email or self.user.username

class Product(models.Model):
    name=models.CharField(max_length=120)
    slug=models.SlugField(unique=True)
    category=models.CharField(max_length=50,default="Classic")
    flavor=models.CharField(max_length=80)
    description=models.TextField()
    price=models.DecimalField(max_digits=10,decimal_places=2)
    pack_size=models.CharField(max_length=40,default="80 g")
    image=models.CharField(max_length=255,default="assets/products/raw.svg")
    badge=models.CharField(max_length=30,blank=True)
    in_stock=models.BooleanField(default=True)
    ingredients=models.TextField(default="Makhana, seasoning, salt")
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.name

class Order(models.Model):
    STATUS=[("Pending","Pending"),("Confirmed","Confirmed"),("Processing","Processing"),("Shipped","Shipped"),("Delivered","Delivered"),("Cancelled","Cancelled")]
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="orders")
    order_number=models.CharField(max_length=30,unique=True)
    subtotal=models.DecimalField(max_digits=10,decimal_places=2,default=0)
    discount=models.DecimalField(max_digits=10,decimal_places=2,default=0)
    promo_code=models.CharField(max_length=40,blank=True)
    total=models.DecimalField(max_digits=10,decimal_places=2)
    status=models.CharField(max_length=20,choices=STATUS,default="Pending")
    created_at=models.DateTimeField(auto_now_add=True)

class OrderItem(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE,related_name="items")
    product=models.ForeignKey(Product,on_delete=models.PROTECT)
    product_name=models.CharField(max_length=120)
    quantity=models.PositiveIntegerField(default=1)
    price=models.DecimalField(max_digits=10,decimal_places=2)

class Feedback(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="feedback")
    product=models.ForeignKey(Product,on_delete=models.SET_NULL,null=True,blank=True)
    rating=models.PositiveSmallIntegerField(default=5)
    comment=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)

class ContactMessage(models.Model):
    name=models.CharField(max_length=100)
    email=models.EmailField()
    phone=models.CharField(max_length=20,blank=True)
    message=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)

class B2BEnquiry(models.Model):
    company=models.CharField(max_length=160)
    contact_person=models.CharField(max_length=120)
    email=models.EmailField()
    country=models.CharField(max_length=80)
    quantity=models.CharField(max_length=80,blank=True)
    product_interest=models.CharField(max_length=100,blank=True)
    message=models.TextField(blank=True)
    status=models.CharField(max_length=30,default="New")
    created_at=models.DateTimeField(auto_now_add=True)
