import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-dropdown-selector',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './dropdown-selector.component.html',
  styleUrl: './dropdown-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownSelectorComponent {
  control = input.required<FormControl>();
}
