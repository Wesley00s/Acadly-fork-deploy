import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {GuestService} from '../../core/service/guest-service';
import {EventService} from '../../core/service/event-service';
import {Period} from '../../core/types/Guest/index.request';
import {catchError, forkJoin, Observable, of, startWith, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';
import {Guest} from '../../core/types/Guest';
import {ToRelativePathPipe} from '../../shared/pipes/to-relative-path-pipe';

interface GroupedGuest {
  period: Period;
  guests: Guest[];
}

type GuestGroups = Record<string, Guest[]>;

interface GuestsState {
  loading: boolean;
  guests: GroupedGuest[] | null;
}

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ToRelativePathPipe],
  templateUrl: './guests.html',
  styleUrls: ['./guests.scss']
})
export class Guests implements OnInit {
  protected readonly Period = Period;

  private guestService = inject(GuestService);
  private eventService = inject(EventService);

  guestsState$!: Observable<GuestsState>;

  ngOnInit(): void {
    this.loadGuests();
  }

  loadGuests(): void {
    this.guestsState$ = this.eventService.getEvent().pipe(
      switchMap(event => {
        if (!event) {
          return of({loading: false, guests: null});
        }

        const guestRequests$: Observable<Guest[]>[] = Object.values(Period).map(period =>
          this.guestService.getGuests(event.id!, period as Period)
        );

        return forkJoin(guestRequests$).pipe(
          map((results: Guest[][]) => results.flat()),
          map(allGuests => {
            if (!allGuests || allGuests.length === 0) {
              return [];
            }
            const groupedByPeriod = allGuests.reduce((acc: GuestGroups, guest: Guest) => {
              const period = guest.period;
              if (!acc[period]) {
                acc[period] = [];
              }
              acc[period].push(guest);
              return acc;
            }, {} as GuestGroups);
            return Object.entries(groupedByPeriod).map(([period, guests]) => ({
              period: period as Period,
              guests
            }));
          }),
          map(groupedGuests => ({loading: false, guests: groupedGuests})),
          startWith({loading: true, guests: null}),
          catchError(() => of({loading: false, guests: null}))
        );
      })
    );
  }
}
