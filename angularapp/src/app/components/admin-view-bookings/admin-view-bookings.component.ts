import { Component } from '@angular/core';

interface Booking {
  id: number;
  username: string;
  eventName: string;
  occupation: string;
  gender: string;
  city: string;
  bookingDate: string;
  status: string;
  additionalNotes: string;
  mobile: string;
  proofImage: string;
}

@Component({
  selector: 'app-booking',
  templateUrl: './admin-view-bookings.component.html',
  styleUrls: ['./admin-view-bookings.component.css']
})
export class AdminViewBookingsComponent {
  // Sample booking data
  bookings: Booking[] = [
    {
      id: 1,
      username: 'Alice',
      eventName: 'Tech Innovations Summit',
      occupation: 'Software Engineer',
      gender: 'Female',
      city: 'New York',
      bookingDate: '2025-03-27',
      status: 'Pending',
      additionalNotes: 'Looking forward to the keynote session.',
      mobile: '9585193456',
      proofImage: 'assets/images/proof1.jpg'
    },
    {
      id: 2,
      username: 'Bob',
      eventName: 'Cybersecurity Trends 2025',
      occupation: 'Software Engineer',
      gender: 'Male',
      city: 'New York',
      bookingDate: '2025-03-27',
      status: 'Accepted',
      additionalNotes: 'NA',
      mobile: '9585193456',
      proofImage: 'assets/images/proof2.jpg'
    },
    {
      id: 3,
      username: 'Carol',
      eventName: 'Tech Innovations Summit',
      occupation: 'Project Manager',
      gender: 'Female',
      city: 'Chicago',
      bookingDate: '2025-03-27',
      status: 'Rejected',
      additionalNotes: 'Needs accessibility accommodations.',
      mobile: '9585193456',
      proofImage: 'assets/images/proof3.jpg'
    }
  ];

  filterStatus: string = 'all';
  showProofPopup: boolean = false;
  showDeletePopup: boolean = false;
  selectedBooking: Booking | null = null;

  // Returns filtered bookings based on the filter dropdown value
  getFilteredBookings(): Booking[] {
    if (this.filterStatus === 'all') {
      return this.bookings;
    } else {
      return this.bookings.filter(
        b => b.status.toLowerCase() === this.filterStatus.toLowerCase()
      );
    }
  }

  // Update booking status when the dropdown value changes
  updateStatus(booking: Booking, newStatus: string): void {
    booking.status = newStatus;
    // (Optional) Send update to backend server here
  }

  // Show the proof image popup
  viewProof(booking: Booking): void {
    this.selectedBooking = booking;
    this.showProofPopup = true;
  }

  // Open the delete confirmation popup
  deleteBooking(booking: Booking): void {
    this.selectedBooking = booking;
    this.showDeletePopup = true;
  }

  // Confirm deletion and remove the booking
  confirmDelete(): void {
    if (this.selectedBooking) {
      this.bookings = this.bookings.filter(b => b.id !== this.selectedBooking!.id);
    }
    this.closePopup();
  }

  // Close any open popup
  closePopup(): void {
    this.showProofPopup = false;
    this.showDeletePopup = false;
    this.selectedBooking = null;
  }
}
