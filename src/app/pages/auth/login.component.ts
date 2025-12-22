import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {LineInputComponent} from '../../shared/components/line-input/line-input.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [
    LineInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);

  errorMessage = signal('');

  protected loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),

    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    })
  })

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    try {
      this.loginService.login(this.loginForm.getRawValue());
      this.router.navigate(['/accounts']);
    } catch {
      this.errorMessage.set('Invalid email or password')
    }
  }
}
