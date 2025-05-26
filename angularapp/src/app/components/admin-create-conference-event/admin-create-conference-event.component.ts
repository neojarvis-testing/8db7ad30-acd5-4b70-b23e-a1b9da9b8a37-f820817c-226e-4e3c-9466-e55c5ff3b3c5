import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-create-conference-event',
  templateUrl: './admin-create-conference-event.component.html',
  styleUrls: ['./admin-create-conference-event.component.css']
})
export class AdminCreateConferenceEventComponent implements OnInit {
  eventForm: FormGroup;
  submitted = false;
  showSuccessPopup = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    // Build the event form with all controls marked as required.
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      organizerName: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // Convenience getter for easy access to form controls
  get f() {
    return this.eventForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // If the form is invalid, stop here.
    if (this.eventForm.invalid) {
      return;
    }

    // Process the valid form data (e.g., send data to the backend).
    console.log(this.eventForm.value);

    // Show the popup on successful submission.
    this.showSuccessPopup = true;
  }

  closePopup(): void {
    this.showSuccessPopup = false;
    // Optionally, reset the form or perform additional actions.
    //need to navigate to user-view-bookings component
    this.router.navigate(['/adminviewbooking']);
  }
}
