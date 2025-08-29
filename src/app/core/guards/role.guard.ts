import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastService } from '../service/toast-service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  const requiredRole = route.data['requiredRole'] as 'ADMIN' | 'EMPLOYEE';

  return authService.authInitialized().pipe(
    map(() => {
      if (!authService.isLogged()) {
        toastService.showError('Você precisa fazer login para acessar esta página.');
        router.navigate(['/admin/login']);
        return false;
      }

      if (authService.userRole() !== requiredRole) {
        toastService.showError('Você não tem permissão para acessar esta página.');
        router.navigate(['/']);

        return false;
      }

      return true;
    })
  );
};
