import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserBookConferenceEventComponent } from './user-book-conference-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserBookConferenceEventComponent', () => {
  let component: UserBookConferenceEventComponent;
  let fixture: ComponentFixture<UserBookConferenceEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ UserBookConferenceEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookConferenceEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_UserBookConferenceEventComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_conference_event_booking_form_heading_in_the_UserBookConferenceEventComponent', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Conference Event Booking Form');
  });
});
