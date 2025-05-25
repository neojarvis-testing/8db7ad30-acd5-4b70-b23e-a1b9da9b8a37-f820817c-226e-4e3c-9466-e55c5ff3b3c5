import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
//import {Feedback} from '../models/feedback.model'

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    private baseUrl = 'http://your-workspace-url:8080/api';

    constructor(private httpClient: HttpClient) { }


    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('authToken');
        return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }

    sendFeedback(feedback: Feedback): Observable<Feedback> {
        return this.httpClient.post<Feedback>(`${this.baseUrl}/feedback`, feedback, { headers: this.getHeaders() });
    }

    getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
        return this.httpClient.get<Feedback[]>(`${this.baseUrl}/feedback/user/${userId}`, { headers: this.getHeaders() });
    }

    deleteFeedback(feedbackId: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/feedback/${feedbackId}`, { headers: this.getHeaders() });
    }

    getFeedbacks(): Observable<Feedback[]> {
        return this.httpClient.get<Feedback[]>(`${this.baseUrl}/feedback`, { headers: this.getHeaders() });
    }
}
