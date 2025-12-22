import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'app-vertical-list',
  imports: [],
  templateUrl: './vertical-list.component.html',
  styleUrl: './vertical-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalListComponent {
  isLoading = input<boolean>(false);
}
