import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Feedback, Order, Product } from '../models/models';

@Injectable({providedIn:'root'})
export class ApiService {
  private base = environment.apiUrl;
  constructor(private http: HttpClient) {}

  products() { return this.http.get<Product[]>(`${this.base}/products/`); }
  product(slug: string) { return this.http.get<Product>(`${this.base}/products/by-slug/${slug}/`); }
  feedback() { return this.http.get<Feedback[]>(`${this.base}/feedback/`); }
  createFeedback(data: Partial<Feedback>) { return this.http.post<Feedback>(`${this.base}/feedback/`, data); }
  updateFeedback(id:number,data:Partial<Feedback>) { return this.http.put<Feedback>(`${this.base}/feedback/${id}/`,data); }
  deleteFeedback(id:number) { return this.http.delete(`${this.base}/feedback/${id}/`); }
  orders() { return this.http.get<Order[]>(`${this.base}/orders/`); }
  createOrder(data:{items:{product_id:number;quantity:number}[];promo_code?:string}) { return this.http.post<Order>(`${this.base}/orders/`,data); }
  contact(data:any) { return this.http.post(`${this.base}/contact/`,data); }
  b2b(data:any) { return this.http.post(`${this.base}/b2b/enquiries/`,data); }
}
