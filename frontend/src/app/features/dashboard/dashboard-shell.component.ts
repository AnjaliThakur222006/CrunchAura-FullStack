import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  standalone:true,imports:[CommonModule,RouterLink,RouterLinkActive,RouterOutlet],
  template:`
  <main class="dash page">
    <div class="container dash-grid">
      <aside class="sidebar">
        <div class="user"><div class="avatar">{{initials}}</div><div><b>{{auth.user()?.first_name || 'Customer'}}</b><small>{{auth.user()?.user_type || 'B2C'}}</small></div></div>
        <nav><a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Overview</a><a routerLink="/dashboard/profile" routerLinkActive="active">Profile</a><a routerLink="/dashboard/orders" routerLinkActive="active">Orders</a><a routerLink="/dashboard/feedback" routerLinkActive="active">Feedback</a><a *ngIf="auth.user()?.user_type==='B2B'" routerLink="/dashboard/partner" routerLinkActive="active">Partner desk</a><a routerLink="/shop">Shop</a></nav>
        <button class="btn btn-light logout" (click)="logout()">Sign out</button>
      </aside>
      <section class="content"><router-outlet></router-outlet></section>
    </div>
  </main>
  `,
  styles:[`.dash{padding:38px 0 70px}.dash-grid{display:grid;grid-template-columns:240px 1fr;gap:26px}.sidebar{background:var(--forest-950);color:#fff;border-radius:22px;padding:20px;align-self:start;position:sticky;top:100px}.user{display:flex;gap:12px;align-items:center;padding:8px 4px 22px;border-bottom:1px solid rgba(255,255,255,.14)}.avatar{width:42px;height:42px;border-radius:50%;background:var(--gold);color:var(--forest-950);display:grid;place-items:center;font-weight:800}.user b{display:block}.user small{color:#c8d6d0}.sidebar nav{display:grid;gap:5px;margin:18px 0}.sidebar nav a{padding:11px 12px;border-radius:10px;color:#cbd8d2;font-size:13px}.sidebar nav a.active,.sidebar nav a:hover{background:rgba(255,255,255,.1);color:#fff}.logout{width:100%;margin-top:8px}.content{min-width:0}@media(max-width:800px){.dash-grid{grid-template-columns:1fr}.sidebar{position:static}.sidebar nav{display:flex;overflow:auto}.sidebar nav a{white-space:nowrap}.logout{width:auto}}
  `]
})
export class DashboardShellComponent {
  auth=inject(AuthService);cart=inject(CartService);
  get initials(){const u=this.auth.user();return `${u?.first_name?.[0]||'C'}${u?.last_name?.[0]||''}`.toUpperCase();}
  logout(){this.auth.logout();location.href='/';}
}
