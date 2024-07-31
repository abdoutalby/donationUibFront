import { Component, OnInit } from '@angular/core';
import { DonService } from '../../services/don.service';

@Component({
  selector: 'app-mng-don',
  templateUrl: './mng-don.component.html',
  styleUrls: ['./mng-don.component.css']
})
export class MngDonComponent implements OnInit {
  donations: any[] = [ ];

  filteredDonations: any[] = []; // Initialize filteredDonations as an empty array

  searchQuery: string = '';

  constructor(private donsService : DonService) { }

  ngOnInit(): void {
    this.getAllDons();
   }

  getAllDons(){
    this.donsService.getAll().subscribe({
        next : (res :any )=> {
          this.donations = res
          console.log(res);
          
        }
    })
  }
  filterDonations(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredDonations = this.donations; // Show all donations if searchQuery is empty
    } else {
      this.filteredDonations = this.donations.filter(donation =>
        donation.id.toString().includes(this.searchQuery.toLowerCase()) ||
        donation.idDonneur.toString().includes(this.searchQuery.toLowerCase()) ||
        donation.idDonataire.toString().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
