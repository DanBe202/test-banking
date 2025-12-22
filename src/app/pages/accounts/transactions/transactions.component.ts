import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {TransactionComponent} from '../../../shared/components/transaction/transaction.component';
import {AccountService} from '../accounts.service';
import {ActivatedRoute, Router} from '@angular/router';
import {VerticalListComponent} from '../../../shared/components/account-list/vertical-list.component';

@Component({
  selector: 'app-transactions',
  imports: [
    TransactionComponent,
    VerticalListComponent
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsComponent {
  protected accountService = inject(AccountService)
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly accountId = this.route.snapshot.paramMap.get('id');
  isLoading = signal(false);

  transactions = this.accountService.getTransactionsByAccountId(Number(this.accountId));

  addTransaction() {
    this.router.navigate(['/accounts', this.accountId, 'transfer']);
  }
}
