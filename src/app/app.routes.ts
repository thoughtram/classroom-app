import { DashboardComponent } from './dashboard';
import { LoginComponent } from './login';
import { AuthGuard } from './shared/auth.guard';

export const AppRoutes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];
