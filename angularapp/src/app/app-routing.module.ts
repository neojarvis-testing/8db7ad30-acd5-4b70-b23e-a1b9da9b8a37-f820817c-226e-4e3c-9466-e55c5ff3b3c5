import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { InternalServerErrorComponent } from './error/internal-server-error/internal-server-error.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  // Home or landing route (adjust as needed)
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Main application routes
  { path: 'login', component: RegistrationComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'feedback', component: FeedbackComponent },

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