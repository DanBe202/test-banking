import {Injectable, signal} from '@angular/core';
import * as accountData from '../../assets/accounts.json';
import {Account} from './account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountsSignal = signal<Account[]>(accountData.accounts);

  readonly accounts = this.accountsSignal.asReadonly();
  readonly isLoading = signal(false);

  getAccountById(id: number) {
    return this.accountsSignal().find(account => account.id === id);
  }

  reload() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.accountsSignal.set([...accountData.accounts]);
      this.isLoading.set(false);
    }, 2000);
  }
}
