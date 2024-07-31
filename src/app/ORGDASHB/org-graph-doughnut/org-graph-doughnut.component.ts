import { Component } from '@angular/core';
import Chart from 'chart.js/auto'; // Import Chart.js
import { CampagneService } from '../../services/campagne.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-org-graph-doughnut',
  templateUrl: './org-graph-doughnut.component.html',
  styleUrl: './org-graph-doughnut.component.css'
})
export class OrgGraphDoughnutComponent {
  chart: any;
  labes : any = []
  data : any = []
  constructor(
    private authService : AuthService,
    private campganeService : CampagneService) { }

  setupChart(){
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: this.labes, // Course names
        datasets: [{
          label: 'Dons',
          data: this.data, // Number of learners per course
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
    this.campganeService.getAllByUserId(this.authService.getUserId()).subscribe({
      next :  (res : any ) =>{ console.log(res)
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          this.labes.push(element.nom)
          this.data.push(element.montantCollecte)
        }
    this.setupChart();
}})

}
}

