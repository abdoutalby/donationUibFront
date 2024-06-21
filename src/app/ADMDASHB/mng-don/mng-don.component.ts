import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mng-don',
  templateUrl: './mng-don.component.html',
  styleUrls: ['./mng-don.component.css']
})
export class MngDonComponent implements OnInit {
  donations: any[] = [
    { id: 1, idDonneur: 1, idDonataire: 1, date: '2024-06-25', nomCampagne: 'Campagne A', montant: 500 },
    { id: 2, idDonneur: 2, idDonataire: 1, date: '2024-06-26', nomCampagne: 'Campagne B', montant: 700 },
    // Add more donation data as needed
  ];

  filteredDonations: any[] = []; // Initialize filteredDonations as an empty array

  searchQuery: string = '';

  constructor() { }

  ngOnInit(): void {
    this.filteredDonations = this.donations; // Initialize filteredDonations with all donations
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
