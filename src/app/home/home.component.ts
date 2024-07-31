import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { DonService } from '../services/don.service';
import { CampagneService } from '../services/campagne.service';


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
  
  constructor(
    private userService :UsersService,
    private donService : DonService, 
    private campagneService : CampagneService,
    private authService : AuthService,
    private router: Router) { }

    getDonneur(){
    this.userService.getTotalDonneur().subscribe({
      next: (res : any )=> {
        this.donneurCount  = res 
        console.log("donneur "+ res);
        
      }
    })
  }

  getTotalProjects(){
    if(this.authService.getUserRole()!="ADMIN"){
      this.campagneService.getAllByUserId(this.authService.getUserId()).subscribe({
        next : (res : any )=>{
          this.sponsorsCount = res.length ;
        }
      })
    } else {
    this.campagneService.getTotal().subscribe({
      next : (res : any )=>{
        this.sponsorsCount = res ;
      }
    })
  }}

  getDonataire(){
    this.userService.getTotalDonatiare().subscribe({
      next: (res : any )=> {
        this.donataireCount  = res 
        console.log("donataire"+ res);

      }
    })
  }

  getDons(){
  this.donService.getTotal().subscribe({
        next: (res : any )=> {
          this.donsCount  = res
          console.log("dons "+ res);
 
        }
      })
  }

  isConnected(): boolean {
    return this.authService.isAuthenticated();
  }

  getRole(): string{
    return this.authService.getUserRole();
  }

  ngOnInit(): void {
    this.displayedCompanies = this.companies.slice(0, 3);
    setInterval(() => {
      this.changeDisplayedLogos();
    }, 3000);
    this.getDonataire()
    this.getDonneur()
    this.getDons()
    this.getTotalProjects()
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
