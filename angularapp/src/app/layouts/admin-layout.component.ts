import { Component } from '@angular/core';
@Component({
  selector: 'app-admin-layout',
  template: `
    <app-adminnav></app-adminnav>
    <div class="admin-content">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AdminLayoutComponent {}