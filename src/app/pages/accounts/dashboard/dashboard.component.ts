import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {VerticalListComponent} from '../../../shared/components/account-list/vertical-list.component';
import {AccountComponent} from '../../../shared/components/account/account.component';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-home',
  imports: [
    VerticalListComponent,
    AccountComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit{
  private readonly dashboardService = inject(DashboardService);

  readonly accounts = this.dashboardService.accounts;
  readonly loading = this.dashboardService.loading;

  ngOnInit(): void {
    this.dashboardService.getAccounts();
  }

  reload() {
    this.dashboardService.getAccounts();
  }
}
