import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Feedback } from "../models/feedback.model";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    private get baseUrl(): string {
        return environment.apiBaseUrl;
    }

    constructor(private httpClient: HttpClient) {}

    private get headers(): HttpHeaders {
        const token = localStorage.getItem('token');
        return token
            ? new HttpHeaders({ 'Authorization': `Bearer ${token}` })
            : new HttpHeaders();
    }

    private get options() {
        return { headers: this.headers };
    }

    sendFeedback(feedback: Feedback): Observable<Feedback> {
        return this.httpClient.post<Feedback>(`${this.baseUrl}/feedback`, feedback, this.options);
    }

    getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
        return this.httpClient.get<Feedback[]>(`${this.baseUrl}/feedback/user/${userId}`, this.options);
    }

    deleteFeedback(feedbackId: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/feedback/${feedbackId}`, this.options);
    }

    getFeedbacks(): Observable<Feedback[]> {
        return this.httpClient.get<Feedback[]>(`${this.baseUrl}/feedback`, this.options);
    }
}