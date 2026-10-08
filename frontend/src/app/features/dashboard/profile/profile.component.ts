import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone:true,imports:[ReactiveFormsModule,CommonModule],
  template:`
  <div class="head"><span class="eyebrow">Account</span><h1>Profile</h1><p>Keep your customer details current.</p></div>
  <form class="card form" [formGroup]="form" (ngSubmit)="save()"><div class="form-grid"><div class="field"><label>First name</label><input formControlName="first_name"></div><div class="field"><label>Last name</label><input formControlName="last_name"></div><div class="field"><label>Email</label><input formControlName="email"></div><div class="field"><label>Phone</label><input formControlName="phone"></div><div class="field"><label>Account type</label><p class="account-type">{{auth.user()?.user_type}}</p></div><div class="field"><label>Favourite flavour</label><input formControlName="favorite_flavor"></div></div><button class="btn btn-primary">Save profile</button><div class="notice" *ngIf="saved">Profile updated successfully.</div></form>
  `,
  styles:[`.head h1{margin:12px 0}.form{padding:26px;display:grid;gap:20px}.account-type{margin:0;padding:13px 14px;border:1px solid var(--border);border-radius:12px;background:#f6f3ed}`]
})
export class ProfileComponent {
  private fb=inject(FormBuilder);auth=inject(AuthService);saved=false;
  form=this.fb.nonNullable.group({first_name:'',last_name:'',email:['',[Validators.required,Validators.email]],phone:'',favorite_flavor:'Classic'});
  constructor(){const u=this.auth.user();if(u)this.form.patchValue({first_name:u.first_name,last_name:u.last_name,email:u.email,phone:u.phone,favorite_flavor:u.favorite_flavor});}
  save(){if(this.form.invalid)return;this.auth.updateProfile(this.form.getRawValue()).subscribe(()=>this.saved=true);}
}
