import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  standalone:true,imports:[CommonModule,FormsModule],
  template:`
  <main class="page">
    <section class="b2b-hero"><div class="container"><span class="eyebrow">B2B · Export</span><h1>One Indian crunch.<br><em>Many global tables.</em></h1><p>Tell us what your market needs. Our team can use this enquiry to start a catalogue, volume and flavour conversation.</p></div></section>
    <section class="section"><div class="container b2b-grid">
      <div><h2>Built for the first serious conversation.</h2><div class="points"><div><b>01</b><span>Flavour catalogue</span></div><div><b>02</b><span>Bulk quantity discussion</span></div><div><b>03</b><span>Country + market context</span></div><div><b>04</b><span>Follow-up through admin</span></div></div></div>
      <form class="card form" (ngSubmit)="submit()"><div class="form-grid"><div class="field"><label>Company</label><input name="company" [(ngModel)]="form.company" required></div><div class="field"><label>Contact person</label><input name="contact_person" [(ngModel)]="form.contact_person" required></div><div class="field"><label>Business email</label><input type="email" name="email" [(ngModel)]="form.email" required></div><div class="field"><label>Country</label><input name="country" [(ngModel)]="form.country" required></div><div class="field"><label>Expected monthly quantity</label><input name="quantity" [(ngModel)]="form.quantity" placeholder="e.g. 500 kg"></div><div class="field"><label>Product interest</label><select name="product_interest" [(ngModel)]="form.product_interest"><option>Classic</option><option>Spiced</option><option>Herbal</option><option>Sweet</option><option>Mixed catalogue</option></select></div><div class="field full"><label>Message</label><textarea rows="5" name="message" [(ngModel)]="form.message"></textarea></div></div><button class="btn btn-primary" [disabled]="loading">{{loading?'Sending…':'Submit export enquiry →'}}</button><div class="notice" *ngIf="sent">Enquiry submitted. The CrunchAura team can now follow up from the admin panel.</div><div class="error" *ngIf="error">{{error}}</div></form>
    </div></section>
  </main>
  `,
  styles:[`
    .b2b-hero{background:var(--forest-950);color:#fff;padding:100px 0}.b2b-hero h1{margin:18px 0}.b2b-hero em{color:var(--gold);font-style:normal}.b2b-hero p{color:#d7e1dc;max-width:700px;font-size:18px}.b2b-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:70px}.points{display:grid;gap:12px;margin-top:28px}.points div{display:flex;gap:18px;padding:20px;border:1px solid var(--border);border-radius:14px;background:#fff}.points b{color:var(--gold-dark)}.form{padding:28px;display:grid;gap:20px}@media(max-width:850px){.b2b-grid{grid-template-columns:1fr}}
  `]
})
export class B2bComponent {
  private api=inject(ApiService); loading=false;sent=false;error='';
  form={company:'',contact_person:'',email:'',country:'',quantity:'',product_interest:'Classic',message:''};
  submit(){this.loading=true;this.error='';this.api.b2b(this.form).subscribe({next:()=>{this.sent=true;this.loading=false},error:()=>{this.error='Could not submit. Please check the API server.';this.loading=false}})}
}
