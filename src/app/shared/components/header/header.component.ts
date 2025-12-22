import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../pages/auth/login.service';

@Component({
  selector: 'app-heder',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  protected authService = new LoginService();
  private router = new Router();

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
