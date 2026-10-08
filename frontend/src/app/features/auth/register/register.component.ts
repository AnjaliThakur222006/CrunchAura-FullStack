import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone:true,imports:[CommonModule,ReactiveFormsModule,RouterLink],
  template:`
  <main class="auth page"><div class="auth-card card"><div class="brand"><img src="/assets/logo.svg" alt="CrunchAura"></div><span class="eyebrow">Join the community</span><h1>Build your CrunchAura profile.</h1><p>Two quick steps. We keep the experience useful, not noisy.</p>
  <div class="steps"><span [class.active]="step===1">01 Account</span><span [class.active]="step===2">02 Preferences</span></div>
  <form [formGroup]="form" (ngSubmit)="submit()">
    <ng-container *ngIf="step===1"><div class="two"><div class="field"><label>First name</label><input formControlName="first_name"></div><div class="field"><label>Last name</label><input formControlName="last_name"></div></div><div class="field"><label>Email</label><input type="email" formControlName="email"></div><div class="field"><label>Phone</label><input formControlName="phone"></div><div class="field"><label>Password</label><input type="password" formControlName="password"></div><div class="field"><label>Confirm password</label><input type="password" formControlName="confirm_password"></div><button type="button" class="btn btn-primary" (click)="next()">Continue →</button></ng-container>
    <ng-container *ngIf="step===2"><div class="field"><label>How will you use CrunchAura?</label><select formControlName="user_type"><option value="B2C">Shop for myself (B2C)</option><option value="B2B">Wholesale or export partner (B2B)</option></select><small>B2B accounts get a partner workspace for trade enquiries.</small></div><div class="field"><label>Favourite flavour</label><select formControlName="favorite_flavor"><option>Classic</option><option>Smoky Peri-Peri</option><option>Cool Mint</option><option>Royal Masala</option><option>Cocoa Crunch</option><option>Cheese Chilli</option><option>Himalayan Pink Salt</option><option>Lime Chilli</option><option>Rose Cardamom</option><option>Garden Herb</option></select></div><label class="check"><input type="checkbox" formControlName="marketing_consent"> I want occasional product updates.</label><div class="actions"><button type="button" class="btn btn-light" (click)="step=1">← Back</button><button class="btn btn-primary" [disabled]="loading">{{loading?'Creating…':'Create account'}}</button></div></ng-container>
    <div class="error" *ngIf="error">{{error}}</div>
  </form><div class="switch">Already have an account? <a routerLink="/login">Sign in →</a></div>
  </div></main>
  `,
  styles:[`.auth{display:grid;place-items:center;padding:70px 15px}.auth-card{width:min(520px,100%);padding:34px}.brand{width:190px;margin-bottom:35px}.auth-card h1{font-size:44px;margin:15px 0}.auth-card form{display:grid;gap:17px;margin-top:24px}.two{display:grid;grid-template-columns:1fr 1fr;gap:12px}.steps{display:flex;gap:8px;margin:25px 0}.steps span{padding:8px 10px;border-radius:999px;background:#f0ece4;font-size:11px;color:var(--muted)}.steps span.active{background:var(--forest-950);color:#fff}.check{display:flex;gap:8px;align-items:center;font-size:13px}.check input{width:auto}.actions{display:flex;gap:10px}.actions .btn{flex:1}.switch{text-align:center;margin-top:22px;font-size:13px;color:var(--muted)}.switch a{font-weight:700;color:var(--forest-800)}@media(max-width:500px){.two{grid-template-columns:1fr}}`]
})
export class RegisterComponent {
  private fb=inject(FormBuilder);private auth=inject(AuthService);private router=inject(Router);
  step=1;loading=false;error='';
  form=this.fb.nonNullable.group({
    first_name:['',Validators.required],last_name:['',Validators.required],email:['',[Validators.required,Validators.email]],
    phone:['',[Validators.required,Validators.pattern(/^\+?[\d\s()-]{10,20}$/)]],password:['',[Validators.required,Validators.minLength(8)]],
    confirm_password:['',Validators.required],user_type:this.fb.nonNullable.control<'B2C'|'B2B'>('B2C'),favorite_flavor:['Classic'],marketing_consent:[false]
  });
  next(){const controls=['first_name','last_name','email','phone','password','confirm_password'];if(controls.some(k=>this.form.controls[k as keyof typeof this.form.controls].invalid)){this.form.markAllAsTouched();this.error='Check the required fields: use a valid email, 10–15 digit phone number and password of at least 8 characters.';return}if(this.form.value.password!==this.form.value.confirm_password){this.error='Passwords do not match.';return}this.error='';this.step=2;}
  submit(){if(this.form.invalid){this.form.markAllAsTouched();this.error='Please complete the required account and preference fields.';return}this.loading=true;this.error='';const {confirm_password,...payload}=this.form.getRawValue();this.auth.register(payload).subscribe({next:()=>this.router.navigateByUrl(this.auth.user()?.user_type==='B2B'?'/dashboard/partner':'/dashboard'),error:(e)=>{this.error=e?.error?.email?'That email is already registered.':e?.error?.phone?.[0]||e?.error?.detail||'Registration failed. Check your details and try again.';this.loading=false}})}
}
