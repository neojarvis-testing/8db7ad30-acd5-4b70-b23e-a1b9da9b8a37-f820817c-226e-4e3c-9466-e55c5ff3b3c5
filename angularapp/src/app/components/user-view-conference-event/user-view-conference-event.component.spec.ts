import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewConferenceEventComponent } from './user-view-conference-event.component';

describe('UserViewConferenceEventComponent', () => {
  let component: UserViewConferenceEventComponent;
  let fixture: ComponentFixture<UserViewConferenceEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserViewConferenceEventComponent]
    });
    fixture = TestBed.createComponent(UserViewConferenceEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
