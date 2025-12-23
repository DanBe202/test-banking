import {ChangeDetectionStrategy, Component, computed, effect, inject, input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TransferService} from './transfer.service';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-transfer',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption
  ],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferComponent implements OnInit {
  private transferService = inject(TransferService)

  readonly accounts = this.transferService.accounts;
  readonly account = this.transferService.account;
  readonly id = input.required({transform: (value: string) => Number(value)});
  readonly otherAccounts = computed(() => this.accounts().filter(account => account.id !== this.id()));

  protected transferForm = new FormGroup({
    senderId: new FormControl(NaN, {
      nonNullable: true,
      validators: [Validators.required]
    }),

    receiverId: new FormControl(NaN, {
      nonNullable: true,
      validators: [Validators.required]
    }),

    amount: new FormControl(1, {
      nonNullable: true,
    }),

    note: new FormControl('', {
      validators: [Validators.maxLength(1000)]
    })
  })

  constructor() {
    effect(() => {
      this.transferForm.controls.senderId.setValue(this.id());
    });

    effect(() => {
      const ballance = this.account()?.balance ?? 0;
      this.transferForm.controls.amount.setValidators([Validators.required, Validators.min(1), Validators.max(ballance)])
    });
  }

  ngOnInit(): void {
    this.transferService.getAccounts(this.id());
    this.transferForm.controls.senderId.disable()
  }

  protected onSubmit() {
    this.transferService.addTransaction(this.transferForm.getRawValue());
    alert('Transaction added successfully');
  }
}
