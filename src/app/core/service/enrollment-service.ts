import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ValidationResponse} from '../types/ValidationResponse';
import {environment} from '../../../environment/enviroment';
import {Pagination} from '../types/Pagination';
import {Enrollment} from '../types/Enrollment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private readonly apiUrl = `${environment.apiUrl}/enrollment`;
  private http = inject(HttpClient);

  validateToken(token: string): Observable<ValidationResponse> {
    const requestBody = { token: token };
    return this.http.post<ValidationResponse>(`${this.apiUrl}/validate/token`, requestBody);
  }

  validateNumericCode(eventId: number, numericCode: string): Observable<ValidationResponse> {
    const requestBody = {
      eventId: eventId,
      numericCode: numericCode
    };

    return this.http.post<ValidationResponse>(`${this.apiUrl}/validate/code`, requestBody);
  }

  getAllByEvent(eventId: number, query: string, page = 0, size = 0): Observable<Pagination<Enrollment>> {
    const params = [
      `query=${query}`,
      `page=${page}`,
      `size=${size}`
    ].filter(param => param !== '')
    .join('&');

    return this.http.get<Pagination<Enrollment>>(`${this.apiUrl}/get-all-by-event/${eventId}?${params}`);
  }
}
