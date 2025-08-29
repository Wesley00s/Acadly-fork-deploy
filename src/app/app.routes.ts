import { Routes } from '@angular/router';
import {AdminLogin} from './pages/admin-login/admin-login';
import { EmployeeLogin } from './pages/employee-login/employee-login';
import {PublicLayout} from './layouts/public-layout/public-layout';
import {authGuard} from './core/guards/auth.guard';
import {redirectIfLoggedInGuard} from './core/guards/redirect-if-logged-in-guard';

export const routes: Routes = [
  { path: 'admin/login', component: AdminLogin },
  { path: 'employee/login', component: EmployeeLogin },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: 'employee',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/admin/employee.routes').then(m => m.EMPLOYEE_ROUTES)
  },
  {
    path: '',
    component: PublicLayout,
    canActivate: [redirectIfLoggedInGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage)
      },
      {
        path: 'about-us',
        loadComponent: () => import('./pages/about/about').then(m => m.About)
      },
      {
        path: 'privacy-policy',
        loadComponent: () => import('./pages/privacy-policy/privacy-policy').then(m => m.PrivacyPolicy)
      },
      {
        path: 'terms-of-use',
        loadComponent: () => import('./pages/terms-of-use/terms-of-use').then(m => m.TermsOfUse)
      },
      { path: '**', redirectTo: '' }
    ]
  },
]
