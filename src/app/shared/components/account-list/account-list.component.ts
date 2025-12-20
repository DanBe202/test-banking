import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Account} from '../../../features/accounts/account.model';
import {AccountComponent} from '../account/account.component';

@Component({
  selector: 'app-account-list',
  imports: [
    AccountComponent
  ],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountListComponent {
  accounts = input.required<Account[]>();

  isLoading = input<boolean>(false);
}
