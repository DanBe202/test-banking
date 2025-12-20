import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {UserAuth} from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mockUsers: UserAuth[] = [
    {
      email: 'test@bank.com',
      password: '123456'
    }
  ]

  login(formData: UserAuth): Observable<any> {
    const user = this.mockUsers.find(user => user.email === formData.email);

    if (!user || user.password !== formData.password) {
      return throwError(() => new Error('Invalid email or password'));
    }

    localStorage.setItem('token', 'mock-token');
    return of({ message: 'Success', token: 'mock-token' }).pipe(
    );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
