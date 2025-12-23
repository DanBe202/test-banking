import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'app-accounts',
  imports: [
    RouterOutlet,
    MatToolbar,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent {
  private readonly router = inject(Router);

  protected readonly authService = inject(LoginService);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
