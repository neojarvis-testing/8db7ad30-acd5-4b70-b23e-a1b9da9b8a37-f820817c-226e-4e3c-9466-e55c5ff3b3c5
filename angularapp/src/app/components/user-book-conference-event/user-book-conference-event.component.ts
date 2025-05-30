import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/models/booking.model';
import { ToastService } from 'src/app/shared/services/toast.service';

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
  proofFileName: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      occupation: ['', Validators.required],
      city: ['', Validators.required],
      proof: ['', Validators.required],
      additionalNotes: ['']
    });
  }

  get f() {
    return this.eventForm.controls;
  }

  onProofFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Restrict file type to image and size to 500kb
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Only image files are allowed for proof.';
        this.eventForm.patchValue({ proof: '' });
        this.proofFileName = '';
        return;
      }
      if (file.size > 500 * 1024) {
        this.errorMessage = 'File size must be less than 500KB.';
        this.eventForm.patchValue({ proof: '' });
        this.proofFileName = '';
        return;
      }
      this.errorMessage = '';
      this.proofFileName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        const imageString = (reader.result as string);
        this.eventForm.patchValue({ proof: imageString });
      };
      reader.onerror = () => {
        this.errorMessage = 'Failed to read file.';
        this.eventForm.patchValue({ proof: '' });
        this.proofFileName = '';
      };
      reader.readAsDataURL(file);
    } else {
      this.eventForm.patchValue({ proof: '' });
      this.proofFileName = '';
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.eventForm.invalid) return;
    this.addConferenceEventBooking();
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
        this.toast.show('Booked successfully!');
        this.router.navigate(['/userviewconferenceevent']);
      },
      error: err => {
        this.toast.show(err.error?.message || 'Failed to submit booking.');
      }
    });
  }

  closePopup(): void {
    this.showSuccessPopup = false;
    this.router.navigate(['/userviewconferenceevent']);
  }
}