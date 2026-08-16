import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from '../menu/menu';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,
    MenuComponent
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class LayoutComponent {

  constructor(private router: Router) {}

  goBack(): void {
    window.history.back();
  }

  openMenu(): void {
    console.log('Menu clicked');
  }
}