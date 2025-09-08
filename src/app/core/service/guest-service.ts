import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environment/enviroment';
import {HttpClient} from '@angular/common/http';
import {Period} from '../types/Guest/index.request';
import {Observable} from 'rxjs';
import {Guest} from '../types/Guest';

@Injectable({
  providedIn: 'root'
})

export class GuestService {

  private readonly apiUrl = `${environment.apiUrl}/guests/event`;
  private http = inject(HttpClient);

  getGuests(eventId: number, period: Period): Observable<Guest[]> {
    return this.http.get<Guest[]>(`${this.apiUrl}/${eventId}/period/${period}`);
  }

  saveGuest(eventId: number, formData: FormData, guestId?: number): Observable<Guest> {
    if (guestId) {
      return this.http.patch<Guest>(`${this.apiUrl}/${guestId}`, formData);
    }
    return this.http.post<Guest>(`${this.apiUrl}/${eventId}`, formData);
  }

  deleteGuest(eventId: number, guestId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}/guest/${guestId}`);
  }
}
