import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserViewConferenceEventComponent } from './user-view-conference-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserViewConferenceEventComponent', () => {
  let component: UserViewConferenceEventComponent;
  let fixture: ComponentFixture<UserViewConferenceEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ UserViewConferenceEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewConferenceEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_UserViewConferenceEventComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_available_conference_events_heading_in_the_UserViewConferenceEventComponent', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Available Conference Events');
  });
});
