import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { InternalServerErrorComponent } from './error/internal-server-error/internal-server-error.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { LoginComponent } from './components/login/login.component';
import { AdminViewBookingsComponent } from './components/admin-view-bookings/admin-view-bookings.component';
import { HomeComponent } from './components/home/home.component';
import { adminGuard, userGuard } from './components/authguard/authguard';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { AdminViewConferenceEventComponent } from './components/admin-view-conference-event/admin-view-conference-event.component';
import { AdminEditConferenceEventComponent } from './components/admin-edit-conference-event/admin-edit-conference-event.component';
import { AdminCreateConferenceEventComponent } from './components/admin-create-conference-event/admin-create-conference-event.component';
import { UserAppliedConferenceEventComponent } from './components/user-applied-conference-event/user-applied-conference-event.component';
import { UserBookConferenceEventComponent } from './components/user-book-conference-event/user-book-conference-event.component';
import { UserViewConferenceEventComponent } from './components/user-view-conference-event/user-view-conference-event.component';
import { UserViewBookingComponent } from './components/user-view-booking/user-view-booking.component';



const routes: Routes = [
  // Home or landing route (adjust as needed)
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Main application routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  { path: 'home', component: HomeComponent },


  { path: 'adminviewbooking', component: AdminViewBookingsComponent, canActivate: [adminGuard] },
  { path: 'userviewbooking', component: UserViewBookingComponent, canActivate: [userGuard] },
  //Admin routes
  { path: 'admincreateconferenceevent', component: AdminCreateConferenceEventComponent, canActivate: [adminGuard] },
  { path: 'adminviewconferenceevent', component: AdminViewConferenceEventComponent, canActivate: [adminGuard] },
  { path: 'admineditconferenceevent/:id', component: AdminEditConferenceEventComponent, canActivate: [adminGuard] },
  { path: 'adminfeedback', component: AdminviewfeedbackComponent, canActivate: [adminGuard] },
  //User routes
  { path: 'userfeedback', component: UserviewfeedbackComponent, canActivate: [userGuard] },
  { path: 'addfeedback', component: UseraddfeedbackComponent, canActivate: [userGuard] },
  { path: 'userappliedconferenceevent', component: UserAppliedConferenceEventComponent, canActivate: [userGuard] },
  { path: 'userbookconferenceevent', component: UserBookConferenceEventComponent, canActivate: [userGuard] },
  { path: 'userviewconferenceevent', component: UserViewConferenceEventComponent, canActivate: [userGuard] },

  // Error routes
  { path: '404', component: NotFoundComponent },
  { path: '500', component: InternalServerErrorComponent },

  // Fallback route for no-match URLs
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }