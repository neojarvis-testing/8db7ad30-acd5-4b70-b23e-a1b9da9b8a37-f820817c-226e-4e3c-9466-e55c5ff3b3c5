import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { userGuard } from './components/authguard/authguard';
import { UserAppliedConferenceEventComponent } from './components/user-applied-conference-event/user-applied-conference-event.component';
import { UserBookConferenceEventComponent } from './components/user-book-conference-event/user-book-conference-event.component';
import { UserViewConferenceEventComponent } from './components/user-view-conference-event/user-view-conference-event.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { SharedModule } from './shared/shared.module';
import { UserLayoutComponent } from './layouts/user-layout.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    {
        path: '',
        component: UserLayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, canActivate: [userGuard] },
            { path: 'feedback', component: UserviewfeedbackComponent, canActivate: [userGuard] },
            { path: 'addfeedback', component: UseraddfeedbackComponent, canActivate: [userGuard] },
            { path: 'appliedconferenceevent', component: UserAppliedConferenceEventComponent, canActivate: [userGuard] },
            { path: 'bookconferenceevent/:id', component: UserBookConferenceEventComponent, canActivate: [userGuard] },
            { path: 'viewconferenceevent', component: UserViewConferenceEventComponent, canActivate: [userGuard] },
        ]
    }
];

@NgModule({
    declarations: [
        UserLayoutComponent,
        UsernavComponent,
        UserviewfeedbackComponent,
        UseraddfeedbackComponent,
        UserAppliedConferenceEventComponent,
        UserBookConferenceEventComponent,
        UserViewConferenceEventComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class UserModule { }