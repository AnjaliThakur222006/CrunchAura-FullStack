import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/models/models';
import { ShortenPipe } from '../../../shared/pipes/shorten.pipe';
import { NewBadgeDirective } from '../../../shared/directives/new-badge.directive';

@Component({
  standalone:true, imports:[CommonModule,CurrencyPipe,RouterLink,FormsModule,ShortenPipe,NewBadgeDirective],
  template:`
  <main class="page">
    <section class="shop-head"><div class="container"><span class="eyebrow">Fox nuts · makhana · {{products.length}} flavours</span><h1>Choose your crunch.</h1><p>Roasted fox nuts in savoury and sweet flavours. Festival offer: 15% off ₹999+ with FESTIVE15.</p></div></section>
    <section class="section"><div class="container">
      <div class="toolbar">
        <input [(ngModel)]="query" placeholder="Search flavours, packs…">
        <select [(ngModel)]="category"><option value="All">All flavours</option><option>Classic</option><option>Spiced</option><option>Herbal</option><option>Sweet</option></select>
        <select [(ngModel)]="sort"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
      </div>
      <div class="product-grid">
        <article class="product-card" *ngFor="let p of filtered" [caNewBadge]="p.badge || false">
          <a [routerLink]="['/shop',p.slug]" class="product-img"><img [src]="'/' + p.image" [alt]="p.name + ' fox nuts (makhana)'"></a>
          <div class="product-info"><span>{{p.category}}</span><h3>{{p.name}}</h3><p>{{p.description | shorten:82}}</p><div class="price-row"><strong>{{p.price | currency:'INR':'symbol':'1.0-0'}}</strong><small>{{p.packSize}}</small></div><button class="btn btn-dark add" (click)="cart.add(p)">Add to cart</button></div>
        </article>
      </div>
      <div class="empty" *ngIf="!filtered.length">No flavours match your search. Try “mint”, “masala” or “peri”.</div>
    </div></section>
  </main>
  `,
  styles:[`
    .shop-head{background:var(--forest-950);color:#fff;padding:90px 0}.shop-head h1{margin:18px 0}.shop-head p{color:#d5e0db}
    .toolbar{display:grid;grid-template-columns:1fr 180px 180px;gap:12px;margin-bottom:28px}.toolbar input{background:#fff}.product-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}.product-card{background:#fff;border:1px solid var(--border);border-radius:20px;overflow:hidden;box-shadow:var(--shadow)}.product-img{background:var(--sand);display:block}.product-img img{width:100%;aspect-ratio:1;object-fit:cover}.product-info{padding:20px}.product-info>span{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:var(--gold-dark);font-weight:700}.product-info h3{margin:8px 0}.product-info p{font-size:13px}.price-row{display:flex;justify-content:space-between;align-items:center}.price-row strong{font-size:16px}.price-row small{color:var(--muted)}.add{width:100%;margin-top:15px}.empty{padding:50px;text-align:center;color:var(--muted)}
    @media(max-width:850px){.toolbar{grid-template-columns:1fr 1fr}.toolbar input{grid-column:1/-1}.product-grid{grid-template-columns:1fr 1fr}}@media(max-width:520px){.toolbar{grid-template-columns:1fr}.product-grid{grid-template-columns:1fr}}
  `]
})
export class ShopComponent {
  private api=inject(ApiService); cart=inject(CartService);
  products:Product[]=[]; query=''; category='All'; sort='featured';
  constructor(){this.api.products().subscribe({next:p=>this.products=p,error:()=>{}});}
  get filtered(){
    let data=this.products.filter(p=>(this.category==='All'||p.category===this.category) && `${p.name} ${p.flavor}`.toLowerCase().includes(this.query.toLowerCase()));
    if(this.sort==='low') data=[...data].sort((a,b)=>a.price-b.price);
    if(this.sort==='high') data=[...data].sort((a,b)=>b.price-a.price);
    return data;
  }
}
