import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const b2bGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn()) return router.createUrlTree(['/login']);

  const user = auth.user();
  if (user) return user.user_type === 'B2B' ? true : router.createUrlTree(['/dashboard']);

  return auth.loadMe().pipe(
    map(profile => profile?.user_type === 'B2B' ? true : router.createUrlTree(['/dashboard']))
  );
};