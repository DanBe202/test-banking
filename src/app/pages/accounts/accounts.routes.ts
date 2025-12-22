import {Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component').then((c) => c.DashboardComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./transactions/transactions.component').then((c) => c.TransactionsComponent),
    children: [
      {
        path: 'transfer',
        loadComponent: () => import('./transfer/transfer.component').then((c) => c.TransferComponent)
      }
    ]
  },
];

export default routes;
