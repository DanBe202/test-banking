import {inject, Injectable} from '@angular/core';
import {Account} from '../types/account.type';
import {delay, Observable, of, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TransactionForm} from '../types/transaction.type';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly localStorageAccountsKey = 'accounts';

  load(): Observable<Account[]> {
    const localStorageAccounts = localStorage.getItem(this.localStorageAccountsKey);
    if (localStorageAccounts) {
      const accounts: Account[] = JSON.parse(localStorageAccounts);
      return of(accounts).pipe(delay(1000));
    }
    return this.http.get<Account[]>('/api/accounts.json')
      .pipe(
        delay(1000),
        tap((accounts) => localStorage.setItem(this.localStorageAccountsKey, JSON.stringify(accounts))));
  }

  createTransaction(transaction: TransactionForm): void {
    const localStorageAccounts = localStorage.getItem(this.localStorageAccountsKey);
    if (!localStorageAccounts) {
      throw new Error('Accounts not found');
    }
    const accounts: Account[] = JSON.parse(localStorageAccounts);
    const sender = accounts.find((account) => account.id === transaction.senderId);
    const receiver = accounts.find((account) => account.id === transaction.receiverId);
    if (!sender || !receiver) {
      throw new Error('Invalid account id');
    }
    const date = new Date().toISOString();
    sender.balance -= transaction.amount;
    receiver.balance += transaction.amount;

    sender.transactions.push({
      id: this.createId(),
      senderId: transaction.senderId,
      receiverId: transaction.receiverId,
      amount: transaction.amount,
      dateTime: date,
      note: transaction.note,
      type: "DEBIT"
    });
    receiver.transactions.push({
      id: this.createId(),
      senderId: transaction.senderId,
      receiverId: transaction.receiverId,
      amount: transaction.amount,
      dateTime: date,
      note: transaction.note,
      type: "CREDIT"
    });

    localStorage.setItem(this.localStorageAccountsKey, JSON.stringify(accounts));
  }

  private createId(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
