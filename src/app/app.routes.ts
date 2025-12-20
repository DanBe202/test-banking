import {Routes} from '@angular/router';
import {AuthComponent} from './core/auth/auth.component';
import {AccountsComponent} from './features/accounts/accounts.component';
import {authGuard} from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: AuthComponent},
  { path: 'accounts', component: AccountsComponent,canActivate: [authGuard]},
  { path: '', redirectTo: '/accounts', pathMatch: 'full' },
];
