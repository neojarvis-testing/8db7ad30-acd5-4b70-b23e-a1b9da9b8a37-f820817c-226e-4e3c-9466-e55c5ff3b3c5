import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConferenceEventService } from '../../services/conference-event.service';
import { ConferenceEvent } from '../../models/conference-event.model';

@Component({
  selector: 'app-admin-create-conference-event',
  templateUrl: './admin-create-conference-event.component.html',
  styleUrls: ['./admin-create-conference-event.component.css']
})
export class AdminCreateConferenceEventComponent implements OnInit {
  eventForm: FormGroup;
  submitted = false;
  showSuccessPopup = false;
  dateError = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private conferenceEventService: ConferenceEventService
  ) { }

  ngOnInit(): void {
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

  onStartDateChange(): void {
    // If endDateTime is before startDateTime, reset endDateTime
    const start = this.f.startDateTime.value;
    const end = this.f.endDateTime.value;
    if (start && end && start > end) {
      this.f.endDateTime.setValue('');
    }
    this.dateError = false;
  }

  onEndDateChange(): void {
    const start = this.f.startDateTime.value;
    const end = this.f.endDateTime.value;
    this.dateError = !!(start && end && end < start);
  }

  onSubmit(): void {
    this.submitted = true;

    // Validate date order
    const start = this.f.startDateTime.value;
    const end = this.f.endDateTime.value;
    this.dateError = !!(start && end && end < start);

    if (this.eventForm.invalid || this.dateError) {
      return;
    }

    const payload: ConferenceEvent = {
      eventName: this.f.eventName.value,
      organizerName: this.f.organizerName.value,
      category: this.f.category.value,
      description: this.f.description.value,
      location: this.f.location.value,
      startDateTime: this.f.startDateTime.value,
      endDateTime: this.f.endDateTime.value,
      capacity: this.f.capacity.value
    };

    this.conferenceEventService.addConferenceEvent(payload).subscribe({
      next: () => {
        this.showSuccessPopup = true;
      },
      error: () => {
        alert('Failed to create event. Please try again.');
      }
    });
  }

  closePopup(): void {
    this.showSuccessPopup = false;
    this.router.navigate(['/adminviewconferenceevent']);
  }
}