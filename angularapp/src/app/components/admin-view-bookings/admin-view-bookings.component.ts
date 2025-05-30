import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/services/booking.service';
import { ToastService } from 'src/app/shared/services/toast.service';


@Component({
  standalone: false,
  selector: 'app-booking',
  templateUrl: './admin-view-bookings.component.html',
  styleUrls: ['./admin-view-bookings.component.css']
})
export class AdminViewBookingsComponent implements OnInit {

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
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe(events => {
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
      this.bookingService.deleteBooking(this.selectedBooking.bookingId).subscribe({
        next: () => {
          this.showSuccessPopup = true;
          this.popupMessage = 'Successfully Deleted Booking!';
          this.loading = false;
          this.loadBookings(); 
        },
        error: (err) => {
          this.toastService.show(err.error?.message || 'Failed to delete Booking. Please try again.');
          this.loading = false;
        }
      });
    }
    this.closePopup();
  }

  closePopup(): void {
    this.showProofPopup = false;
    this.showSuccessPopup = false;
    this.showDeletePopup = false;
    this.selectedBooking = null;
  }
}
