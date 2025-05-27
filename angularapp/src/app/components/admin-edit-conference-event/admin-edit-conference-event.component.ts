import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-admin-edit-conference-event',
  templateUrl: './admin-edit-conference-event.component.html',
  styleUrls: ['./admin-edit-conference-event.component.css']
})
export class AdminEditConferenceEventComponent {
  eventForm: FormGroup;
  submitted = false;
  showSuccessPopup = false;

  // Simulated event data to edit. In a real application, this could come from a service using a route parameter.
  eventData = {
    eventName: 'Angular Conference 2025',
    organizerName: 'TechWorld Inc.',
    category: 'Technology',
    description: 'A conference focusing on Angular and web development.',
    location: 'San Francisco, CA',
    startDateTime: '2025-06-15T09:00',
    endDateTime: '2025-06-15T17:00',
    capacity: 200
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Build the form with validation rules.
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

    // Pre-populate the form with existing event data.
    this.eventForm.patchValue(this.eventData);
  }

  // Convenience getter for easy access to form controls
  get f() {
    return this.eventForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop if the form is invalid.
    if (this.eventForm.invalid) {
      return;
    }

    // Process the valid form data
    console.log(this.eventForm.value);

    // Show success popup
    this.showSuccessPopup = true;
  }

  closePopup(): void {
    this.showSuccessPopup = false;
    // Optionally, redirect to another component (e.g., the event listing page)
    this.router.navigate(['/adminviewbooking']);
  }
}
