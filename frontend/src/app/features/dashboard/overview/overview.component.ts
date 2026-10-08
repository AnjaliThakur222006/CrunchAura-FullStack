import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { Order } from '../../../core/models/models';

@Component({
  standalone:true,imports:[CommonModule,RouterLink,CurrencyPipe],
  template:`
  <div class="head"><div><span class="eyebrow">Your space</span><h1>Good to see you, {{auth.user()?.first_name || 'there'}}.</h1><p>Here is the simple view of your CrunchAura activity.</p></div><a class="btn btn-primary" routerLink="/shop">Shop flavours</a></div>
  <div class="stats"><div><small>Community points</small><b>{{auth.user()?.points || 0}}</b></div><div><small>Your orders</small><b>{{orders.length}}</b></div><div><small>Account type</small><b>{{auth.user()?.user_type || 'B2C'}}</b></div><div><small>Cart items</small><b>Ready</b></div></div>
  <section class="card panel"><div class="panel-head"><h3>Recent orders</h3><a routerLink="/dashboard/orders">View all →</a></div><div *ngIf="orders.length;else empty"><div class="order" *ngFor="let o of orders.slice(0,3)"><div><b>{{o.order_number}}</b><small>{{o.created_at | date:'mediumDate'}}</small></div><span>{{o.status}}</span><strong>{{o.total | currency:'INR':'symbol':'1.0-0'}}</strong></div></div><ng-template #empty><p>No orders yet. Your first flavour is waiting.</p></ng-template></section>
  `,
  styles:[`.head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:24px}.head h1{margin:14px 0;font-size:48px}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px}.stats div{background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px}.stats small{display:block;color:var(--muted);font-size:12px}.stats b{display:block;margin-top:8px;font-size:22px}.panel{padding:22px}.panel-head{display:flex;justify-content:space-between;align-items:center}.panel-head h3{font-family:"DM Sans";font-size:16px}.panel-head a{font-size:12px;font-weight:700;color:var(--forest-800)}.order{display:grid;grid-template-columns:1fr 130px 100px;gap:10px;align-items:center;padding:16px 0;border-top:1px solid var(--border)}.order small{display:block;font-size:11px}.order span{font-size:11px;text-transform:uppercase;color:var(--gold-dark);font-weight:700}@media(max-width:800px){.stats{grid-template-columns:1fr 1fr}.head{align-items:start;display:grid}}@media(max-width:520px){.order{grid-template-columns:1fr 90px}.order strong{grid-column:1/-1}}
  `]
})
export class OverviewComponent {
  auth=inject(AuthService);api=inject(ApiService);orders:Order[]=[];
  constructor(){this.api.orders().subscribe({next:o=>this.orders=o,error:()=>{}});}
}
