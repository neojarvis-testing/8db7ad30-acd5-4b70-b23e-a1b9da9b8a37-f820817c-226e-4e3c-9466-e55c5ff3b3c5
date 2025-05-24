import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public apiUrl = 'http://your-workspace-url:8080/api';
    private userRole = new BehaviorSubject<string | null>(null);
    private userId = new BehaviorSubject<number | null>(null);

    constructor(private http: HttpClient) { }

    register(user: User): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    login(login: Login): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, login).pipe(
            tap((response: any) => {
                if (response && response.token) {
                    localStorage.setItem('token', response.token);
                    this.userRole.next(response.role);
                    this.userId.next(response.id);
                }
            })
        );
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getUserRole(): Observable<string | null> {
        return this.userRole.asObservable();
    }

    getUserId(): Observable<number | null> {
        return this.userId.asObservable();
    }

    logout(): void {
        localStorage.removeItem('token');
        this.userRole.next(null);
        this.userId.next(null);
    }
}
