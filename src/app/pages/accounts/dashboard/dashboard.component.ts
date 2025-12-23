import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {DashboardService} from './dashboard.service';
import {MatButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {RouterLink} from '@angular/router';
import {MaskCardNumberPipe} from '../../../core/pipes/mask-card-number.pipe';
import {CurrencyPipe} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  imports: [
    MatButton,
    MatIconModule,
    MatListModule,
    RouterLink,
    MaskCardNumberPipe,
    CurrencyPipe,
    MatProgressSpinner
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
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
