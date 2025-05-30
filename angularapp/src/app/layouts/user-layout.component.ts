import { Component } from '@angular/core';
@Component({
  selector: 'app-user-layout',
  template: `
    <app-usernav></app-usernav>
    <div class="user-content">
      <router-outlet></router-outlet>
    </div>
  `
})
export class UserLayoutComponent {}