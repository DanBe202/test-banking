import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AccountService} from '../accounts.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LineInputComponent} from '../../../shared/components/line-input/line-input.component';
import {DropdownSelectorComponent} from '../../../shared/components/dropdown-selector/dropdown-selector.component';

@Component({
  selector: 'app-transfer',
  imports: [
    LineInputComponent,
    ReactiveFormsModule,
    DropdownSelectorComponent
  ],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferComponent {
  protected accountService = inject(AccountService)
  private route = inject(ActivatedRoute);

  readonly userId = Number(this.route.snapshot.paramMap.get('id'));

  protected transactionForm = new FormGroup({
    id: new FormControl(Date.now(), {
      nonNullable: true,
      validators: [Validators.required]
    }),

    senderId: new FormControl(this.userId, {
      nonNullable: true,
      validators: [Validators.required]
    }),

    receiverId: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required]
    }),

    amount: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)]
    }),

    note: new FormControl('', {
      validators: [Validators.maxLength(1000)]
    })
  })

  protected onSubmit() {
    setTimeout(() => {
      this.accountService.addTransaction(this.transactionForm.getRawValue());
    }, 2000);
  }
}
