import {inject, Injectable, signal} from '@angular/core';
import {Account} from '../../../core/types/account.type';
import {TransactionForm} from '../../../core/types/transaction.type';
import {ApiService} from '../../../core/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private readonly apiService = inject(ApiService);

  readonly accounts = signal<Account[]>([]);
  readonly account = signal<Account | null>(null);
  readonly loading = signal(false);


  getAccounts(id: number): void {
    this.loading.set(true);
    this.apiService.load().subscribe(accounts => {
      this.accounts.set(accounts);
      const account = accounts.find((account) => account.id === id);
      if (!account) {
        throw new Error('Account not found');
      }
      this.account.set(account);
      this.loading.set(false);
    })
  }

  addTransaction(transactionForm: TransactionForm): void {
    this.apiService.createTransaction(transactionForm);
  }
}
