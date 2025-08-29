import {HttpClient} from "@angular/common/http";
import {computed, inject, Injectable, PLATFORM_ID, signal} from "@angular/core";
import {User} from "../types/User";
import {Auth} from "../types/User/auth";
import {catchError, concatMap, EMPTY, finalize, Observable, ReplaySubject, tap} from 'rxjs';
import {environment} from '../../../environment/enviroment';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly adminLoginApiUrl = `${environment.apiUrl}/auth/login`;
  private readonly employeeLoginApiUrl = `${environment.apiUrl}/employee/auth`;
  private readonly logoutApiUrl = `${environment.apiUrl}/auth/logout`;
  private readonly currentUserApiUrl = `${environment.apiUrl}/auth/me`;

  private http = inject(HttpClient);
  private readonly isBrowser: boolean;
  private readonly platformId = inject(PLATFORM_ID);

  currentUser = signal<User | null>(null);
  isLogged = computed(() => !!this.currentUser());
  userRole = computed(() => this.currentUser()?.role ?? null);

  private initialized$ = new ReplaySubject<boolean>(1);

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.fetchCurrentUser().subscribe();
    } else {
      this.initialized$.next(true);
      this.initialized$.complete();
    }
  }

  authInitialized(): Observable<boolean> {
    return this.initialized$.asObservable();
  }

  private fetchCurrentUser() {
    return this.http.get<User>(this.currentUserApiUrl).pipe(
      tap(user => this.currentUser.set(user)),
      catchError(() => {
        this.currentUser.set(null);
        return EMPTY;
      }),
      finalize(() => {
        this.initialized$.next(true);
        this.initialized$.complete();
      })
    );
  }

  loginAdmin(credentials: Auth) {
    return this.http.post<void>(this.adminLoginApiUrl, credentials).pipe(
      concatMap(() => this.fetchCurrentUser())
    );
  }

  loginEmployee(credentials: Auth) {
    return this.http.post<void>(this.employeeLoginApiUrl, credentials).pipe(
      concatMap(() => this.fetchCurrentUser())
    );
  }

  logout(): void {
    if (this.isBrowser) {
      this.http.post<void>(this.logoutApiUrl, {}).subscribe({
        next: () => this.currentUser.set(null),
        error: () => this.currentUser.set(null),
      });
    } else {
      this.currentUser.set(null);
    }
  }
}
