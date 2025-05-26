import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminViewConferenceEventComponent } from './admin-view-conference-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminViewConferenceEventComponent', () => {
  let component: AdminViewConferenceEventComponent;
  let fixture: ComponentFixture<AdminViewConferenceEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ AdminViewConferenceEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewConferenceEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_AdminViewConferenceEventComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_Conference_Event_Listings_heading_in_the_AdminViewConferenceEventComponent', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Conference Event Listings');
  });
});
