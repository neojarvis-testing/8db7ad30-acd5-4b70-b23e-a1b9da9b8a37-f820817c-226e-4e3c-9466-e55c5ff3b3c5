import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const toast = inject(ToastService);
  const router = inject(Router);
  const token = auth.getToken();
  const role = localStorage.getItem('role');
  if (token && role === 'Admin') {
    return true;
  }
  toast.show('Access denied. Admins only.');
  auth.logout();
  router.navigate(['/login']);
  return false;
};

export const userGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const toast = inject(ToastService);
  const router = inject(Router);
  const token = auth.getToken();
  const role = localStorage.getItem('role');
  if (token && role === 'User') {
    return true;
  }
  toast.show('Access denied. Admins only.');
  auth.logout();
  router.navigate(['/login']);
  return false;
};