import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-overlay-menu',
  templateUrl: './overlay-menu.component.html',
  styleUrls: ['./overlay-menu.component.css']
})
export class OverlayMenuComponent implements OnChanges {
  @Input() isMenuOpen: boolean = false;
  @Output() menuClosed = new EventEmitter<void>();
  isMenuClosing: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['isMenuOpen'] && !changes['isMenuOpen'].currentValue) {
      this.isMenuClosing = true;
      setTimeout(() => {
        this.isMenuClosing = false;
        this.menuClosed.emit();
      }, 700); // Duration should match CSS transition duration
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  closeMenuAndNavigate(route: string) {
    this.menuClosed.emit(); // Emit menuClosed event first
    setTimeout(() => {
      this.router.navigate([route]); // Navigate to the specified route after a delay
    }, 700); // Delay should match CSS transition duration
  }

  getRole(): string{     
        return this.authService.getUserRole();
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
