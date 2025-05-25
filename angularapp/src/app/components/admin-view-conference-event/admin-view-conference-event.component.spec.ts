import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewConferenceEventComponent } from './admin-view-conference-event.component';

describe('AdminViewConferenceEventComponent', () => {
  let component: AdminViewConferenceEventComponent;
  let fixture: ComponentFixture<AdminViewConferenceEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewConferenceEventComponent]
    });
    fixture = TestBed.createComponent(AdminViewConferenceEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
