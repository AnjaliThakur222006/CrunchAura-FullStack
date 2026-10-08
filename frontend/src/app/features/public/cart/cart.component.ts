import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { ApiService } from '../../../core/services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, FormsModule],
  template: `
  <main class="page">
    <section class="head"><div class="container"><span class="eyebrow">Your basket</span><h1>Ready when you are.</h1><p>Review your selected flavours before creating your order.</p></div></section>
    <section class="section"><div class="container cart-grid">
      <section class="card items">
        <div class="item" *ngFor="let item of cart.items()">
          <img [src]="'/' + item.product.image" [alt]="item.product.name">
          <div><span>{{item.product.category}}</span><h3>{{item.product.name}}</h3><small>{{item.product.packSize}}</small></div>
          <div class="qty"><button (click)="decrease(item.product.id)">−</button><b>{{item.quantity}}</b><button (click)="cart.add(item.product)">+</button></div>
          <strong>{{item.product.price * item.quantity | currency:'INR':'symbol':'1.0-0'}}</strong>
          <button class="remove" (click)="cart.remove(item.product.id)">Remove</button>
        </div>
        <div *ngIf="!cart.items().length" class="empty">Your cart is empty. <a routerLink="/shop">Explore flavours →</a></div>
      </section>
      <aside class="card summary">
        <h3>Order summary</h3>
        <div><span>Items</span><b>{{cart.count()}}</b></div>
        <div><span>Subtotal</span><b>{{cart.subtotal() | currency:'INR':'symbol':'1.0-0'}}</b></div>
        <div class="coupon">
          <label for="promo-code">Promo code</label>
          <div class="coupon-row"><input id="promo-code" name="promoCode" [(ngModel)]="promoInput" placeholder="Enter code"><button class="btn btn-dark" type="button" (click)="applyPromo()">Apply</button></div>
          <small>FESTIVE15 saves 15% on orders of ₹999 or more.</small>
          <p class="coupon-feedback" *ngIf="promoMessage">{{promoMessage}}</p>
          <p class="coupon-error" *ngIf="promoError">{{promoError}}</p>
        </div>
        <div *ngIf="cart.discount()"><span>FESTIVE15 discount</span><b>−{{cart.discount() | currency:'INR':'symbol':'1.0-0'}}</b></div>
        <div><span>Delivery</span><b>Calculated later</b></div>
        <hr>
        <div class="total"><span>Estimated total</span><b>{{cart.total() | currency:'INR':'symbol':'1.0-0'}}</b></div>
        <a class="btn btn-primary" [class.disabled]="!cart.items().length" [routerLink]="cart.items().length ? '/checkout' : null">Proceed to checkout →</a>
        <a class="btn btn-light" routerLink="/shop">Continue shopping</a>
        <div class="notice" *ngIf="message">{{message}}</div>
        <div class="error" *ngIf="error">{{error}}</div>
      </aside>
    </div></section>
  </main>
  `,
  styles: [`
    .head{background:var(--forest-950);color:#fff;padding:90px 0}.head h1{margin:18px 0}.head p{color:#d7e2dc}
    .cart-grid{display:grid;grid-template-columns:1.5fr .7fr;gap:24px}.items{padding:0 22px}.item{display:grid;grid-template-columns:86px 1fr 110px 110px 70px;gap:18px;align-items:center;padding:18px 0;border-bottom:1px solid var(--border)}.item img{width:86px;border-radius:12px;background:var(--sand)}.item span{font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:var(--gold-dark);font-weight:700}.item h3{font-size:23px;margin:5px 0}.item small{color:var(--muted)}.qty{display:flex;align-items:center;gap:9px}.qty button{width:28px;height:28px;border:1px solid var(--border);border-radius:50%;background:#fff}.remove{border:0;background:none;color:var(--danger);font-size:11px}.summary{padding:24px;height:max-content;position:sticky;top:100px}.summary h3{font-family:"DM Sans";font-size:16px;margin-bottom:20px}.summary>div:not(.notice):not(.error){display:flex;justify-content:space-between;padding:10px 0;color:var(--muted);font-size:13px}.summary .coupon{display:block!important;border:1px solid var(--border);padding:14px!important;border-radius:10px}.coupon>label{display:block;margin-bottom:8px}.coupon-row{display:flex;gap:8px}.coupon-row input{min-width:0}.coupon-row .btn{margin:0}.coupon>small{display:block;margin-top:8px}.coupon-feedback,.coupon-error{margin:8px 0 0;font-size:12px}.coupon-feedback{color:var(--forest-800)}.coupon-error{color:var(--danger)}.summary .total{color:var(--ink)!important;font-size:15px!important}.summary hr{border:0;border-top:1px solid var(--border)}.summary .btn{width:100%;margin-top:10px}.notice,.error{margin-top:14px;font-size:12px}.empty{padding:60px;text-align:center;color:var(--muted)}.empty a{color:var(--forest-800);font-weight:700}@media(max-width:850px){.cart-grid{grid-template-columns:1fr}.summary{position:static}.item{grid-template-columns:70px 1fr 90px}.item>strong{grid-column:2}.remove{grid-column:3;grid-row:2}.item img{width:70px}}
  `]
})
export class CartComponent {
  cart=inject(CartService); auth=inject(AuthService); api=inject(ApiService); router=inject(Router);
  loading=false;message='';error='';promoInput='';promoMessage='';promoError='';
  applyPromo(){this.promoError='';this.promoMessage='';const error=this.cart.applyPromoCode(this.promoInput);if(error){this.promoError=error;return;}this.promoMessage='Festival offer applied: 15% off your order.';}
  decrease(id:number){
    this.cart.decrease(id);
  }
  placeOrder(){
    if(!this.auth.isLoggedIn()){this.router.navigateByUrl('/login');return;}
    this.loading=true;this.error='';this.message='';
    const items=this.cart.items().map(i=>({product_id:i.product.id,quantity:i.quantity}));
    this.api.createOrder({items,promo_code:this.cart.discount()?this.cart.promoCode():''}).subscribe({
      next:o=>{this.cart.clear();this.loading=false;this.message=`Order ${o.order_number} created successfully.`;setTimeout(()=>this.router.navigateByUrl('/dashboard/orders'),900);},
      error:e=>{this.loading=false;this.error=e?.error?.detail||'Could not create the order. Please check the API server.';}
    });
  }
}
