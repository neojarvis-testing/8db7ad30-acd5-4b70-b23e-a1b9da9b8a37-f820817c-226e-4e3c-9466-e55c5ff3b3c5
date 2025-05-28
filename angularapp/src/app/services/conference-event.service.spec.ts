import { TestBed } from '@angular/core/testing';

import { ConferenceEventService } from './conference-event.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConferenceEventService', () => {
  let service: ConferenceEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ConferenceEventService);
  });

  fit('Frontend_should_create_conferenceevent_service', () => {
    expect(service).toBeTruthy();
  });
});
