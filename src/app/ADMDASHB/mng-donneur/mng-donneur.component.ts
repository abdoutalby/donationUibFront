import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mng-donneur',
  templateUrl: './mng-donneur.component.html',
  styleUrls: ['./mng-donneur.component.css']
})
export class MngDonneurComponent implements OnInit {
  donneurs: any[] = [
    { id: 1, nom: 'John', prenom: 'Doe', email: 'john.doe@example.com', isActive: true, totalDons: 1000 },
    { id: 2, nom: 'Jane', prenom: 'Smith', email: 'jane.smith@example.com', isActive: false, totalDons: 500 },
    // Add more donor data as needed
  ];

  filteredDonneurs: any[] = []; // Initialize filteredDonneurs as an empty array

  searchQuery: string = '';

  constructor() { }

  ngOnInit(): void {
    this.filteredDonneurs = this.donneurs; // Initialize filteredDonneurs with all donneurs
  }

  filterDonneurs(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredDonneurs = this.donneurs; // Show all donneurs if searchQuery is empty
    } else {
      this.filteredDonneurs = this.donneurs.filter(donneur =>
        donneur.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        donneur.id.toString().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  confirmSuspend(donneur: any): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: `Voulez-vous vraiment suspendre ${donneur.nom} ${donneur.prenom}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, suspendre',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform suspend action here (e.g., update donneur status)
        donneur.isActive = false; // Example: Set isActive to false
        Swal.fire(
          'Suspendu!',
          `Le donneur ${donneur.nom} ${donneur.prenom} a été suspendu.`,
          'success'
        );
      }
    });
  }

  reactivateDonneur(donneur: any): void {
    // Logic to reactivate the donneur
    console.log(`Réactiver ${donneur.nom}`);
    // Additional logic (e.g., show confirmation dialog)
  }
}
