import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAppliedConferenceEventComponent } from './user-applied-conference-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserAppliedConferenceEventComponent', () => {
  let component: UserAppliedConferenceEventComponent;
  let fixture: ComponentFixture<UserAppliedConferenceEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ UserAppliedConferenceEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAppliedConferenceEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_UserAppliedConferenceEventComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_applied_conference_events_heading_in_the_UserAppliedConferenceEventComponent', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Applied Conference Events');
  });
});
