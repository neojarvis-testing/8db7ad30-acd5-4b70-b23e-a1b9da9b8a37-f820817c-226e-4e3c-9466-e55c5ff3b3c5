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
  errorMessage = '';
  successMessage = '';
  showSuccessPopup = false;

  constructor(private formBuilder: FormBuilder, private router: Router,private conferenceEventService: ConferenceEventService) { }

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
  this.addConferenceEventBooking();
  // If the form is invalid, stop here.
  if (this.eventForm.invalid) {
    return;
  }

  // Process the valid form data (e.g., send data to the backend).
  console.log(this.eventForm.value);

  // Show the popup on successful submission.
  this.showSuccessPopup = true;
}
addConferenceEventBooking():void{
  if (this.eventForm.invalid) return;
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';
    const userId = Number(localStorage.getItem('userId'));
    const conferenceEventId =1;
    const bookingId =1;
    var BookingStatus='Test';
    var Proof='';
    var comments='';
    const booking = {
      BookingId:bookingId,
      UserId:userId,
      ConferenceEventId: conferenceEventId,
      BookingStatus: BookingStatus,
      BookingDate:this.eventForm.value.startDateTime,
      Gender: this.eventForm.value.gender,
      Age: this.eventForm.value.age,
      Occupation: this.eventForm.value.category,
      City: this.eventForm.value.city,
      Proof:Proof,
      AdditionalNotes: this.eventForm.value.adddet,
      
    };

    this.conferenceEventService.addConferenceEventBooking(booking).subscribe({
      next: () => {
        this.successMessage = 'Booking submitted successfully!';
        this.eventForm.reset();
        setTimeout(() => this.router.navigate(['/userviewconferenceevent']), 1500);
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Failed to submit feedback.';
        this.submitted = false;
      }
    });
}
closePopup(): void {
  this.showSuccessPopup = false;
  // Optionally, reset the form or perform additional actions.
  //need to navigate to user-view-bookings component
  this.router.navigate(['/userviewconferenceevent']);
}
  }


