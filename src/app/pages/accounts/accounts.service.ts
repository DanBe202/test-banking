import {effect, Injectable, signal} from '@angular/core';
import * as accountData from '../../../../public/api/accounts.json';
import {Account} from '../../core/types/account.type';
import {Transaction} from '../../core/types/transaction.type';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor() {
    effect(() => {
      localStorage.setItem('accounts', JSON.stringify(this.accountsSignal()));
    });
  }

  private accountsSignal = signal<Account[]>(this.loadFromStorage());

  accounts = this.accountsSignal.asReadonly();
  isLoading = signal(false);

  private loadFromStorage(): Account[] {
    const stored = localStorage.getItem('accounts');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        throw new Error('Error parsing local storage,');
      }
    }
    return accountData.accounts;
  }

  updateAccount(updatedAccount: Account) {
    this.accountsSignal.update(accounts =>
      accounts.map((account) => {
        return account.id === updatedAccount.id ? updatedAccount : account
      })
    );
  }

  getAccountById(accountId: number) {
    if (!accountId) {
      throw new Error('Invalid account id');
    }
    const account = this.accountsSignal().find(account => account.id === accountId)
    if (!account) {
      throw new Error('Account not found');
    }
    console.log(account);
    return account;
  }

  getTransactionsByAccountId(accountId: number) {
    if (!accountId) {
      throw new Error('Invalid account id');
    }
    console.log(this.accountsSignal());
    const account = this.getAccountById(accountId);
    console.log(account.transactions);
    return account.transactions;
  }

  addTransaction(transactionForm: Transaction) {
    console.log(transactionForm.senderId);
    console.log(transactionForm.receiverId);

    if (typeof transactionForm.receiverId !== "number") {
      console.log("accountId is not number");
    }
    const sender = this.getAccountById(transactionForm.senderId);

    const receiver = this.getAccountById(transactionForm.receiverId);

    const newTransaction = {
      id: transactionForm.id,
      amount: transactionForm.amount,
      senderId: transactionForm.senderId,
      receiverId: transactionForm.receiverId,
      note: transactionForm.note
    };

    const updatedSender = {
      ...sender,
      balance: sender.balance - transactionForm.amount,
      transactions: [...(sender.transactions || []), newTransaction]
    };
    const updatedReceiver = {
      ...receiver,
      balance: receiver.balance + transactionForm.amount,
      transactions: [...(receiver.transactions || []), newTransaction]
    };

    this.updateAccount(updatedSender);
    this.updateAccount(updatedReceiver);
  }

  reload() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.accountsSignal.set([...accountData.accounts]);
      this.isLoading.set(false);
    }, 2000);
  }
}
