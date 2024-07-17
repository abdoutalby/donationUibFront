import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';

interface Donataire {
  id?: number;
  logo: string;
  name: string;
  type: string;
  filiere: string;
  pays: string;
  carte?: string;
  rib: string;
  namebreCampagnes?: number;
  totalDons?: number;
  isActive: boolean;
}

@Component({
  selector: 'app-mng-donataire',
  templateUrl: './mng-donataire.component.html',
  styleUrls: ['./mng-donataire.component.css']
})
export class MngDonataireComponent implements OnInit{
  searchQuery: string = '';

  pendingDonataires: Donataire[] = [];

  activeDonataires: Donataire[] = [];

  get filteredActiveDonataires(): Donataire[] {
    return this.activeDonataires.filter(donataire =>
      donataire.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      donataire.rib?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  constructor(private userService : UsersService){}
  ngOnInit(): void {
      this.getAllDonataires();
  }
  getAllDonataires(){
    this.userService.getAllDonataires().subscribe({
      next : (res : any )=> {
        this.activeDonataires = res ;
        this.pendingDonataires = res ;
      }
    })
  }
  openFile(fileUrl?: string) {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Le fichier n\'existe pas.'
      });
    }
  }

  acceptDonataire(donataire: Donataire) {
    Swal.fire({
      icon: 'success',
      title: 'Donataire accepté',
      text: `${donataire.name} a été accepté avec succès!`,
    });
    // Implement accept logic
  }

  confirmRefuse(donataire: Donataire) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, refuser!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.refuseDonataire(donataire);
      }
    });
  }

  refuseDonataire(donataire: Donataire) {
    Swal.fire({
      icon: 'success',
      title: 'Donataire refusé',
      text: `${donataire.name} a été refusé avec succès!`,
    });
    // Implement refuse logic
  }

  confirmSuspend(donataire: Donataire) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous allez suspendre cet utilisateur.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, suspendre!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.suspendDonataire(donataire);
      }
    });
  }

  suspendDonataire(donataire: Donataire) {
    donataire.isActive = false;
    Swal.fire({
      icon: 'success',
      title: 'Donataire suspendu',
      text: `${donataire.name} a été suspendu avec succès!`,
    });
  }

  reactivateDonataire(donataire: Donataire) {
    donataire.isActive = true;
    Swal.fire({
      icon: 'success',
      title: 'Donataire réactivé',
      text: `${donataire.name} a été réactivé avec succès!`,
    });
  }
}
