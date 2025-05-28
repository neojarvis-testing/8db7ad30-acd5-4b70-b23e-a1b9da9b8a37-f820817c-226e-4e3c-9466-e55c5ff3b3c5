import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: false,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn = false;
  menuOpen = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(val => this.isLoggedIn = val);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }

  get userRole(): string | null {
    return localStorage.getItem('role');
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
