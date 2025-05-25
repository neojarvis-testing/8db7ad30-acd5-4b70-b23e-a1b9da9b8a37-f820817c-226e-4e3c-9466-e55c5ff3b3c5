import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.getToken();
  const role = localStorage.getItem('role');
  if (token && role === 'Admin') {
    return true;
  }
  router.navigate(['/login']);
  return false;
};

export const userGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.getToken();
  const role = localStorage.getItem('role');
  if (token && role === 'User') {
    return true;
  }
  router.navigate(['/login']);
  return false;
};