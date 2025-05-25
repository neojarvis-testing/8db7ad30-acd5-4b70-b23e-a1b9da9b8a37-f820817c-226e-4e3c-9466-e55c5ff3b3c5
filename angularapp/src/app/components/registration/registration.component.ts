import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;  // The registration form group

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Initialize the reactive form with all controls and validators
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      role: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator to verify that the password and confirmPassword match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Called when the registration form is submitted
  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Form Submitted Successfully:', this.registrationForm.value);
      // Proceed with additional processing or an API call
    } else {
      // Mark all fields as touched to trigger validation messages
      this.registrationForm.markAllAsTouched();
      console.log('Registration form is invalid.');
    }
  }
}
