import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';


@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  mobile: string = '';
  role: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router,
    private toastService: ToastService
  ) { }

  // Getter to check if passwords match
  get passwordMismatch(): boolean {
    return this.password && this.confirmPassword ? this.password !== this.confirmPassword : false;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid || this.passwordMismatch) {
      this.errorMessage = 'Please fix the errors above.';
      return;
    }

    this.errorMessage = '';

    this.authService.register({
      username: this.username,
      email: this.email,
      password: this.password,
      mobileNumber: this.mobile,
      userRole: this.role
    }).subscribe(
      (response: any) => {
        if (response.success) {
          // Navigate to login page upon successful registration
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = response.message || 'Registration failed. Please try again.';
        }
      },
      error => {
        console.error('Registration error:', error);
        this.toastService.show(error.error?.message || 'Registration failed. Please try again.');
        //this.errorMessage = 'An error occurred during registration. Please try again later.';
      }
    );
  }
}
