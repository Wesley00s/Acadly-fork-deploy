import { Routes } from '@angular/router';
import {AdminLayout} from './admin-layout/admin-layout';
import {QrcodeCheckIn} from './qrcode-check-in/qrcode-check-in';
import {NumericCodeCheckIn} from './numeric-code-check-in/numeric-code-check-in';
import {roleGuard} from '../../core/guards/role.guard';

export const EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayout,
    canActivate: [roleGuard],
    data: {
      requiredRole: 'EMPLOYEE'
    },
    children: [
      { path: '', redirectTo: 'qrcode', pathMatch: 'full' },
      { path: 'qrcode', component: QrcodeCheckIn },
      { path: 'numeric-code', component: NumericCodeCheckIn },
    ]
  }
];
