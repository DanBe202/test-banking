import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Account} from '../../../core/types/account.type';
import {delay} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  readonly accounts = signal<Account[]>([]);
  readonly loading = signal(false);

  getAccounts(): void {
    this.loading.set(true);
    this.http.get<Account[]>('/api/accounts.json').pipe(delay(1000)).subscribe(accounts => {
      this.accounts.set(accounts);
      this.loading.set(false);
    })
  }
}
