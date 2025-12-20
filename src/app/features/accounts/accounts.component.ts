import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AccountService} from './accounts.service';
import {AccountListComponent} from '../../shared/components/account-list/account-list.component';

@Component({
  selector: 'app-home',
  imports: [
    AccountListComponent
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountsComponent {
 constructor(protected accountService: AccountService) {}

  accountList() {
    return this.accountService.accounts();
  }

  reload() {
    this.accountService.reload();
  }
}
