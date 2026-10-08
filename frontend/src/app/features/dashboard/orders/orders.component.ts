import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { Order } from '../../../core/models/models';

@Component({
  standalone:true,imports:[CommonModule,CurrencyPipe],
  template:`<div class="head"><span class="eyebrow">History</span><h1>Your orders</h1><p>Track every CrunchAura order in one place.</p></div><div class="card list"><div class="row" *ngFor="let o of orders"><div><b>{{o.order_number}}</b><small>{{o.created_at | date:'medium'}}</small><small *ngIf="o.discount">{{o.promo_code}} · saved {{o.discount | currency:'INR':'symbol':'1.0-0'}}</small><p>{{o.items.length}} item(s)</p></div><span>{{o.status}}</span><strong>{{o.total | currency:'INR':'symbol':'1.0-0'}}</strong></div><p *ngIf="!orders.length">No orders yet.</p></div>`,
  styles:[`.head h1{margin:12px 0}.list{padding:0 22px}.row{display:grid;grid-template-columns:1fr 130px 120px;gap:10px;padding:20px 0;border-bottom:1px solid var(--border)}.row:last-child{border-bottom:0}.row small{display:block;color:var(--muted);font-size:11px}.row p{margin:6px 0 0;font-size:12px}.row span{font-size:11px;color:var(--gold-dark);font-weight:700;text-transform:uppercase}@media(max-width:600px){.row{grid-template-columns:1fr 100px}.row strong{grid-column:1/-1}}`]
})
export class OrdersComponent { api=inject(ApiService);orders:Order[]=[];constructor(){this.api.orders().subscribe({next:o=>this.orders=o,error:()=>{}})}}
