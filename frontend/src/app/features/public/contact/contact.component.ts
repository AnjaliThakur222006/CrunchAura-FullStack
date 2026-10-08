import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  standalone:true,imports:[CommonModule,FormsModule],
  template:`
  <main class="page">
    <section class="head"><div class="container"><span class="eyebrow">Say hello</span><h1>Let's talk crunch.</h1><p>Questions, retail conversations, feedback or partnerships — keep it simple.</p></div></section>
    <section class="section"><div class="container contact-grid">
      <div><h2>Direct channels.</h2><p>For urgent conversations, use WhatsApp or call. For detailed questions, send the short form.</p><div class="direct"><div class="direct-card"><b>WhatsApp</b><span>Add your official business number before launch.</span></div><div class="direct-card"><b>Phone</b><span>Add your official sales number before launch.</span></div><a href="mailto:hello@crunchaura.com"><b>Email</b><span>hello@crunchaura.com</span></a></div></div>
      <form class="card form" (ngSubmit)="submit()"><div class="form-grid"><div class="field"><label>Name</label><input name="name" [(ngModel)]="form.name" required></div><div class="field"><label>Email</label><input type="email" name="email" [(ngModel)]="form.email" required></div><div class="field full"><label>Phone</label><input name="phone" [(ngModel)]="form.phone"></div><div class="field full"><label>Message</label><textarea rows="6" name="message" [(ngModel)]="form.message" required></textarea></div></div><button class="btn btn-primary" [disabled]="loading">{{loading?'Sending…':'Send message →'}}</button><div class="notice" *ngIf="sent">Thanks — your message has been received.</div><div class="error" *ngIf="error">{{error}}</div></form>
    </div></section>
  </main>
  `,
  styles:[`
    .head{background:var(--forest-950);color:#fff;padding:90px 0}.head h1{margin:18px 0}.head p{color:#d8e4de;max-width:650px}.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:70px}.direct{display:grid;gap:12px;margin-top:28px}.direct a,.direct-card{background:#fff;border:1px solid var(--border);padding:20px;border-radius:16px;display:grid;gap:5px}.direct span{font-size:13px;color:var(--muted)}.form{padding:28px;display:grid;gap:20px}@media(max-width:800px){.contact-grid{grid-template-columns:1fr}}
  `]
})
export class ContactComponent {
  private api=inject(ApiService); form={name:'',email:'',phone:'',message:''}; loading=false; sent=false; error='';
  submit(){this.loading=true;this.sent=false;this.error='';this.api.contact(this.form).subscribe({next:()=>{this.sent=true;this.loading=false;this.form={name:'',email:'',phone:'',message:''}},error:()=>{this.error='Please try again or use WhatsApp.';this.loading=false}})}
}
