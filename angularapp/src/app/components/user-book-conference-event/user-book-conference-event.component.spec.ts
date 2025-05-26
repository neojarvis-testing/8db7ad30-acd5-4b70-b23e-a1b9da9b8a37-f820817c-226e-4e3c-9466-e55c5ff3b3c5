import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookConferenceEventComponent } from './user-book-conference-event.component';

describe('UserBookConferenceEventComponent', () => {
  let component: UserBookConferenceEventComponent;
  let fixture: ComponentFixture<UserBookConferenceEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBookConferenceEventComponent]
    });
    fixture = TestBed.createComponent(UserBookConferenceEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
