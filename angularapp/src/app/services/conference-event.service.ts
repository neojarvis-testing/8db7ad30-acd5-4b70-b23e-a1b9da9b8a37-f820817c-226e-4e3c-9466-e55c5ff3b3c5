import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConferenceEvent } from '../models/conference-event.model';
import { Booking } from '../models/booking.model';

@Injectable({
    providedIn: 'root'
})
export class ConferenceEventService {
    private baseUrl = 'http://your-workspace-url:8080/api';

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('authToken');
        return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }

    getAllConferenceEvents(): Observable<ConferenceEvent[]> {
        return this.http.get<ConferenceEvent[]>(`${this.baseUrl}/conference-events`, { headers: this.getHeaders() });
    }

    addConferenceEvent(requestObject: ConferenceEvent): Observable<ConferenceEvent> {
        return this.http.post<ConferenceEvent>(`${this.baseUrl}/conference-event`, requestObject, { headers: this.getHeaders() });
    }

    deleteConferenceEvent(conferenceEventId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/conference-event/${conferenceEventId}`, { headers: this.getHeaders() });
    }

    getConferenceEventById(id: number): Observable<ConferenceEvent> {
        return this.http.get<ConferenceEvent>(`${this.baseUrl}/conference-event/${id}`, { headers: this.getHeaders() });
    }

    updateConferenceEvent(id: number, requestObject: ConferenceEvent): Observable<ConferenceEvent> {
        return this.http.put<ConferenceEvent>(`${this.baseUrl}/conference-event/${id}`, requestObject, { headers: this.getHeaders() });
    }

    getRegisteredEvents(userId: number): Observable<ConferenceEvent[]> {
        return this.http.get<ConferenceEvent[]>(`${this.baseUrl}/bookings/user/${userId}`, { headers: this.getHeaders() });
    }

    addConferenceEventBooking(data: Booking): Observable<Booking> {
        return this.http.post<Booking>(`${this.baseUrl}/booking`, data, { headers: this.getHeaders() });
    }

    deleteConferenceEventBooking(bookingId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/booking/${bookingId}`, { headers: this.getHeaders() });
    }

    getAllConferenceEventBookings(): Observable<Booking[]> {
        return this.http.get<Booking[]>(`${this.baseUrl}/bookings`, { headers: this.getHeaders() });
    }

    updateConferenceEventBooking(id: number, booking: Booking): Observable<Booking> {
        return this.http.put<Booking>(`${this.baseUrl}/booking/${id}`, booking, { headers: this.getHeaders() });
    }
}
