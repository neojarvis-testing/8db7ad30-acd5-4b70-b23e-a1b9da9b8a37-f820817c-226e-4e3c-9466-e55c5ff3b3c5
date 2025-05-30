import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConferenceEvent } from '../../models/conference-event.model';
import { ConferenceEventService } from '../../services/conference-event.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  standalone: false,
  selector: 'app-admin-view-conference-event',
  templateUrl: './admin-view-conference-event.component.html',
  styleUrls: ['./admin-view-conference-event.component.css']
})
export class AdminViewConferenceEventComponent implements OnInit {
  conferenceEvents: ConferenceEvent[] = [];
  filteredEvents: ConferenceEvent[] = [];
  searchTerm: string = '';

  // Pagination properties
  currentPage: number = 1;  
  itemsPerPage: number = 5; 

  // Delete popup properties
  showDeletePopup: boolean = false;
  showSuccessPopup: boolean = false;
  popupMessage: string = '';
  loading: boolean = false;
  selectedEvent: ConferenceEvent | null = null;

  constructor(
    private conferenceEventService: ConferenceEventService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadConferenceEvents();
  }

  loadConferenceEvents(): void {
    this.conferenceEventService.getAllConferenceEvents().subscribe(events => {
      this.conferenceEvents = events;
      this.filteredEvents = events;
      this.currentPage = 1;
    });
  }

  searchEvents(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredEvents = this.conferenceEvents.filter(event =>
      event.eventName.toLowerCase().includes(term) ||
      event.organizerName.toLowerCase().includes(term) ||
      event.location.toLowerCase().includes(term)
    );
    this.currentPage = 1;
  }

  get paginatedEvents(): ConferenceEvent[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEvents.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  editEvent(eventId: number): void {
    this.router.navigate(['/admin/editconferenceevent', eventId]);
  }

  // Updated delete logic with popup confirmation and success message
  deleteEvent(eventId: number): void {
    const event = this.conferenceEvents.find(e => e.conferenceEventId === eventId) || null;
    this.selectedEvent = event;
    this.showDeletePopup = true;
  }

  confirmDelete(): void {
    if (this.selectedEvent) {
      this.loading = true;
      this.conferenceEventService.deleteConferenceEvent(this.selectedEvent.conferenceEventId).subscribe({
        next: () => {
          this.showSuccessPopup = true;
          this.popupMessage = 'Successfully Deleted Conference Event!';
          this.loading = false;
          this.loadConferenceEvents();
        },
        error: (err) => {
          this.toastService.show(err.error?.message || 'Failed to delete Conference Event. Please try again.');
          this.loading = false;
        }
      });
    }
    this.closePopup();
  }

  closePopup(): void {
    this.showDeletePopup = false;
    this.showSuccessPopup = false;
    this.selectedEvent = null;
    this.popupMessage = '';
  }
}