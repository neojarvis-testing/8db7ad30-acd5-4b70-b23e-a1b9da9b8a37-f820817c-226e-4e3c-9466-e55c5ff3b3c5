import { Component , OnInit } from '@angular/core';
import { ConferenceEventService } from '../../services/conference-event.service';
import { ConferenceEvent } from '../../models/conference-event.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-book-conference-event',
  templateUrl: './user-book-conference-event.component.html',
  styleUrls: ['./user-book-conference-event.component.css']
})
export class UserBookConferenceEventComponent implements OnInit {
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
  this.router.navigate(['/userviewconferenceevent']);
}
  }


