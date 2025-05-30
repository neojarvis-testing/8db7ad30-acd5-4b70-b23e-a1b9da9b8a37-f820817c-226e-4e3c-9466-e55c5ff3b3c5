import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminCreateConferenceEventComponent } from './components/admin-create-conference-event/admin-create-conference-event.component';
import { AdminEditConferenceEventComponent } from './components/admin-edit-conference-event/admin-edit-conference-event.component';
import { AdminViewBookingsComponent } from './components/admin-view-bookings/admin-view-bookings.component';
import { AdminViewConferenceEventComponent } from './components/admin-view-conference-event/admin-view-conference-event.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { adminGuard } from './components/authguard/authguard';
import { SharedModule } from './shared/shared.module';
import { AdminLayoutComponent } from './layouts/admin-layout.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, canActivate: [adminGuard] },
            { path: 'viewbooking', component: AdminViewBookingsComponent, canActivate: [adminGuard] },
            { path: 'createconferenceevent', component: AdminCreateConferenceEventComponent, canActivate: [adminGuard] },
            { path: 'viewconferenceevent', component: AdminViewConferenceEventComponent, canActivate: [adminGuard] },
            { path: 'editconferenceevent/:id', component: AdminEditConferenceEventComponent, canActivate: [adminGuard] },
            { path: 'feedback', component: AdminviewfeedbackComponent, canActivate: [adminGuard] },
        ]
    }
];

@NgModule({
    declarations: [
        AdminLayoutComponent,
        AdminnavComponent,
        AdminViewBookingsComponent,
        AdminCreateConferenceEventComponent,
        AdminViewConferenceEventComponent,
        AdminEditConferenceEventComponent,
        AdminviewfeedbackComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class AdminModule { }