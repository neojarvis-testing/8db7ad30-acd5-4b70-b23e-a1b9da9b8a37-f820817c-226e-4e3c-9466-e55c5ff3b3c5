import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/app/services/user-session.service';

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
    private userSession: UserSessionService
  ) { }

  ngOnInit() {
    this.userSession.isLoggedIn$.subscribe(val => this.isLoggedIn = val);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }

  logout() {
    this.userSession.logout();
    this.router.navigate(['/login']);
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 900 && this.menuOpen) {
      this.closeMenu();
    }
  }

}
