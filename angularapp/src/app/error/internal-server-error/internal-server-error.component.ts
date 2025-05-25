import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-internal-server-error',
  template: `
    <div class="error-container">
      <h1>500 - Internal Server Error</h1>
      <p>Something went wrong on our end. Please try again later, or return to the home page.</p>
      <a routerLink="/" class="home-link">Return to Home</a>
    </div>
  `,
  styles: [`
    .error-container {
      text-align: center;
      padding: 50px;
      color: #333;
      font-family: Arial, sans-serif;
    }
    .home-link {
      margin-top: 20px;
      display: inline-block;
      text-decoration: none;
      color: #007BFF;
    }
  `]
})
export class InternalServerErrorComponent { }
