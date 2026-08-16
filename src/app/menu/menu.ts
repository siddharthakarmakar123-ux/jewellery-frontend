import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }


  toggleMenu(): void {

    this.menuOpen = !this.menuOpen;

  }


  navigate(path: string): void {

    this.menuOpen = false;

    this.router.navigate([path]);

  }


  logout(): void {

    this.menuOpen = false;

    // We will connect this to your AuthService
    // when we finalize the logout flow.
    sessionStorage.clear();
    this.router.navigate(['/app-login']);

  }

}