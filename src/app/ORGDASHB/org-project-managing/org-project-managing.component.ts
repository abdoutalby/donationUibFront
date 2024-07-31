import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CampagneService } from '../../services/campagne.service';
import { AuthService } from '../../services/auth.service';

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
  filteredCampaigns: any [] = [];

  constructor( 
    private campagneService : CampagneService,
    private authService : AuthService,
    private router: Router ) {
  }

  ngOnInit(): void {

    this.getUserCampagnes();

    this.filteredCampaigns = this.campaigns;
  }
  getUserCampagnes(){
    this.campagneService.getAllByUserId(this.authService.getUserId()).subscribe({
      next : (res : any )=> {
        this.campaigns = res;
        console.log(res);
        this.filteredCampaigns = this.campaigns;
      },
      error : (err : any )=> console.error(err)
    })
  }

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
    this.router.navigate(['/update', campaignName])
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
