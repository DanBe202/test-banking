import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/auth/auth.service';

@Component({
  selector: 'app-heder',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router) {}

  token = localStorage.getItem('token');
  isLoggedIn = !!this.token;
  protected logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
