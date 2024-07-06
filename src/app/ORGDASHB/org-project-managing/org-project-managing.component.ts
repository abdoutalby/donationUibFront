import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Campaign {
  name: string;
  image: string;
  publishedDate: string;
  donorsNb: number;
  goal: number;
  raised: number;
  comments: number;
  status: number;
}

@Component({
  selector: 'app-org-project-managing',
  templateUrl: './org-project-managing.component.html',
  styleUrls: ['./org-project-managing.component.css']
})
export class OrgProjectManagingComponent implements OnInit {
  searchQuery: string = '';
  searchMessage: string = '';
  campaigns: Campaign[] = [];
  filteredCampaigns: Campaign[] = [];

  constructor( private router: Router ) {
    this.campaigns = [
      {
        name: 'Campagne 1',
        image: 'assets/edu.jpg',
        publishedDate: '2023-01-01',
        donorsNb: 50,
        goal: 10000,
        raised: 5000,
        comments: 10,
        status: 1
      },
      {
        name: 'Campagne 2',
        image: 'assets/kids.jpg',
        publishedDate: '2023-02-01',
        donorsNb: 75,
        goal: 20000,
        raised: 15000,
        comments: 5,
        status: 0
      }
      // Add more campaigns as needed
    ];

    this.filteredCampaigns = this.campaigns;
  }

  ngOnInit(): void {}

  filterData() {
    if (this.searchQuery.trim() === '') {
      this.filteredCampaigns = this.campaigns;
      this.searchMessage = '';
    } else {
      this.filteredCampaigns = this.campaigns.filter(campaign =>
        campaign.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.searchMessage = this.filteredCampaigns.length
        ? ''
        : 'Aucune campagne trouvée.';
    }
  }

  navigateToUpdateCampaign(campaignName: string) {
    this.router.navigate(['/update'])
  }

  deleteCampaign(campaignName: string) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer cette campagne ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Supprimé !',
          'La campagne a été supprimée avec succès.',
          'success'
        );
        
        // Implémenter la logique de suppression ici
        this.campaigns = this.campaigns.filter(campaign => campaign.name !== campaignName);
        this.filterData(); // Réappliquer le filtre après la suppression
      }
    });
  }
  
  addCampaign(){
    this.router.navigate(['/create'])
  }
}
