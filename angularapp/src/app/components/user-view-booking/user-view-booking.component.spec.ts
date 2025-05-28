import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewBookingComponent } from './user-view-booking.component';

describe('UserViewBookingComponent', () => {
  let component: UserViewBookingComponent;
  let fixture: ComponentFixture<UserViewBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserViewBookingComponent]
    });
    fixture = TestBed.createComponent(UserViewBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
