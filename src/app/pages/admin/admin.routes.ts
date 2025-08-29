import {Routes} from '@angular/router';
import {AdminLayout} from './admin-layout/admin-layout';
import {EventManagement} from './event-management/event-management';
import {EmployeeManagement} from './employee-management/employee-management';
import {QrcodeCheckIn} from './qrcode-check-in/qrcode-check-in';
import {NumericCodeCheckIn} from './numeric-code-check-in/numeric-code-check-in';
import {EventDetail} from './event-detail/event-detail';
import {roleGuard} from '../../core/guards/role.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayout,
    canActivate: [roleGuard],
    data: {
      requiredRole: 'ADMIN'
    },
    children: [
      {path: '', redirectTo: 'events', pathMatch: 'full'},
      {path: 'events', component: EventManagement},
      {path: 'events/:id', component: EventDetail},
      {path: 'employees', component: EmployeeManagement},
      {path: 'qrcode', component: QrcodeCheckIn},
      {path: 'numeric-code', component: NumericCodeCheckIn},
    ]
  }
];
