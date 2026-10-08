import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/models/models';

@Component({
  standalone:true,imports:[CommonModule,CurrencyPipe,RouterLink],
  template:`
  <main class="page" *ngIf="product; else loading">
    <section class="section"><div class="container detail">
      <div class="visual"><img [src]="'/' + product.image" [alt]="product.name + ' fox nuts (makhana)'"></div>
      <div class="copy"><span class="eyebrow">{{product.category}} · Fox nuts (makhana)</span><h1>{{product.name}}</h1><p class="lead">{{product.description}}</p><div class="price">{{product.price | currency:'INR':'symbol':'1.0-0'}} <small>{{product.packSize}}</small></div><div class="stock" [class.out]="!product.inStock">{{product.inStock?'● In stock':'● Currently unavailable'}}</div><div class="actions"><button class="btn btn-primary" [disabled]="!product.inStock" (click)="cart.add(product)">Add to cart</button><a class="btn btn-light" routerLink="/b2b-export">Bulk / export enquiry</a></div><div class="info"><div><b>Ingredients</b><span>{{product.ingredients}}</span></div><div><b>Botanical name</b><span>Fox nuts, commonly called makhana in India</span></div></div></div>
    </div></section>
  </main>
  <ng-template #loading><div class="section"><div class="container">Loading product…</div></div></ng-template>
  `,
  styles:[`
    .detail{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center}.visual{background:var(--sand);border-radius:28px;overflow:hidden}.visual img{width:100%}.copy h1{margin:18px 0;font-size:clamp(48px,5vw,70px)}.lead{font-size:18px;max-width:580px}.price{font-size:28px;font-weight:700;margin:22px 0}.price small{font-size:13px;color:var(--muted);font-weight:500}.stock{font-size:13px;color:var(--forest-700);font-weight:700}.stock.out{color:var(--danger)}.actions{display:flex;gap:10px;margin:26px 0;flex-wrap:wrap}.info{border-top:1px solid var(--border);margin-top:30px}.info div{display:grid;grid-template-columns:110px 1fr;gap:18px;padding:16px 0;border-bottom:1px solid var(--border);font-size:13px}.info span{color:var(--muted)}@media(max-width:800px){.detail{grid-template-columns:1fr;gap:35px}}
  `]
})
export class ProductDetailComponent {
  private route=inject(ActivatedRoute); private api=inject(ApiService); cart=inject(CartService); product?:Product;
  constructor(){const slug=this.route.snapshot.paramMap.get('slug')||'';this.api.product(slug).subscribe({next:p=>this.product=p,error:()=>{}});}
}
