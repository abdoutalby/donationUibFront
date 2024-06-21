import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-adm-graph',
  templateUrl: './adm-graph.component.html',
  styleUrl: './adm-graph.component.css'
})
export class AdmGraphComponent {
  chart: any;

  constructor() { }

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['Donataire 1', 'Donataire 2'], // Course names
        datasets: [{
          label: 'Total des dons',
          data: [5000, 3000], // Number of learners per course
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

