import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  companies: string[] = ['assets/UIB.png', 'assets/esprit.png', 'assets/esen.png', 'assets/click.png', 'assets/ooredoo.png', 'assets/campus.png'];
  currentIndex: number = 0;
  displayedCompanies: string[] = [];
  animationClass: string = '';

  donneurCount = 100;
  donataireCount = 100;
  sponsorsCount = 10;
  donsCount = 100000;

  donneurCountTriggered = false;
  donataireCountTriggered = false;
  sponsorsCountTriggered = false;
  donsCountTriggered = false;
  
  constructor(private router: Router, private authService: AuthService) { }

  isConnected(): boolean {
    return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.displayedCompanies = this.companies.slice(0, 3);
    setInterval(() => {
      this.changeDisplayedLogos();
    }, 3000);
  }

  changeDisplayedLogos() {
    this.currentIndex = (this.currentIndex + 3) % this.companies.length;
    const newLogos = this.companies.slice(this.currentIndex, this.currentIndex + 3);
    this.displayedCompanies.forEach((logo, i) => {
      setTimeout(() => {
        this.displayedCompanies[i] = newLogos[i];
      }, i * 500); // stagger the animation by 500ms
    });
  }

  triggerCountUp() {
    if (!this.donneurCountTriggered) {
      this.donneurCountTriggered = true;
      // trigger count up for donneurCount
    }
    if (!this.donataireCountTriggered) {
      this.donataireCountTriggered = true;
      // trigger count up for donataireCount
    }
    if (!this.sponsorsCountTriggered) {
      this.sponsorsCountTriggered = true;
      // trigger count up for sponsorsCount
    }
    if (!this.donsCountTriggered) {
      this.donsCountTriggered = true;
      // trigger count up for donsCount
    }
  }
  
  toggleDescription(stepId: string) {
    const description = document.getElementById(stepId + '-description') as HTMLElement;
    if (description.style.display === 'none' || description.style.display === '') {
      description.style.display = 'block';
    } else {
      description.style.display = 'none';
    }
  }

  GoToContribute(route: string) {
    // needs .ts to test if he is connected (if he is then route announcements if no route login)
    this.router.navigate([route]); 
  }

  
}
