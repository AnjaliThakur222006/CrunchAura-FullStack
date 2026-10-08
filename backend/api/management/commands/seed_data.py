from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import B2BEnquiry, ContactMessage, Feedback, Order, OrderItem, Profile, Product

class Command(BaseCommand):
    help="Seed CrunchAura demo data"

    def handle(self,*args,**kwargs):
        admin,created=User.objects.get_or_create(username="admin",defaults={"email":"admin@crunchaura.com","is_staff":True,"is_superuser":True})
        if created: admin.set_password("CrunchAura@123");admin.save()
        Profile.objects.get_or_create(user=admin,user_type="ADMIN")

        demo_email="demo@crunchaura.com"
        demo_user,demo_created=User.objects.get_or_create(username=demo_email,defaults={
            "email":demo_email,"first_name":"Aanya","last_name":"Sharma"
        })
        if demo_created: demo_user.set_password("CrunchAuraDemo@123");demo_user.save()
        Profile.objects.get_or_create(user=demo_user,defaults={
            "phone":"+91 98765 43210","user_type":"B2C",
            "favorite_flavor":"Smoky Peri-Peri","points":680,"marketing_consent":True
        })

        partner_email="partner@crunchaura.com"
        partner,partner_created=User.objects.get_or_create(username=partner_email,defaults={
            "email":partner_email,"first_name":"Arjun","last_name":"Mehta"
        })
        if partner_created: partner.set_password("CrunchAuraPartner@123");partner.save()
        Profile.objects.get_or_create(user=partner,defaults={
            "phone":"+91 98765 43211","user_type":"B2B",
            "favorite_flavor":"Royal Masala","marketing_consent":True
        })

        products=[
            ("CrunchAura Classic","classic","Classic","Lightly roasted and clean, the everyday starting point.","299","80 g","assets/products/raw.svg","Bestseller", "Makhana, salt"),
            ("Smoky Peri-Peri","smoky-peri-peri","Spiced","A smoky chilli kick with a savoury finish.","349","80 g","assets/products/peri-peri.svg","New","Makhana, chilli, paprika, spices, salt"),
            ("Cool Mint","cool-mint","Herbal","Fresh mint character with a crisp roasted finish.","329","80 g","assets/products/mint.svg","Popular","Makhana, mint, herbs, salt"),
            ("Royal Masala","royal-masala","Spiced","Warm Indian masala notes for a fuller crunch.","349","80 g","assets/products/masala.svg","Bestseller","Makhana, spices, salt"),
            ("Cocoa Crunch","cocoa-crunch","Sweet","A dessert-inspired makhana for late-evening cravings.","379","70 g","assets/products/cocoa.svg","New","Makhana, cocoa, cane sugar, spices"),
            ("Cheese Chilli","cheese-chilli","Spiced","Creamy savoury notes with a gentle chilli finish.","359","80 g","assets/products/cheese.svg","Popular","Makhana, cheese seasoning, chilli, salt"),
            ("Himalayan Pink Salt","himalayan-pink-salt","Classic","A clean, mineral-salty crunch for everyday snacking.","309","80 g","assets/products/pink-salt.svg","","Makhana, Himalayan pink salt"),
            ("Lime Chilli","lime-chilli","Spiced","Bright lime and gentle chilli bring a lively tang.","339","80 g","assets/products/lime-chilli.svg","New","Makhana, lime, chilli, spices, salt"),
            ("Rose Cardamom","rose-cardamom","Sweet","Soft rose and cardamom make a fragrant sweet crunch.","369","70 g","assets/products/rose-cardamom.svg","","Makhana, rose, cardamom, cane sugar"),
            ("Garden Herb","garden-herb","Herbal","A savoury blend of garden herbs with a roasted finish.","329","80 g","assets/products/garden-herb.svg","","Makhana, herbs, garlic, salt"),
        ]
        for name,slug,cat,desc,price,size,image,badge,ingredients in products:
            Product.objects.update_or_create(slug=slug,defaults={
                "name":name,"category":cat,"flavor":name.replace("CrunchAura ",""),
                "description":desc,"price":price,"pack_size":size,"image":image,
                "badge":badge,"in_stock":True,"ingredients":ingredients
            })

        products_by_slug={product.slug:product for product in Product.objects.all()}
        order_rows=[
            ("CA-DEMO-2026-001","Delivered",[("classic",2),("cool-mint",1)]),
            ("CA-DEMO-2026-002","Delivered",[("smoky-peri-peri",1),("royal-masala",1)]),
            ("CA-DEMO-2026-003","Shipped",[("cocoa-crunch",2)]),
            ("CA-DEMO-2026-004","Processing",[("cheese-chilli",1),("garden-herb",1)]),
            ("CA-DEMO-2026-005","Confirmed",[("lime-chilli",2),("rose-cardamom",1)]),
        ]
        for order_number,order_status,lines in order_rows:
            total=sum((products_by_slug[slug].price*quantity for slug,quantity in lines),start=0)
            order,_=Order.objects.update_or_create(order_number=order_number,defaults={
                "user":demo_user,"subtotal":total,"discount":0,"promo_code":"",
                "total":total,"status":order_status
            })
            order.items.all().delete()
            OrderItem.objects.bulk_create([
                OrderItem(order=order,product=products_by_slug[slug],product_name=products_by_slug[slug].name,
                          quantity=quantity,price=products_by_slug[slug].price)
                for slug,quantity in lines
            ])

        feedback_rows=[
            ("classic",5,"Light, crisp and easy to snack on every day."),
            ("smoky-peri-peri",5,"The smoky chilli flavour has just the right kick."),
            ("cool-mint",4,"Fresh flavour and a lovely crunchy texture."),
            ("cocoa-crunch",5,"A fun sweet snack without feeling too heavy."),
            ("royal-masala",4,"Great masala balance. I will order it again."),
        ]
        for slug,rating,comment in feedback_rows:
            Feedback.objects.update_or_create(user=demo_user,product=products_by_slug[slug],defaults={
                "rating":rating,"comment":comment
            })

        contact_rows=[
            ("Riya Mehta","riya@example.com","+91 90000 10001","Can you share the full retail flavour catalogue?"),
            ("Kabir Shah","kabir@example.com","+91 90000 10002","I would like an update when the gift packs launch."),
            ("Anaya Rao","anaya@example.com","+91 90000 10003","Are the products suitable for office pantry orders?"),
            ("Dev Malhotra","dev@example.com","+91 90000 10004","Please let me know about delivery coverage."),
            ("Mira Iyer","mira@example.com","+91 90000 10005","I have a question about the ingredients."),
        ]
        for name,email,phone,message in contact_rows:
            ContactMessage.objects.get_or_create(email=email,message=message,defaults={
                "name":name,"phone":phone
            })

        enquiry_rows=[
            ("Northstar Foods","Aarav Singh","aarav@northstar.example","UAE","500 kg","Mixed catalogue","Interested in a first-quarter retail launch."),
            ("Maple Pantry","Sofia Martin","sofia@maple.example","Canada","300 kg","Classic","Please share shelf-life and export carton details."),
            ("Harbour Market","Noah Chen","noah@harbour.example","Singapore","250 kg","Spiced","We are comparing savoury flavours for our stores."),
            ("Green Basket Co.","Leah Brown","leah@greenbasket.example","United Kingdom","400 kg","Herbal","Could you provide wholesale pricing and samples?"),
            ("Sunrise Imports","Mateo Costa","mateo@sunrise.example","Australia","350 kg","Sweet","We are interested in a mixed-flavour pilot order."),
        ]
        for company,contact_person,email,country,quantity,interest,message in enquiry_rows:
            B2BEnquiry.objects.get_or_create(company=company,email=email,defaults={
                "contact_person":contact_person,"country":country,"quantity":quantity,
                "product_interest":interest,"message":message
            })

        self.stdout.write(self.style.SUCCESS(
            "Demo data ready: 10 products, 5 orders, 5 feedback entries, 5 contact messages, 5 B2B enquiries. "
            "Customer: demo@crunchaura.com / CrunchAuraDemo@123. "
            "B2B partner: partner@crunchaura.com / CrunchAuraPartner@123"
        ))
