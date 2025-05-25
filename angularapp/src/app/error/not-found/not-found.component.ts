import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-not-found',
  template: `
    <div class="error-container">
      <h1>404 - Page Not Found</h1>
      <p>We couldn't find the page you're looking for. Please check the URL or go back home.</p>
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
export class NotFoundComponent { }
