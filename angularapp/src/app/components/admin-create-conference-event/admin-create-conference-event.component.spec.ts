import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AdminCreateConferenceEventComponent } from './admin-create-conference-event.component';
import { ConferenceEventService } from 'src/app/services/conference-event.service';
import { Router } from '@angular/router';

describe('AdminCreateConferenceEventComponent', () => {
  let component: AdminCreateConferenceEventComponent;
  let fixture: ComponentFixture<AdminCreateConferenceEventComponent>;
  let conferenceEventService: jasmine.SpyObj<ConferenceEventService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const conferenceEventServiceSpy = jasmine.createSpyObj('ConferenceEventService', ['addConferenceEvent']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [AdminCreateConferenceEventComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: ConferenceEventService, useValue: conferenceEventServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(AdminCreateConferenceEventComponent);
    component = fixture.componentInstance;
    conferenceEventService = TestBed.inject(ConferenceEventService) as jasmine.SpyObj<ConferenceEventService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  fit('Frontend_should_create_AdminCreateConferenceEventComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_create_new_conference_event_heading_in_the_AdminCreateConferenceEventComponent', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Create New Conference Event');
  });

});
