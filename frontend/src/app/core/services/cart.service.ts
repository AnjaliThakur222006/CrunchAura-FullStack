import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/models';

export interface CartItem { product: Product; quantity: number; }

@Injectable({providedIn:'root'})
export class CartService {
  private readonly storageKey = 'crunchaura_cart';
  items = signal<CartItem[]>(this.restoreItems());
  promoCode = signal('');
  count = computed(() => this.items().reduce((sum,i)=>sum+i.quantity,0));
  subtotal = computed(() => this.items().reduce((sum,i)=>sum+i.product.price*i.quantity,0));
  discount = computed(() => this.promoCode()==='FESTIVE15' && this.subtotal()>=999 ? Math.round(this.subtotal()*0.15*100)/100 : 0);
  total = computed(() => this.subtotal()-this.discount());

  add(product: Product) {
    this.items.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      const next = existing
        ? items.map(i => i.product.id === product.id ? {...i,quantity:i.quantity+1} : i)
        : [...items,{product,quantity:1}];
      this.persist(next);
      return next;
    });
  }
  decrease(productId:number) {
    const item=this.items().find(i=>i.product.id===productId);
    if(!item)return;
    if(item.quantity<=1){this.remove(productId);return;}
    this.items.update(items=>{
      const next=items.map(i=>i.product.id===productId?{...i,quantity:i.quantity-1}:i);
      this.persist(next);
      return next;
    });
  }
  remove(productId:number) {
    this.items.update(items=>{
      const next=items.filter(i=>i.product.id!==productId);
      this.persist(next);
      return next;
    });
  }
  applyPromoCode(value:string):string|null {
    const code=value.trim().toUpperCase();
    if(code!=='FESTIVE15')return 'That code is not valid. Check the code and try again.';
    if(this.subtotal()<999)return 'Add products worth ₹999 to unlock 15% off.';
    this.promoCode.set(code);
    return null;
  }
  clear() {
    this.items.set([]);
    this.promoCode.set('');
    this.persist([]);
  }
  private restoreItems():CartItem[] {
    try { return JSON.parse(localStorage.getItem(this.storageKey) || '[]') as CartItem[]; }
    catch { return []; }
  }
  private persist(items:CartItem[]) {
    try { localStorage.setItem(this.storageKey,JSON.stringify(items)); }
    catch { /* Cart still works for the current page if storage is unavailable. */ }
  }
}
