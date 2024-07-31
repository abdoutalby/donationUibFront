import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CampagneService } from '../../services/campagne.service';
import { error } from 'highcharts';

@Component({
  selector: 'app-mng-campagne',
  templateUrl: './mng-campagne.component.html',
  styleUrls: ['./mng-campagne.component.css']
})
export class MngCampagneComponent implements OnInit {
  pendingCampaigns: any[] = [
   ];
   showGraph = false ;
   filesUrl = "http://localhost:8080/api/files/load/"
  apiCamps = []
  filteredCampaigns: any[] = [];
  searchQuery: string = '';

  constructor(
    private campagneService : CampagneService
  ) { }

  getFile(image : any ){
    return this.filesUrl+image ; 
  }
  ngOnInit(): void {
     this.getAllCampagnes();
  }

  getAllCampagnes(){
    this.campagneService.getAll().subscribe({
      next: (res : any )=> {
        console.log(res);
        this.filteredCampaigns = res.filter((camp : any )=> camp.statut != "PENDING") ;
        this.pendingCampaigns = res.filter((item: any)=>item.statut === "PENDING" );  
        console.log(this.filteredCampaigns);
        console.log(this.pendingCampaigns);
        this.showGraph = true ;
      }
    })
  }

  filterCampaigns(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredCampaigns = this.apiCamps; // Show all campaigns if searchQuery is empty
    } else {
      this.filteredCampaigns = this.apiCamps.filter((campaign : any)  =>
        campaign.id.toString().includes(this.searchQuery.toLowerCase()) ||
        campaign.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
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
        this.changeCampaginStatus(campaign , "REFUSED");
      }
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
        this.changeCampaginStatus(campaign , "HIDDEN");
      }
    });
  }


  changeCampaginStatus(campaign: any , st : any ): void {
    campaign.statut = st;
    console.log(campaign);
    this.campagneService.update(campaign).subscribe({
      next : (res : any )=> {
        console.log(res);
        
    Swal.fire(
      'Success!',
      `La campagne "${campaign.nom}" a été modifier.`,
      'success'
    );
    this.getAllCampagnes()
      },
      error : (err : any )=> {
        console.log(err);
        
    Swal.fire(
      'Error!',
      `something went wrong "${err.error}".`,
      'error'
    );
      }
    })
  }
}
