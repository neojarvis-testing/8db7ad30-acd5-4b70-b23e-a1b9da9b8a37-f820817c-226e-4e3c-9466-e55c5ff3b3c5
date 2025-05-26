import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditConferenceEventComponent } from './admin-edit-conference-event.component';

describe('AdminEditConferenceEventComponent', () => {
  let component: AdminEditConferenceEventComponent;
  let fixture: ComponentFixture<AdminEditConferenceEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditConferenceEventComponent]
    });
    fixture = TestBed.createComponent(AdminEditConferenceEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
