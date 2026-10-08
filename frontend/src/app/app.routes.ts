import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { b2bGuard } from './core/guards/b2b.guard';
export const routes: Routes = [
  {path:'',loadComponent:()=>import('./features/public/home/home.component').then(m=>m.HomeComponent)},
  {path:'about',loadComponent:()=>import('./features/public/about/about.component').then(m=>m.AboutComponent)},
  {path:'why-makhana',loadComponent:()=>import('./features/public/why-makhana/why-makhana.component').then(m=>m.WhyMakhanaComponent)},
  {path:'shop',loadComponent:()=>import('./features/public/shop/shop.component').then(m=>m.ShopComponent)},
  {path:'shop/:slug',loadComponent:()=>import('./features/public/product-detail/product-detail.component').then(m=>m.ProductDetailComponent)},
  {path:'journal',loadComponent:()=>import('./features/public/journal/journal.component').then(m=>m.JournalComponent)},
  {path:'journal/:slug',loadComponent:()=>import('./features/public/journal/journal-detail.component').then(m=>m.JournalDetailComponent)},
  {path:'cart',loadComponent:()=>import('./features/public/cart/cart.component').then(m=>m.CartComponent)},
  {path:'checkout',loadComponent:()=>import('./features/public/checkout/checkout.component').then(m=>m.CheckoutComponent)},
  {path:'b2b-export',loadComponent:()=>import('./features/public/b2b/b2b.component').then(m=>m.B2bComponent)},
  {path:'contact',loadComponent:()=>import('./features/public/contact/contact.component').then(m=>m.ContactComponent)},
  {path:'login',loadComponent:()=>import('./features/auth/login/login.component').then(m=>m.LoginComponent)},
  {path:'register',loadComponent:()=>import('./features/auth/register/register.component').then(m=>m.RegisterComponent)},
  {path:'dashboard',canActivate:[authGuard],loadComponent:()=>import('./features/dashboard/dashboard-shell.component').then(m=>m.DashboardShellComponent),children:[
    {path:'',loadComponent:()=>import('./features/dashboard/overview/overview.component').then(m=>m.OverviewComponent)},
    {path:'profile',loadComponent:()=>import('./features/dashboard/profile/profile.component').then(m=>m.ProfileComponent)},
    {path:'orders',loadComponent:()=>import('./features/dashboard/orders/orders.component').then(m=>m.OrdersComponent)},
    {path:'feedback',loadComponent:()=>import('./features/dashboard/feedback/feedback.component').then(m=>m.FeedbackComponent)},
    {path:'partner',canActivate:[b2bGuard],loadComponent:()=>import('./features/dashboard/partner/partner.component').then(m=>m.PartnerComponent)}]},
  {path:'**',redirectTo:''}
];
