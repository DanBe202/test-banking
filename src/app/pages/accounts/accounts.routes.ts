import {Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/dashboard.component').then((c) => c.DashboardComponent),
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            loadComponent: () => import('./transactions/transactions.component').then((c) => c.TransactionsComponent),
          },
          {
            path: 'transfer',
            loadComponent: () => import('./transfer/transfer.component').then((c) => c.TransferComponent)
          }
        ]
      },
    ]
  },
];

export default routes;
