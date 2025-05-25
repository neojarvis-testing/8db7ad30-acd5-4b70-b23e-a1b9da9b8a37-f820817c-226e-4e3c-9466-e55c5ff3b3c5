import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateConferenceEventComponent } from './admin-create-conference-event.component';

describe('AdminCreateConferenceEventComponent', () => {
  let component: AdminCreateConferenceEventComponent;
  let fixture: ComponentFixture<AdminCreateConferenceEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCreateConferenceEventComponent]
    });
    fixture = TestBed.createComponent(AdminCreateConferenceEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
