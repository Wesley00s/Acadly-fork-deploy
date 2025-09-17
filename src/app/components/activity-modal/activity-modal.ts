import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Activity} from '../../core/types/Activity';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-activity-modal',
    imports: [
        DatePipe
    ],
  templateUrl: './activity-modal.html',
  standalone: true,
  styleUrl: './activity-modal.scss'
})
export class ActivityModal {
  @Input() isVisible = false;

  @Input() activity: Activity | null = null;
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
