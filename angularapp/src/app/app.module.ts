import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { InternalServerErrorComponent } from './error/internal-server-error/internal-server-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminCreateConferenceEventComponent } from './components/admin-create-conference-event/admin-create-conference-event.component';
import { AdminEditConferenceEventComponent } from './components/admin-edit-conference-event/admin-edit-conference-event.component';
import { AdminViewConferenceEventComponent } from './components/admin-view-conference-event/admin-view-conference-event.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { UserAppliedConferenceEventComponent } from './components/user-applied-conference-event/user-applied-conference-event.component';
import { UserBookConferenceEventComponent } from './components/user-book-conference-event/user-book-conference-event.component';
import { UserViewConferenceEventComponent } from './components/user-view-conference-event/user-view-conference-event.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { CommonModule } from '@angular/common';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { LoginComponent } from './components/login/login.component';
import { AdminViewBookingsComponent } from './components/admin-view-bookings/admin-view-bookings.component';



@NgModule({
  declarations: [AppComponent,
    NotFoundComponent,
    InternalServerErrorComponent,
    NavbarComponent,
    RegistrationComponent,
    LoginComponent,
    AdminCreateConferenceEventComponent,
    AdminEditConferenceEventComponent,
    AdminViewConferenceEventComponent,
    AdminnavComponent,
    UserAppliedConferenceEventComponent,
    UserBookConferenceEventComponent,
    UserViewConferenceEventComponent,
    UsernavComponent,
    AdminviewfeedbackComponent,
    UseraddfeedbackComponent,
    UserviewfeedbackComponent,
    AdminViewBookingsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
