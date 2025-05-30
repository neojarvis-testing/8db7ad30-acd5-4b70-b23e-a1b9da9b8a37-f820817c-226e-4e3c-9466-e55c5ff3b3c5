import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnDestroy {
  menuOpen = false;
  dropdownOpen = false;
  private loginSub?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }

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