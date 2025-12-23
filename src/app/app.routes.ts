import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent),
    canActivate: []
  },
  {
    path: 'accounts',
    loadComponent: () => import('./pages/accounts/accounts.component').then((c) => c.AccountsComponent),
    loadChildren: () => import('./pages/accounts/accounts.routes'),
    canActivate: [authGuard]
  },
  {path: '', redirectTo: '/accounts', pathMatch: 'full'},
];
