import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(form: NgForm): void {
    // Validate the form before submission
    if (form.invalid) {
      this.errorMessage = 'Please fix the errors above.';
      return;
    }

    // Clear previous error message
    this.errorMessage = '';

    // Call the authentication service
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        // Check the response for success and user role. Adjust this logic per your backend API.
        if (response && response.success) {
          const userRole = response.role;
          if (userRole === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (userRole === 'user') {
            this.router.navigate(['/user-dashboard']);
          } else {
            // Default navigation if role is not specified
            this.router.navigate(['/dashboard']);
          }
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      },
      error => {
        console.error('Login error:', error);
        this.errorMessage = 'An error occurred during login. Please try again later.';
      }
    );
  }
}
