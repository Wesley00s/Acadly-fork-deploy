import {ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Guest} from '../../core/types/Guest';
import {Period} from '../../core/types/Guest/index.request';

@Component({
  selector: 'app-guest-modal-form',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './guest-modal-form.html',
  styleUrls: ['./guest-modal-form.scss']
})
export class GuestModalForm implements OnInit {
  @Input() guest: Guest | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() save = new EventEmitter<FormData>();

  periodOptions = Object.values(Period);

  guestForm!: FormGroup;
  isEditMode = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);


  ngOnInit(): void {
    this.isEditMode = !!this.guest;
    this.guestForm = this.fb.group({
      name: [this.guest?.name || '', Validators.required],
      occupation: [this.guest?.occupation || '', Validators.required],
      period: [this.guest?.period || '', Validators.required],
    });
    if (this.isEditMode && this.guest?.profilePictureUrl) {
      this.imagePreview = this.guest.profilePictureUrl;
    }
  }

  onFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  onSave(): void {
    if (this.guestForm.invalid) {
      this.guestForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const guestData = this.guestForm.getRawValue();

    formData.append('guest', new Blob([JSON.stringify(guestData)], {
      type: 'application/json'
    }));

    if (this.selectedFile) {
      formData.append('profilePicture', this.selectedFile, this.selectedFile.name);
    }

    this.save.emit(formData as FormData);
  }

  onClose(): void {
    this.closeModal.emit();
  }

  protected readonly Period = Period;
}
