import {inject} from '@angular/core';
import {CanActivateFn, RedirectCommand, Router} from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    const loginPath = router.parseUrl("/login");
    return new RedirectCommand(loginPath);
  }
  return true;
};
