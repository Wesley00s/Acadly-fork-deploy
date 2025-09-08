import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestModalForm } from './guest-modal-form';

describe('GuestModalForm', () => {
  let component: GuestModalForm;
  let fixture: ComponentFixture<GuestModalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestModalForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestModalForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
