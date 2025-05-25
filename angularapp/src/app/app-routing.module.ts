import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { InternalServerErrorComponent } from './error/internal-server-error/internal-server-error.component';

const routes: Routes = [{ path: '', component: AppComponent },
// ... your other application routes
{ path: '404', component: NotFoundComponent },
{ path: '500', component: InternalServerErrorComponent },
{ path: '**', redirectTo: '/404' }  // Fallback route for no-match URLs];
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
