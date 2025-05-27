import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConferenceEvent } from '../../models/conference-event.model';
import { ConferenceEventService } from '../../services/conference-event.service';

@Component({
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
  
  constructor(
    private conferenceEventService: ConferenceEventService,
    private router: Router
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
    this.router.navigate(['/edit-conference-event', eventId]);
  }

  deleteEvent(eventId: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.conferenceEventService.deleteConferenceEvent(eventId).subscribe(() => {
        this.loadConferenceEvents();
      });
    }
  }
}