import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent {

  menuOpen = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  // Computed on every access (not just once at construction),
  // so it always reflects the current sessionStorage value.
  get role(): string | null {
    return this.auth.getRole(); 
  }

  toggleMenu(): void {

    this.menuOpen = !this.menuOpen;

  }


  navigate(path: string): void {

    this.menuOpen = false;

    this.router.navigate([path]);

  }


  logout(): void {

    this.menuOpen = false;
    this.auth.logout();
    this.router.navigate(['/app-login']);

  }

}
