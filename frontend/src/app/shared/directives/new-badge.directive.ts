import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({selector:'[caNewBadge]',standalone:true})
export class NewBadgeDirective implements OnInit {
  @Input() caNewBadge: string | false = false;
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    if (!this.caNewBadge) return;
    this.renderer.setStyle(this.el.nativeElement,'position','relative');
    const badge = this.renderer.createElement('span');
    badge.textContent = this.caNewBadge;
    this.renderer.setStyle(badge,'position','absolute');
    this.renderer.setStyle(badge,'top','12px');
    this.renderer.setStyle(badge,'left','12px');
    this.renderer.setStyle(badge,'background','#c8a85b');
    this.renderer.setStyle(badge,'color','#17211d');
    this.renderer.setStyle(badge,'padding','5px 8px');
    this.renderer.setStyle(badge,'border-radius','999px');
    this.renderer.setStyle(badge,'font-size','10px');
    this.renderer.setStyle(badge,'font-weight','700');
    this.renderer.appendChild(this.el.nativeElement,badge);
  }
}
