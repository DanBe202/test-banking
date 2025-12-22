import {Injectable} from '@angular/core';
import {LoginForm} from '../../core/types/login-form.type';
import {MOCK_USERS} from '../../core/mocks/users.mock';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  login(formData: LoginForm): void {
    const user = MOCK_USERS.find((user) => {
      return (user.email === formData.email && user.password === formData.password)
    })

    if (!user) {
      throw new Error('Invalid email or password');
    }

    localStorage.setItem('token', 'mock-token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
