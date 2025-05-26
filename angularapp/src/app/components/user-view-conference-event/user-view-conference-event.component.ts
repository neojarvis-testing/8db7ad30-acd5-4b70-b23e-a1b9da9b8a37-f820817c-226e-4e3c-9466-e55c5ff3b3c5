import { Component , OnInit } from '@angular/core';
import { ConferenceEventService } from '../../services/conference-event.service';
import { ConferenceEvent } from '../../models/conference-event.model';
@Component({
  selector: 'app-user-view-conference-event',
  templateUrl: './user-view-conference-event.component.html',
  styleUrls: ['./user-view-conference-event.component.css']
})
export class UserViewConferenceEventComponent  implements OnInit {
  conferenceevents: ConferenceEvent[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private conferenceEventService: ConferenceEventService) {}

  ngOnInit(): void {
    this.getConferenceEvents();
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
  }

  deleteFeedback(conferenceEventId: number): void {
    if (!confirm('Are you sure you want to delete this ConferenceEventId?')) return;
    this.conferenceEventService.deleteConferenceEvent(conferenceEventId).subscribe({
      next: () => {
        this.successMessage = 'ConferenceEvent deleted successfully!';
        this.getConferenceEvents();
      },
      error: () => {
        this.errorMessage = 'Failed to delete ConferenceEvent.';
      }
    });
  }
}