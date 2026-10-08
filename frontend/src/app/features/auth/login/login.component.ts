import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone:true,imports:[CommonModule,FormsModule,RouterLink],
  template:`
  <main class="auth page"><div class="auth-card card"><div class="brand"><img src="/assets/logo.svg" alt="CrunchAura"></div><span class="eyebrow">Welcome back</span><h1>Your CrunchAura account.</h1><p>Manage profile, orders and community feedback in one place.</p><form (ngSubmit)="submit()"><div class="field"><label>Email</label><input type="email" name="email" [(ngModel)]="email" required></div><div class="field"><label>Password</label><input type="password" name="password" [(ngModel)]="password" required></div><button class="btn btn-primary" [disabled]="loading">{{loading?'Signing in…':'Sign in'}}</button><div class="error" *ngIf="error">{{error}}</div></form><div class="switch">New here? <a routerLink="/register">Create an account →</a></div></div></main>
  `,
  styles:[`.auth{display:grid;place-items:center;padding:70px 15px}.auth-card{width:min(470px,100%);padding:34px}.brand{width:190px;margin-bottom:35px}.auth-card h1{font-size:44px;margin:15px 0}.auth-card form{display:grid;gap:17px;margin-top:24px}.auth-card .btn{width:100%}.switch{margin-top:22px;text-align:center;font-size:13px;color:var(--muted)}.switch a{color:var(--forest-800);font-weight:700}`]
})
export class LoginComponent {
  private auth=inject(AuthService); private router=inject(Router);
  email='';password='';loading=false;error='';
  submit(){this.loading=true;this.error='';this.auth.login(this.email,this.password).subscribe({next:()=>this.router.navigateByUrl(this.auth.user()?.user_type==='B2B'?'/dashboard/partner':'/dashboard'),error:()=>{this.error='Invalid email or password.';this.loading=false}})}
}
