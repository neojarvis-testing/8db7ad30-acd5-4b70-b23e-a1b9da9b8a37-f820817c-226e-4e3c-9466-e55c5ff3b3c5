import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public apiUrl = 'https://8080-dedbbeabbedbaacafdecbcbbfceececffbc.project.examly.io/api/Authentication';
    private userRole = new BehaviorSubject<string | null>(localStorage.getItem('role'));
    private userId = new BehaviorSubject<number | null>(null);
    private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

    constructor(private http: HttpClient) { }

    register(user: User): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, { Email: email, Password: password }).pipe(
            tap((response: any) => {
                if (response && response.token) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('role', response.role);
                    localStorage.setItem('userId', response.userId);
                    this.userRole.next(response.role);
                    this.userId.next(response.id);
                    this.loggedIn.next(true);
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

    get isLoggedIn$(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        this.userRole.next(null);
        this.userId.next(null);
        this.loggedIn.next(false);
    }
}