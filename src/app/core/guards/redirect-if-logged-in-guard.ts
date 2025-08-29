import {inject} from '@angular/core';
import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {AuthService} from '../service/auth-service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export const redirectIfLoggedInGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authInitialized().pipe(
    map(() => {
      if (authService.isLogged()) {
        const userRole = authService.userRole();
        if (userRole === 'ADMIN') {
          return router.createUrlTree(['/admin']);
        }
        if (userRole === 'EMPLOYEE') {
          return router.createUrlTree(['/employee']);
        }
        return router.createUrlTree(['/']);
      }

      return true;
    })
  );
};
