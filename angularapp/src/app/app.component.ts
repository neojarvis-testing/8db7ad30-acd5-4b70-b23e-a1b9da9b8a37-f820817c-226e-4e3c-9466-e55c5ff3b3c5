import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Conference Event Management System';
  constructor(public loaderService: LoaderService) {}
}
