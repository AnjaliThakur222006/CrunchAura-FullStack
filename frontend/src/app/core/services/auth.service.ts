import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RegistrationPayload, User } from '../models/models';

@Injectable({providedIn:'root'})
export class AuthService {
  private readonly key = 'crunchaura_token';
  private userState = signal<User | null>(null);
  user = this.userState.asReadonly();

  constructor(private http: HttpClient) {
    if (localStorage.getItem(this.key)) this.loadMe().subscribe();
  }

  isLoggedIn() { return !!localStorage.getItem(this.key); }

  token() { return localStorage.getItem(this.key); }

  login(email: string, password: string) {
    return this.http.post<{access:string;user:User}>(`${environment.apiUrl}/auth/login/`, {email,password})
      .pipe(tap(res => {
        localStorage.setItem(this.key,res.access);
        this.userState.set(res.user);
      }));
  }

  register(payload: RegistrationPayload) {
    return this.http.post<{access:string;user:User}>(`${environment.apiUrl}/auth/register/`, payload)
      .pipe(tap(res => {
        localStorage.setItem(this.key,res.access);
        this.userState.set(res.user);
      }));
  }

  loadMe() {
    return this.http.get<User>(`${environment.apiUrl}/auth/me/`).pipe(
      tap(user => this.userState.set(user)),
      catchError(() => { this.logout(); return of(null); })
    );
  }

  logout() {
    localStorage.removeItem(this.key);
    this.userState.set(null);
  }

  updateProfile(payload: Partial<User>) {
    return this.http.put<User>(`${environment.apiUrl}/auth/me/`, payload)
      .pipe(tap(user => this.userState.set(user)));
  }
}
