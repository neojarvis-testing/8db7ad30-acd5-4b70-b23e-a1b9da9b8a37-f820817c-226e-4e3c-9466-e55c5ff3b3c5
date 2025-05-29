import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConferenceEvent } from '../models/conference-event.model';
import { Booking } from '../models/booking.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConferenceEventService {
    private baseUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('authToken');
        return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }

    private get options() {
        return { headers: this.getHeaders() };
    }

    getAllConferenceEvents(): Observable<ConferenceEvent[]> {
        return this.http.get<ConferenceEvent[]>(`${this.baseUrl}/conference-events`, this.options);
    }

    addConferenceEvent(requestObject: ConferenceEvent): Observable<ConferenceEvent> {
        return this.http.post<ConferenceEvent>(`${this.baseUrl}/conference-event`, requestObject, this.options);
    }

    deleteConferenceEvent(conferenceEventId: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/conference-event/${conferenceEventId}`, this.options);
    }

    getConferenceEventById(id: number): Observable<ConferenceEvent> {
        return this.http.get<ConferenceEvent>(`${this.baseUrl}/conference-event/${id}`, this.options);
    }

    updateConferenceEvent(id: number, requestObject: ConferenceEvent): Observable<ConferenceEvent> {
        return this.http.put<ConferenceEvent>(`${this.baseUrl}/conference-event/${id}`, requestObject, this.options);
    }

    getRegisteredEvents(userId: number): Observable<ConferenceEvent[]> {
        return this.http.get<ConferenceEvent[]>(`${this.baseUrl}/bookings/user/${userId}`, this.options);
    }

    addConferenceEventBooking(data: Booking): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/booking`, data, this.options);
    }

    deleteConferenceEventBooking(bookingId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/booking/${bookingId}`, this.options);
    }

    getAllConferenceEventBookings(): Observable<Booking[]> {
        return this.http.get<Booking[]>(`${this.baseUrl}/bookings`, this.options);
    }

    updateConferenceEventBooking(id: number, booking: Booking): Observable<Booking> {
        return this.http.put<Booking>(`${this.baseUrl}/booking/${id}`, booking, this.options);
    }
}
