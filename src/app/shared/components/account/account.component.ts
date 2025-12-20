import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {Account} from '../../../features/accounts/account.model';
import {CurrencyPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {
  account = input.required<Account>();

  maskedNumber = computed(() => {
    const num = this.account().number;
    return `**** **** **** ${num.slice(-4)}`;
  });
}
