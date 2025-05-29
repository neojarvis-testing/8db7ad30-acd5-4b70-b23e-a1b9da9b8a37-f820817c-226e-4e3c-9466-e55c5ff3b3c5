
import { Component , OnInit } from '@angular/core';
import { ConferenceEventService } from '../../services/conference-event.service';
import { ConferenceEvent } from '../../models/conference-event.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-edit-conference-event',
  templateUrl: './admin-edit-conference-event.component.html',
  styleUrls: ['./admin-edit-conference-event.component.css']
})
export class AdminEditConferenceEventComponent implements OnInit {
  eventForm: FormGroup;
  submitted = false;
  errorMessage = '';
  successMessage = '';
  showSuccessPopup = false;
  conferenceevents: ConferenceEvent[] = [];
  conferenceevent: ConferenceEvent;
  loading=false;
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
 if(this.conferenceevent)
 {
  this.eventForm.patchValue(this.conferenceevent);
 }
  }

   // Convenience getter for easy access to form controls
get f() {
  return this.eventForm.controls;
}
onSubmit(): void {
  this.submitted = true;
  //this.addConferenceEventBooking();
  // If the form is invalid, stop here.
  if (this.eventForm.invalid) {
    return;
  }

}

getConferenceEvents(): void {
  this.loading = true;
  this.errorMessage = '';
  const conferenceEventId = Number(localStorage.getItem('ConferenceEventId'));
  this.conferenceEventService.getConferenceEventById(conferenceEventId).subscribe({
    next: (data) => {
      this.conferenceevents = Array.isArray(data) ? data: data ? [data]:[];
      this.loading = false;
    },
    error: () => {
      this.errorMessage = 'Failed to load conferenceEvents.';
      this.loading = false;
    }
  });
  if(this.conferenceevents && this.conferenceevents.length>0)
  {
    this.conferenceevent=this.conferenceevent[0];
  }
  else{
    console.warn('Conference events arry is empty');
  }
}

}
