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
import { AdminCreateConferenceEventComponent } from './components/admin-create-conference-event/admin-create-conference-event.component';
import { AdminEditConferenceEventComponent } from './components/admin-edit-conference-event/admin-edit-conference-event.component';
import { AdminViewConferenceEventComponent } from './components/admin-view-conference-event/admin-view-conference-event.component';

const routes: Routes = [
  // Home or landing route (adjust as needed)
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Main application routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  { path: 'home', component: HomeComponent },

  { path: 'createconferenceevent', component: AdminCreateConferenceEventComponent },
  { path: 'editconferenceevent', component: AdminEditConferenceEventComponent },
  { path: 'viewconferenceevent', component: AdminViewConferenceEventComponent },
  { path: 'adminviewbooking', component: AdminViewBookingsComponent },
  //Admin routes
  { path: 'adminfeedback', component: AdminviewfeedbackComponent, canActivate: [adminGuard] },
  //User routes
  { path: 'userfeedback', component: UserviewfeedbackComponent, canActivate: [userGuard] },
  { path: 'addfeedback', component: UseraddfeedbackComponent, canActivate: [userGuard] },

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