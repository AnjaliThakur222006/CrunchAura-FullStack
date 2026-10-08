import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Feedback } from '../../../core/models/models';

@Component({
  standalone:true,imports:[CommonModule,FormsModule],
  template:`
  <div class="head"><div><span class="eyebrow">Community</span><h1>Your feedback</h1><p>Tell us what worked. Your feedback helps the brand improve.</p></div></div>
  <div class="grid">
    <form class="card form" (ngSubmit)="submit()"><h3>Share feedback</h3><label>Rating</label><select name="rating" [(ngModel)]="form.rating"><option [ngValue]="5">5 — Loved it</option><option [ngValue]="4">4 — Great</option><option [ngValue]="3">3 — Good</option><option [ngValue]="2">2 — Needs work</option><option [ngValue]="1">1 — Not for me</option></select><label>Product ID (optional)</label><input name="product" type="number" [(ngModel)]="form.product"><label>Your comment</label><textarea rows="5" name="comment" [(ngModel)]="form.comment" required></textarea><button class="btn btn-primary">Post feedback</button></form>
    <section class="card list"><h3>Posted by you</h3><article *ngFor="let f of feedback"><div class="rating">{{'★'.repeat(f.rating)}}<small>{{f.created_at | date:'mediumDate'}}</small></div><p>{{f.comment}}</p><button class="delete" (click)="remove(f.id)">Delete</button></article><p *ngIf="!feedback.length">No feedback yet.</p></section>
  </div>
  `,
  styles:[`.head{margin-bottom:24px}.head h1{margin:12px 0}.grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:20px}.form,.list{padding:24px;display:grid;gap:12px}.form h3,.list h3{font-family:"DM Sans";font-size:16px}.rating{color:var(--gold-dark)}.rating small{color:var(--muted);margin-left:10px}.list article{border-top:1px solid var(--border);padding-top:16px;position:relative}.list article p{padding-right:50px}.delete{border:0;background:none;color:var(--danger);font-size:11px;position:absolute;right:0;top:16px}@media(max-width:800px){.grid{grid-template-columns:1fr}}`]
})
export class FeedbackComponent {
  private api=inject(ApiService);feedback:Feedback[]=[];form:any={rating:5,product:null,comment:''};
  constructor(){this.load();}
  load(){this.api.feedback().subscribe({next:f=>this.feedback=f,error:()=>{}})}
  submit(){if(!this.form.comment.trim())return;this.api.createFeedback(this.form).subscribe({next:()=>{this.form={rating:5,product:null,comment:''};this.load()}})}
  remove(id:number){this.api.deleteFeedback(id).subscribe(()=>this.load())}
}
