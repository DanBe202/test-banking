import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {Transaction} from '../../../core/types/transaction.type';

@Component({
  selector: 'app-transaction',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionComponent {
  transaction = input.required<Transaction>();
}
