import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { UsersService } from '../../services/users.service';
import { Campagne } from '../../models/campagne.model';

@Component({
  selector: 'app-adm-graph',
  templateUrl: './adm-graph.component.html',
  styleUrl: './adm-graph.component.css'
})
export class AdmGraphComponent {
  chart: any;
  showData : any =[] ;
  labels : any  =[];
  @Input()
  data : any[] | undefined; 
  @Input()
  type : any ;

  constructor(private userService : UsersService) { 
  }
  setupChart(){
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.labels, // Course names
        datasets: [{
          label: 'Total des dons',
          data: this.showData, // Number of learners per course
          backgroundColor: [
            'rgba(153, 0, 0, 0.2)',   // Dark red
            'rgba(0, 51, 102, 0.2)',  // Dark blue
            'rgba(128, 128, 0, 0.2)', // Dark yellow
          ],
          borderColor: [
            'rgba(153, 0, 0, 1)',     // Dark red
            'rgba(0, 51, 102, 1)',    // Dark blue
            'rgba(128, 128, 0, 1)',   // Dark yellow
          ],
          borderWidth: 1.5
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  ngOnInit(): void {
    
    for(let i = 0 ; i<this.data!.length ; i++){      
        if(this.type == "donataire"){
          this.labels.push(this.data![i].name)
          this.showData.push(this.data![i].donataire.totalRecived)
        }else if(this.type == "donneur") {
          this.labels.push(this.data![i].name)
        this.showData.push(this.data![i].donneur.totalGives)
      }else {
        this.labels.push(this.data![i].nom)
        this.showData.push(this.data![i].montantCollecte)
      }
    }

      this.setupChart()   

  }

}