import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-user-view-booking',
  templateUrl: './user-view-booking.component.html',
  styleUrls: ['./user-view-booking.component.css']
})
export class UserViewBookingComponent {

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
    private bookingService: BookingService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getUserId().subscribe(event => this.userid = event);
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookingsByUserId(this.userid).subscribe(events => {
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

  updateStatus(booking: Booking, newStatus: string): void {
    booking.bookingStatus = newStatus;
    this.loading = true;
    this.bookingService.updateBooking(booking.bookingId, booking).subscribe({
      next: () => {
        this.showSuccessPopup = true;
        this.popupMessage = 'Successfully Updated Booking!';
        this.loading = false;
      },
      error: () => {
        alert('Failed to update Booking. Please try again.');
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
      this.bookingService.deleteBooking(this.selectedBooking.bookingId).subscribe({
        next: () => {
          this.showSuccessPopup = true;
          this.popupMessage = 'Successfully Deleted Booking!';
          this.loading = false;
        },
        error: () => {
          alert('Failed to update Booking. Please try again.');
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
