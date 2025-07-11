import { Component , OnInit } from '@angular/core';
import { ConferenceEventService } from '../../services/conference-event.service';
import { ConferenceEvent } from '../../models/conference-event.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Booking } from 'src/app/models/booking.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
@Component({
  selector: 'app-user-applied-conference-event',
  templateUrl: './user-applied-conference-event.component.html',
  styleUrls: ['./user-applied-conference-event.component.css']
})
export class UserAppliedConferenceEventComponent implements OnInit {
  
    userid: number;
    bookings: Booking[] = [];
    filteredBookings: Booking[] = [];
    loading = false;
  
  
    // Pagination properties
    currentPage: number = 1;
    itemsPerPage: number = 5;
  
    filterStatus: string = 'all';
    showProofPopup: boolean = false;
    showDeletePopup: boolean = false;
    selectedBooking: Booking | null = null;
  
    showSuccessPopup = false;
    popupMessage: string = '';
  
    constructor(
      private conferenceEventService: ConferenceEventService, 
      private authService: AuthService,
      private toastService: ToastService,
    ) { }
  
    ngOnInit(): void {
      this.userid = Number(localStorage.getItem('userId'));
      this.loadBookings();
    }
  
    loadBookings(): void {
      this.conferenceEventService.getRegisteredEvents(this.userid).subscribe(events => {
        this.bookings = events;
        this.filteredBookings = events;
        this.currentPage = 1;
      });
    }
  
    get paginatedBooking(): Booking[] {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredBookings.slice(start, start + this.itemsPerPage);
    }
  
    get totalPages(): number {
      return Math.ceil(this.filteredBookings.length / this.itemsPerPage);
    }
  
    goToPage(page: number): void {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  
    // Returns filtered bookings based on the filter dropdown value
    getFilteredBookings(): Booking[] {
      if (this.filterStatus === 'all') {
        return this.bookings;
      } else {
        return this.bookings.filter(
          b => b.bookingStatus.toLowerCase() === this.filterStatus.toLowerCase()
        );
      }
    }
  
    sortBy(field: string): void {
      if (field === 'asc') {
        this.bookings.sort((a, b) => new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime());
      } else if (field === 'dsc') {
        this.bookings.sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());
      }
      this.currentPage = 1;
    }
  
    updateStatus(booking: Booking, newStatus: string): void {
      booking.bookingStatus = newStatus;
      this.loading = true;
      this.conferenceEventService.updateConferenceEventBooking(booking.bookingId, booking).subscribe({
        next: () => {
          this.showSuccessPopup = true;
          this.popupMessage = 'Successfully Updated Booking!';
          this.loading = false;
        },
        error: (err) => {
          this.toastService.show(err.error?.message || 'Failed to update Booking. Please try again.');
          this.loading = false;
        }
      });
    }
  
    viewProof(booking: Booking): void {
      this.selectedBooking = booking;
      this.showProofPopup = true;
    }
  
    deleteBooking(booking: Booking): void {
      this.selectedBooking = booking;
      this.showDeletePopup = true;
    }
  
    confirmDelete(): void {
      if (this.selectedBooking) {
        this.loading = true;
        this.conferenceEventService.deleteConferenceEventBooking(this.selectedBooking.bookingId).subscribe({
          next: () => {
            this.showSuccessPopup = true;
            this.popupMessage = 'Successfully Deleted Booking!';
            this.loading = false;
          },
          error: (err) => {
            this.toastService.show(err.error?.message || 'Failed to delete Booking. Please try again.');
            this.loading = false;
          }
        });
  
        this.bookings = this.bookings.filter(b => b.bookingId !== this.selectedBooking!.bookingId);
      }
      this.closePopup();
    }
  
    closePopup(): void {
      this.showProofPopup = false;
      this.showDeletePopup = false;
      this.selectedBooking = null;
    }
}

