import { Component } from '@angular/core';
import Chart from 'chart.js/auto'; // Import Chart.js

@Component({
  selector: 'app-org-graph-doughnut',
  templateUrl: './org-graph-doughnut.component.html',
  styleUrl: './org-graph-doughnut.component.css'
})
export class OrgGraphDoughnutComponent {
  chart: any;

  constructor() { }

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['campagne 1', 'campagne 2', 'campagne 3'], // Course names
        datasets: [{
          label: 'Dons',
          data: [5000, 17000, 10000], // Number of learners per course
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
}

