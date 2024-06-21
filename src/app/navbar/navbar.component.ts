// src/app/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(private router: Router) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      setTimeout(() => {
        this.isMenuOpen = false;
      }, 500); // Delay to match overlay closing transition
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  
}
