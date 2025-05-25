import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppliedConferenceEventComponent } from './user-applied-conference-event.component';

describe('UserAppliedConferenceEventComponent', () => {
  let component: UserAppliedConferenceEventComponent;
  let fixture: ComponentFixture<UserAppliedConferenceEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAppliedConferenceEventComponent]
    });
    fixture = TestBed.createComponent(UserAppliedConferenceEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
