import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mng-campagne',
  templateUrl: './mng-campagne.component.html',
  styleUrls: ['./mng-campagne.component.css']
})
export class MngCampagneComponent implements OnInit {
  campaigns: any[] = [
    { id: 1, image: 'path/to/image1.jpg', nom: 'Campagne A', date: '2024-06-25', nombreDonneurs: 10, but: 1000, collected: 800, isActive: true },
    { id: 2, image: 'path/to/image2.jpg', nom: 'Campagne B', date: '2024-06-26', nombreDonneurs: 5, but: 500, collected: 300, isActive: false },
    // Add more campaign data as needed
  ];

  filteredCampaigns: any[] = [];

  searchQuery: string = '';

  constructor() { }

  ngOnInit(): void {
    this.filteredCampaigns = this.campaigns; // Initialize filteredCampaigns with all campaigns
  }

  filterCampaigns(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredCampaigns = this.campaigns; // Show all campaigns if searchQuery is empty
    } else {
      this.filteredCampaigns = this.campaigns.filter(campaign =>
        campaign.id.toString().includes(this.searchQuery.toLowerCase()) ||
        campaign.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  confirmHide(campaign: any): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: `Voulez-vous vraiment cacher la campagne "${campaign.nom}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, cacher',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform hide action here (e.g., update campaign status)
        campaign.isActive = false; // Example: Set isActive to false
        Swal.fire(
          'Cachée!',
          `La campagne "${campaign.nom}" a été cachée.`,
          'success'
        );
      }
    });
  }

  revealCampaign(campaign: any): void {
    // Perform reveal action here (e.g., update campaign status)
    campaign.isActive = true; // Example: Set isActive to true
    console.log(`Révéler la campagne "${campaign.nom}"`);
  }
}
