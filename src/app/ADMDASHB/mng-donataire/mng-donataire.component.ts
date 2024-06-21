import { Component } from '@angular/core';
import Swal from 'sweetalert2';

interface Donataire {
  id?: number;
  logo: string;
  nom: string;
  type: string;
  filiere: string;
  pays: string;
  carte?: string;
  rib: string;
  nombreCampagnes?: number;
  totalDons?: number;
  isActive: boolean;
}

@Component({
  selector: 'app-mng-donataire',
  templateUrl: './mng-donataire.component.html',
  styleUrls: ['./mng-donataire.component.css']
})
export class MngDonataireComponent {
  searchQuery: string = '';

  pendingDonataires: Donataire[] = [
    {
      logo: 'https://via.placeholder.com/50',
      nom: 'Association A',
      type: 'ONG',
      filiere: 'Éducation',
      pays: 'France',
      carte: 'https://example.com/carte1.pdf',
      rib: 'FR7630004000031234567890143',
      isActive: false
    },
    {
      logo: 'https://via.placeholder.com/50',
      nom: 'Fondation B',
      type: 'Fondation',
      filiere: 'Santé',
      pays: 'Belgique',
      carte: 'https://example.com/carte2.pdf',
      rib: 'BE68539007547034',
      isActive: false
    }
  ];

  activeDonataires: Donataire[] = [
    {
      id: 1,
      logo: 'https://via.placeholder.com/50',
      nom: 'Organisation C',
      type: 'ONG',
      filiere: 'Environnement',
      pays: 'Suisse',
      nombreCampagnes: 10,
      totalDons: 5000,
      isActive: true,
      rib: 'CH9300762011623852957'
    },
    {
      id: 2,
      logo: 'https://via.placeholder.com/50',
      nom: 'Charité D',
      type: 'Charité',
      filiere: 'Aide humanitaire',
      pays: 'Canada',
      nombreCampagnes: 5,
      totalDons: 3000,
      isActive: false,
      rib: 'CA7452900021234567890'
    }
  ];

  get filteredActiveDonataires(): Donataire[] {
    return this.activeDonataires.filter(donataire =>
      donataire.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      donataire.rib?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
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
      text: `${donataire.nom} a été accepté avec succès!`,
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
      text: `${donataire.nom} a été refusé avec succès!`,
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
      text: `${donataire.nom} a été suspendu avec succès!`,
    });
  }

  reactivateDonataire(donataire: Donataire) {
    donataire.isActive = true;
    Swal.fire({
      icon: 'success',
      title: 'Donataire réactivé',
      text: `${donataire.nom} a été réactivé avec succès!`,
    });
  }
}
