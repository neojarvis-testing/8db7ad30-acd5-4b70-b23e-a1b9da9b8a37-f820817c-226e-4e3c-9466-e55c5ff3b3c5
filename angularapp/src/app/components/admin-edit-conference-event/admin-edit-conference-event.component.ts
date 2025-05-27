import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConferenceEventService } from '../../services/conference-event.service';
import { ConferenceEvent } from '../../models/conference-event.model';

@Component({
  selector: 'app-admin-edit-conference-event',
  templateUrl: './admin-edit-conference-event.component.html',
  styleUrls: ['./admin-edit-conference-event.component.css']
})
export class AdminEditConferenceEventComponent implements OnInit {
  eventForm: FormGroup;
  submitted = false;
  showSuccessPopup = false;
  eventId: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
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

    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEvent();
  }

  get f() {
    return this.eventForm.controls;
  }

  loadEvent(): void {
    this.conferenceEventService.getConferenceEventById(this.eventId).subscribe({
      next: (event: ConferenceEvent) => {
        this.eventForm.patchValue({
          eventName: event.eventName,
          organizerName: event.organizerName,
          category: event.category,
          description: event.description,
          location: event.location,
          startDateTime: event.startDateTime,
          endDateTime: event.endDateTime,
          capacity: event.capacity
        });
      },
      error: () => {
        alert('Failed to load event details.');
        this.router.navigate(['/viewconferenceevent']);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.eventForm.invalid) {
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

    this.conferenceEventService.updateConferenceEvent(this.eventId, payload).subscribe({
      next: () => {
        this.showSuccessPopup = true;
      },
      error: () => {
        alert('Failed to update event. Please try again.');
      }
    });
  }

  closePopup(): void {
    this.showSuccessPopup = false;
    this.router.navigate(['/viewconferenceevent']);
  }

  goBack(): void {
    this.router.navigate(['/viewconferenceevent']);
  }
}
