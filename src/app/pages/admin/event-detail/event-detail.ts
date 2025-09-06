import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, Observable, switchMap} from 'rxjs';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {EventService} from '../../../core/service/event-service';
import {AsyncPipe, DatePipe} from '@angular/common';
import {Event} from '../../../core/types/Event';
import {EventModalForm} from '../../../components/event-modal-form/event-modal-form';
import {ToastService} from '../../../core/service/toast-service';
import {ActivityManagement} from '../../../components/activity-management/activity-management';
import {Enrollment} from '../../../core/types/Enrollment';
import {EnrollmentService} from '../../../core/service/enrollment-service';
import {Pagination} from '../../../core/types/Pagination';

@Component({
  selector: 'app-event-detail',
  imports: [
    AsyncPipe,
    RouterLink,
    EventModalForm,
    ActivityManagement,
    DatePipe
  ],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.scss'
})
export class EventDetail implements OnInit {
  private eventService = inject(EventService);
  private enrollmentService = inject(EnrollmentService);
  private cdr = inject(ChangeDetectorRef);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);

  event$!: Observable<Event>;
  isModalVisible = false;
  selectedEventForEdit: Event | null = null;
  private eventId!: number;
  pageSize = 10;

  private page$ = new BehaviorSubject<number>(0);
  private searchQuery$ = new BehaviorSubject<string>('');

  participantsPage$!: Observable<Pagination<Enrollment>>;

  ngOnInit(): void {
    const eventIdParam = this.route.snapshot.paramMap.get('id');
    if (eventIdParam) {
      this.eventId = +eventIdParam;
      this.loadEvent();

      this.participantsPage$ = combineLatest([
        this.page$,
        this.searchQuery$.pipe(debounceTime(300), distinctUntilChanged())
      ]).pipe(
        switchMap(([currentPage, currentQuery]) =>
          this.enrollmentService.getAllByEvent(this.eventId, currentQuery as string, currentPage as number, this.pageSize)
        )
      );
    }
  }

  loadEvent(): void {
    this.event$ = this.eventService.getEventById(this.eventId);
  }

  onSearchQueryChanged(event: any): void {
    const query = (event.target as HTMLInputElement).value;

    if (this.page$.value !== 0) {
      this.page$.next(0);
    }
    this.searchQuery$.next(query);
  }

  onPageChange(newPage: number): void {
    this.page$.next(newPage);
  }

  onEditEvent(event: Event): void {
    this.selectedEventForEdit = {...event};
    this.isModalVisible = true;
  }

  saveEvent(event: Event): void {
    this.eventService.saveEvent(event).subscribe({
      next: () => {
        this.toastService.showSuccess('Evento atualizado com sucesso!');
        this.closeModal();
        this.loadEvent();
      },
      error: (err) => {
        this.toastService.showError(err.error?.message || err || 'Falha ao salvar o evento. Tente novamente.');
      }
    });
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedEventForEdit = null;
  }
}
