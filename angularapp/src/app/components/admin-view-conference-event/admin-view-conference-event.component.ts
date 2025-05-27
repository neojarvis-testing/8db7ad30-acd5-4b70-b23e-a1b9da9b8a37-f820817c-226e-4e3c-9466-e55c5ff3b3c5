import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  standalone: false,
  selector: 'app-admin-view-conference-event',
  templateUrl: './admin-view-conference-event.component.html',
  styleUrls: ['./admin-view-conference-event.component.css']
})
export class AdminViewConferenceEventComponent {

  eventForm: FormGroup;

  // Simulated event data (in a real-world scenario retrieve this using a service based on a route parameter)
  eventData = {
    eventName: 'Angular Conference 2025',
    organizerName: 'TechWorld Inc.',
    category: 'Technology',
    description: 'An event focusing on Angular, web development, and advanced JS techniques.',
    location: 'San Francisco, CA',
    startDateTime: '2025-06-15T09:00',
    endDateTime: '2025-06-15T17:00',
    capacity: 200
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Build the form with the same controls as in create/edit
    this.eventForm = this.formBuilder.group({
      eventName: [''],
      organizerName: [''],
      category: [''],
      description: [''],
      location: [''],
      startDateTime: [''],
      endDateTime: [''],
      capacity: ['']
    });

    // Pre-populate the form with existing event data.
    // In a real app, you might extract an "id" from the route then load the event from a service.
    this.eventForm.patchValue(this.eventData);
    // Disable the form to render it as read-only.
    this.eventForm.disable();
  }

  goBack(): void {
    // Navigate back to the event listing or previous page.
    this.router.navigate(['/adminviewbooking']);
  }

}
