import {ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TransactionsService} from './transactions.service';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {MatListItem, MatListItemIcon, MatListItemMeta, MatListItemTitle, MatNavList} from '@angular/material/list';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatOption, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-transactions',
  imports: [
    MatIcon,
    MatButton,
    CurrencyPipe,
    MatListItem,
    MatListItemIcon,
    MatListItemMeta,
    MatListItemTitle,
    MatNavList,
    MatProgressSpinner,
    RouterLink,
    MatPaginator,
    FormsModule,
    MatSelect,
    MatInput,
    MatOption,
    MatFormField,
    DatePipe,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsComponent implements OnInit {
  protected readonly transactionsService = inject(TransactionsService);

  readonly pageIndex = signal(0);
  readonly pageSize = signal(10);

  readonly id = input.required({transform: (value : string) => Number(value)});
  readonly account = this.transactionsService.account;
  readonly loading = this.transactionsService.loading;

  readonly searchFilter = signal('');
  readonly typeFilter = signal<'ALL' | 'DEBIT' | 'CREDIT'>('ALL');
  readonly sortNewestFirst = signal(true);

  readonly transactions = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    const transactions = this.account()?.transactions ?? [];
    return transactions.filter((transaction) => {
      return transaction.note?.toLowerCase().includes(this.searchFilter().toLowerCase());
    }).filter((transaction) => {
      if (this.typeFilter() === 'ALL') {
        return true;
      }
      return transaction.type === this.typeFilter()
    }).sort((a, b) => {
      if (this.sortNewestFirst()) {
        return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
      }
      return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
    }).slice(startIndex, endIndex);
  });


  ngOnInit(): void {
    this.transactionsService.getAccount(this.id());
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  onSearchChange(term: string) {
    this.searchFilter.set(term);
    this.pageIndex.set(0);
  }

  onTypeChange(type: 'ALL' | 'DEBIT' | 'CREDIT') {
    this.typeFilter.set(type);
    this.pageIndex.set(0);
  }

  toggleSort() {
    this.sortNewestFirst.update(value => !value);
  }
}
