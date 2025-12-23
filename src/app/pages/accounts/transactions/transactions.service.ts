import {inject, Injectable, signal} from '@angular/core';
import {Account} from '../../../core/types/account.type';
import {ApiService} from '../../../core/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly apiService = inject(ApiService);

  readonly loading = signal(false);

  readonly account = signal<Account | null>(null);

  getAccount(id: number): void {
    this.loading.set(true);
    this.apiService.load().subscribe(accounts => {
      const account = accounts.find((account) => account.id === id);
      if (!account) {
        throw new Error('Account not found');
      }
      this.account.set(account);
      this.loading.set(false);
    })
  }
}
