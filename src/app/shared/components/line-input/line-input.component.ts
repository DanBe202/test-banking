import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-line-input',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './line-input.component.html',
  styleUrl: './line-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineInputComponent {
  inputId = input.required<string>();
  label = input.required<string>();
  type = input<string>('text');
  control = input.required<FormControl>();
}
