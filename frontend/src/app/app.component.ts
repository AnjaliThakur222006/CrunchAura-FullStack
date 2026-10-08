import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { CartService } from './core/services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <a class="announcement" routerLink="/shop"><span>Crafted in India</span> · Premium makhana for modern snacking · <strong>Explore the collection →</strong></a>
    <header class="site-header">
      <div class="container nav">
        <a class="brand" routerLink="/" aria-label="CrunchAura home"><img src="/assets/logo.svg" alt="CrunchAura"></a>
        <button class="menu-btn" (click)="menuOpen=!menuOpen" aria-label="Toggle navigation">☰</button>
        <nav [class.open]="menuOpen">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="menuOpen=false">Home</a>
          <a routerLink="/about" routerLinkActive="active" (click)="menuOpen=false">Our Story</a>
          <a routerLink="/shop" routerLinkActive="active" (click)="menuOpen=false">Shop</a>
          <a routerLink="/why-makhana" routerLinkActive="active" (click)="menuOpen=false">Why Makhana</a>
          <a routerLink="/journal" routerLinkActive="active" (click)="menuOpen=false">Journal</a>
          <a routerLink="/b2b-export" routerLinkActive="active" (click)="menuOpen=false">B2B</a>
        </nav>
        <div class="nav-actions">
          <a [routerLink]="auth.isLoggedIn()?'/dashboard':'/login'" class="nav-icon" [attr.aria-label]="auth.isLoggedIn()?'Dashboard':'Login'">◯</a>
          <a routerLink="/cart" class="cart-link" aria-label="Shopping cart">🛒<span>{{cart.count()}}</span></a>
        </div>
      </div>
    </header>
    <router-outlet></router-outlet>
    <footer class="footer">
      <div class="container footer-main">
        <div class="footer-brand"><img src="/assets/logo.svg" alt="CrunchAura" class="footer-logo"><p>Premium makhana from India, designed for mindful everyday snacking and thoughtful global partnerships.</p><a class="footer-quote" routerLink="/b2b-export">Talk to our team →</a></div>
        <div><h4>Shop</h4><a routerLink="/shop">All flavours</a><a routerLink="/shop">Best sellers</a><a routerLink="/cart">Your basket</a></div>
        <div><h4>Discover</h4><a routerLink="/about">Our story</a><a routerLink="/why-makhana">Why makhana</a><a routerLink="/journal">Journal</a></div>
        <div><h4>Business</h4><a routerLink="/b2b-export">Bulk supply</a><a routerLink="/b2b-export">Private label</a><a routerLink="/contact">Contact</a></div>
      </div>
      <div class="container newsletter"><div><span class="eyebrow">The Crunch Letter</span><h3>Good things, occasionally.</h3></div><div class="newsletter-form"><input aria-label="Email address" placeholder="Your email address"><button class="btn btn-primary">Subscribe</button></div></div>
      <div class="footer-bottom"><div class="container"><span>© {{year}} CrunchAura</span><span>Angular + Django REST</span><span>Made in India</span></div></div>
    </footer>
  `,
  styles: [`
    .announcement{display:block;text-align:center;background:var(--forest-950);color:#dce7e1;padding:10px 14px;font-size:11px;letter-spacing:.04em}.announcement span{color:var(--gold)}.announcement strong{color:#fff;margin-left:5px}
    .site-header{position:sticky;top:0;z-index:50;background:rgba(253,251,247,.92);backdrop-filter:blur(18px);border-bottom:1px solid var(--border)}.nav{height:76px;display:flex;align-items:center;gap:30px}.brand{width:174px}.brand img{width:100%}nav{display:flex;justify-content:center;align-items:center;gap:25px;flex:1}nav a{font-size:12px;color:#4d5b54;padding:29px 0;position:relative}nav a.active{color:var(--forest-950);font-weight:700}nav a.active:after{content:"";position:absolute;left:0;right:0;bottom:20px;height:2px;background:var(--gold)}.nav-actions{display:flex;gap:14px;align-items:center}.nav-icon{font-size:20px}.cart-link{position:relative;font-size:16px}.cart-link span{position:absolute;right:-10px;top:-10px;width:18px;height:18px;border-radius:50%;display:grid;place-items:center;background:var(--gold);font-size:10px;font-weight:700}.menu-btn{display:none;border:0;background:transparent;font-size:22px}
    .footer{margin-top:80px;background:#102f27;color:#dce6e0}.footer-main{display:grid;grid-template-columns:2.1fr 1fr 1fr 1fr;gap:40px;padding:68px 0 54px}.footer-logo{width:185px;filter:brightness(0) invert(1);margin-bottom:18px}.footer p{max-width:390px;color:#aebdb6;font-size:13px}.footer h4{font-family:"DM Sans",sans-serif;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#fff;margin:4px 0 20px}.footer-main a{display:block;color:#aebdb6;font-size:13px;margin:11px 0}.footer-main a:hover{color:#fff}.footer-quote{color:var(--gold)!important;font-weight:700}.newsletter{border-top:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);padding:30px 0;display:flex;justify-content:space-between;align-items:center;gap:30px}.newsletter h3{font-family:"Cormorant Garamond",serif;font-size:32px;color:#fff;margin-top:6px}.newsletter .eyebrow{color:var(--gold)}.newsletter-form{display:flex;gap:8px;width:min(440px,100%)}.newsletter-form input{background:#fff;border:0}.footer-bottom{padding:18px 0;color:#84978f;font-size:11px}.footer-bottom .container{display:flex;justify-content:space-between;gap:20px}
    @media(max-width:900px){nav{gap:14px}.footer-main{grid-template-columns:2fr 1fr 1fr}.newsletter{display:grid}.newsletter-form{width:100%}}@media(max-width:720px){.nav{height:66px}.brand{width:150px}.menu-btn{display:block;margin-left:auto}nav{display:none;position:absolute;top:66px;left:14px;right:14px;background:#fff;border:1px solid var(--border);border-radius:18px;padding:8px;box-shadow:var(--shadow);flex-direction:column;align-items:stretch;gap:0}nav.open{display:flex}nav a{padding:13px 14px}nav a.active:after{display:none}.footer-main{grid-template-columns:1fr 1fr}.footer-brand{grid-column:1/-1}}@media(max-width:480px){.footer-main{grid-template-columns:1fr}.footer-bottom .container{display:grid}.newsletter-form{display:grid}.newsletter-form .btn{width:100%}}
  `]
})
export class AppComponent { auth=inject(AuthService); cart=inject(CartService); menuOpen=false; year=new Date().getFullYear(); }
