import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent {
  menuOpen = false;
  dropdownOpen = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
    if (!this.menuOpen) {
      this.dropdownOpen = false;
    }
  }

  closeMenu() {
    this.menuOpen = false;
    this.dropdownOpen = false;
    document.body.style.overflow = '';
  }

  get userName(): string | null {
    return localStorage.getItem('userName');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 900 && this.menuOpen) {
      this.closeMenu();
    }
  }
}