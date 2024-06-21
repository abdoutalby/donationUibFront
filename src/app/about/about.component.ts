import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  constructor(private router: Router) { }


  GoToContribute(route: string) {
    // needs .ts to test if he is connected (if he is then route announcements if no route login)
    this.router.navigate([route]); 
  }

}
