from django.contrib import admin
from .models import Profile,Product,Order,OrderItem,Feedback,ContactMessage,B2BEnquiry

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display=("name","category","price","in_stock","created_at")
    prepopulated_fields={"slug":("name",)}
    list_filter=("category","in_stock")

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display=("order_number","user","total","status","created_at")
    list_filter=("status",)

admin.site.register(Profile)
admin.site.register(OrderItem)
admin.site.register(Feedback)
admin.site.register(ContactMessage)
admin.site.register(B2BEnquiry)
