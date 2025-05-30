import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-global-loader',
  template: `
    <div *ngIf="loaderService.loading$ | async" class="global-loader-overlay">
      <div class="global-loader"></div>
    </div>
  `,
  styleUrls: ['./global-loader.component.css']
})
export class GlobalLoaderComponent {
  constructor(public loaderService: LoaderService) {}
}