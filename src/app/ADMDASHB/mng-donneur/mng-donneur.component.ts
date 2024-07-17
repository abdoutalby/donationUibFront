import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-mng-donneur',
  templateUrl: './mng-donneur.component.html',
  styleUrls: ['./mng-donneur.component.css']
})
export class MngDonneurComponent implements OnInit {
  donneurs: any[] = [
   ];

  filteredDonneurs: any[] = []; // Initialize filteredDonneurs as an empty array

  searchQuery: string = '';

  constructor(
    private userService : UsersService,
  ) { }

  getAllDonneurs(){
    this.userService.getAllDonneurs().subscribe({
      next : (res : any )=> {
        this.donneurs = res
        this.filteredDonneurs = this.donneurs; 
      }
    })
  }
  ngOnInit(): void {
    this.getAllDonneurs()

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
