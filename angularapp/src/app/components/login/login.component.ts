import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, 
    private router: Router,
    private toastService: ToastService
  ) { }

  onSubmit(form: NgForm): void {
    // Validate the form before submission
    if (form.invalid) {
      return;
    }

    // Call the authentication service
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        if (response && response.success) {
          this.router.navigate(['/home']);
        } else {
          this.toastService.show('Invalid email or password');
        }
      },
      error => {
        this.toastService.show(error.error?.message || 'Login failed. Please check your credentials and try again.');
      }
    );
  }
}
