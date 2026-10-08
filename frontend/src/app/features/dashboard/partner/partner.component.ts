import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="partner-page">
      <span class="eyebrow">CrunchAura trade</span>
      <h1>Your partner desk.</h1>
      <p>Welcome, {{auth.user()?.first_name}}. Get wholesale details and start an export conversation for your market.</p>
      <div class="partner-actions">
        <a class="btn btn-primary" routerLink="/b2b-export">Start a trade enquiry</a>
        <a class="btn btn-light" routerLink="/shop">Browse the catalogue</a>
      </div>
      <p class="partner-note">Wholesale pricing, pack formats and shipping terms are confirmed by the CrunchAura team for each market.</p>
    </main>
  `,
  styles: [`
    .partner-page{padding:36px;background:#fff;border:1px solid var(--border);border-radius:18px;min-height:340px}
    .partner-page h1{margin:18px 0;font-size:48px}.partner-page>p{max-width:620px}
    .partner-actions{display:flex;gap:12px;flex-wrap:wrap;margin:24px 0}.partner-note{font-size:13px}
    @media(max-width:520px){.partner-page{padding:24px}.partner-page h1{font-size:40px}}
  `]
})
export class PartnerComponent {
  auth = inject(AuthService);
}