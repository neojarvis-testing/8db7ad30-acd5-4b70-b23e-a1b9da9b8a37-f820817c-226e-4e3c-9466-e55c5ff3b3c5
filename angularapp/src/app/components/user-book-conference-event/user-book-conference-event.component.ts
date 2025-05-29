import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/models/booking.model';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-user-book-conference-event',
  templateUrl: './user-book-conference-event.component.html',
  styleUrls: ['./user-book-conference-event.component.css']
})
export class UserBookConferenceEventComponent implements OnInit {
  eventForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  showSuccessPopup = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private bookingService: BookingService, private route: ActivatedRoute,private toast:ToastService) { }

  ngOnInit(): void {
    // Build the event form with all controls marked as required.
    this.eventForm = this.formBuilder.group({
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      occupation: ['', Validators.required],
      city: ['', Validators.required],
      proof: ['', Validators.required],
      additionalNotes: ['']
    });
  }
  // Convenience getter for easy access to form controls
  get f() {
    return this.eventForm.controls;
  }

  onSubmit(): void {
    this.addConferenceEventBooking();
    this.submitted = true;
  }

  addConferenceEventBooking(): void {
    if (this.eventForm.invalid) return;
    this.errorMessage = '';
    this.successMessage = '';

    const booking: Booking = {
      userId: Number(localStorage.getItem('userId')),
      conferenceEventId: Number(this.route.snapshot.paramMap.get('id')),
      bookingStatus: 'Pending',
      bookingDate: new Date(),
      gender: this.eventForm.value.gender,
      age: this.eventForm.value.age,
      occupation: this.eventForm.value.occupation,
      city: this.eventForm.value.city,
      proof: this.eventForm.value.proof,
      additionalNotes: this.eventForm.value.additionalNotes
    };

    this.bookingService.addBooking(booking).subscribe({
      next: () => {
        // this.successMessage = 'Booked successfully!';
        // this.showSuccessPopup = true;
        // this.eventForm.reset();
        this.toast.show('Booked successfully!');
        this.router.navigate(['/userviewconferenceevent']);
      },
      error: err => {
        this.toast.show(err.error || 'Failed to submit booking.');
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


