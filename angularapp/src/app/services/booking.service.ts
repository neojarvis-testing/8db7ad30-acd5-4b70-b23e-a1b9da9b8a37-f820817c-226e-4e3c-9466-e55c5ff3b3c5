import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  private get options() {
    return { headers: this.getHeaders() };
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/bookings`, this.options);
  }

  getBookingsByUserId(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/bookings/user/${userId}`, this.options);
  }

  addBooking(requestObject: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.baseUrl}/booking`, requestObject, this.options);
  }

  deleteBooking(bookingId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/booking/${bookingId}`, this.options);
  }

  updateBooking(id: number, requestObject: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.baseUrl}/booking/${id}`, requestObject, this.options);
  }

  // getBookingById(id: number): Observable<Booking> {
  //   return this.http.get<Booking>(`${this.baseUrl}/booking/${id}`, this.options);
  // }

}
