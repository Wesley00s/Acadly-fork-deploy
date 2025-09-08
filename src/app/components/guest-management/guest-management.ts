import {Component, inject, Input, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, forkJoin, Observable, of, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {GuestModalForm} from '../guest-modal-form/guest-modal-form';
import {AlertModalComponent} from '../alert-modal/alert-modal.component';
import {ToRelativePathPipe} from '../../shared/pipes/to-relative-path-pipe';
import {GuestService} from '../../core/service/guest-service';
import {ToastService} from '../../core/service/toast-service';
import {Guest} from '../../core/types/Guest';
import {Period} from '../../core/types/Guest/index.request';

@Component({
  selector: 'app-guest-management',
  imports: [
    CommonModule,
    GuestModalForm,
    AlertModalComponent,
    NgOptimizedImage,
    ToRelativePathPipe
  ],
  templateUrl: './guest-management.html',
  styleUrls: ['./guest-management.scss']
})
export class GuestManagement implements OnInit {
  @Input({required: true}) eventId!: number;

  private guestService = inject(GuestService);
  private toastService = inject(ToastService);

  private refresh$ = new BehaviorSubject<void>(undefined);
  guests$!: Observable<Guest[]>;

  isFormModalVisible = false;
  isAlertModalVisible = false;
  selectedGuest: Guest | null = null;
  private guestIdToDelete: number | null = null;

  ngOnInit(): void {
    this.guests$ = this.refresh$.pipe(
      switchMap(() => {
        const guestRequests$: Observable<Guest[]>[] = Object.values(Period).map(period =>
          this.guestService.getGuests(this.eventId, period as Period)
        );

        return forkJoin(guestRequests$).pipe(
          map((results: Guest[][]) => results.flat()),
          catchError(error => {
            console.error('Falha ao buscar convidados por período', error);
            this.toastService.showError('Não foi possível carregar a lista de convidados.');
            return of([]);
          })
        );
      })
    );
  }

  private refreshData(): void {
    this.refresh$.next();
  }

  onAddGuest(): void {
    this.selectedGuest = null;
    this.isFormModalVisible = true;
  }

  onEditGuest(guest: Guest): void {
    this.selectedGuest = {...guest};
    this.isFormModalVisible = true;
  }

  onDeleteGuest(id: number): void {
    this.guestIdToDelete = id;
    this.isAlertModalVisible = true;
  }

  closeFormModal(): void {
    this.isFormModalVisible = false;
    this.selectedGuest = null;
  }

  saveGuest(formData: FormData): void {
    const guestId = this.selectedGuest ? this.selectedGuest.id : undefined;

    this.guestService.saveGuest(this.eventId, formData, guestId).subscribe({
      next: (savedGuest) => {
        const message = this.selectedGuest ? 'Convidado atualizado!' : `Convidado "${savedGuest.name}" criado!`;
        this.toastService.showSuccess(message);
        this.closeFormModal();
        this.refreshData();
      },
      error: (err) => {
        this.toastService.showError(err.error?.message || 'Falha ao salvar convidado.')
        console.error('Erro ao salvar convidado:', err);
      }
    });
  }

  handleAlertClose(confirmed: boolean): void {
    this.isAlertModalVisible = false;
    if (confirmed && this.guestIdToDelete) {
      this.guestService.deleteGuest(this.eventId, this.guestIdToDelete).subscribe({
        next: () => {
          this.toastService.showSuccess('Convidado excluído com sucesso.');
          this.refreshData();
        },
        error: (err) => this.toastService.showError(err.error?.message || 'Falha ao excluir convidado.')
      });
    }
    this.guestIdToDelete = null;
  }

  protected readonly Period = Period;
}
