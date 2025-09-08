import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestManagement } from './guest-management';

describe('GuestManagement', () => {
  let component: GuestManagement;
  let fixture: ComponentFixture<GuestManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
