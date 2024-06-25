import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mng-campagne',
  templateUrl: './mng-campagne.component.html',
  styleUrls: ['./mng-campagne.component.css']
})
export class MngCampagneComponent implements OnInit {
  pendingCampaigns: any[] = [
    { image: 'path/to/image1.jpg', nom: 'Campagne en Attente A', organisme: 'Organisme A', cause: 'Cause A', objectif: 1000 },
    { image: 'path/to/image2.jpg', nom: 'Campagne en Attente B', organisme: 'Organisme B', cause: 'Cause B', objectif: 2000 },
    // Add more pending campaign data as needed
  ];

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

  acceptCampaign(campaign: any): void {
    Swal.fire({
      icon: 'success',
      title: 'Campagne acceptée',
      text: `${campaign.nom} a été acceptée avec succès!`,
    }).then(() => {
      this.pendingCampaigns = this.pendingCampaigns.filter(c => c !== campaign);
      campaign.id = this.campaigns.length + 1;
      campaign.date = new Date().toISOString().split('T')[0];
      campaign.nombreDonneurs = 0;
      campaign.collected = 0;
      campaign.isActive = true;
      this.campaigns.push(campaign);
      this.filterCampaigns();
    });
  }

  confirmRefuseCampaign(campaign: any): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, refuser!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.refuseCampaign(campaign);
      }
    });
  }

  refuseCampaign(campaign: any): void {
    Swal.fire({
      icon: 'success',
      title: 'Campagne refusée',
      text: `${campaign.nom} a été refusée avec succès!`,
    }).then(() => {
      this.pendingCampaigns = this.pendingCampaigns.filter(c => c !== campaign);
    });
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
        this.hideCampaign(campaign);
      }
    });
  }

  hideCampaign(campaign: any): void {
    campaign.isActive = false;
    Swal.fire(
      'Cachée!',
      `La campagne "${campaign.nom}" a été cachée.`,
      'success'
    );
  }

  revealCampaign(campaign: any): void {
    campaign.isActive = true;
    Swal.fire(
      'Révélée!',
      `La campagne "${campaign.nom}" a été révélée.`,
      'success'
    );
  }
}
