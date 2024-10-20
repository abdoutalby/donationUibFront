import { Component, OnInit } from '@angular/core';
import { CampagneService } from '../services/campagne.service';
import { DonService } from '../services/don.service';
 
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent  implements OnInit{


  nouvellesCampagnes : any 

  organisationsReussies : any 
  derniersDonateurs :any 
  constructor(
    private donService : DonService,
    private campagneService : CampagneService){

  }
  ngOnInit(): void {
    this.campagneService.getLastThree().subscribe({
      next : (res : any )=>{ this.nouvellesCampagnes = res 
        console.log(res); 
      },
      error : (err : any )=> console.log(err)
      
    })

    this.campagneService.getFinished().subscribe({
      next : (res : any )=>{ this.organisationsReussies = res 
        console.log(res); 
      },
      error : (err : any )=> console.log(err)
      
    })
 
    this.donService.getLastThree().subscribe({
      next : (res : any )=>{ this.derniersDonateurs = res 
        console.log(res); 
      },
      error : (err : any )=> console.log(err)
      
    })

    
  }

  
}