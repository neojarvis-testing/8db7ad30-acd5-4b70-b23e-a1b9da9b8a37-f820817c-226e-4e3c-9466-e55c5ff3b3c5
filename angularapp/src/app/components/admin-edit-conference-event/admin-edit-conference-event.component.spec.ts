import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AdminEditConferenceEventComponent } from './admin-edit-conference-event.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('AdminEditConferenceEventComponent', () => {
  let component: AdminEditConferenceEventComponent;
  let fixture: ComponentFixture<AdminEditConferenceEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [AdminEditConferenceEventComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 456 }), // Mock ID for testing
            snapshot: {
              paramMap: {
                get: () => '456',
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditConferenceEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_AdminEditConferenceEventComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_edit_conference_event_heading_in_the_AdminEditConferenceEventComponent', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Edit Conference Event');
  });
});
