import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';
import { CampagneService } from '../../services/campagne.service';
import { AuthService } from '../../services/auth.service';
import { FilesService } from '../../services/files.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  showChart  =false ;
  pendingDonataires: any[] = [];

  activeDonataires: any[] = [];
 
  constructor(
    private campagneService : CampagneService,
    private authService : AuthService,
    private fileService : FilesService,
    private sanitizer: DomSanitizer,
    private userService : UsersService){}
  ngOnInit(): void {
      this.getAllDonataires();
  }

 
  getAllDonataires(){

    this.userService.getAllDonataires().subscribe({
      next : (res : any )=> {
        console.log(res);
        
        this.activeDonataires = res.filter((don : any )=> don.status != "PENDING") ;
        this.pendingDonataires = res.filter((don : any )=> don.status == "PENDING") ;
        this.showChart = true 
      }
    })
  }
  openFile(fileUrl?: string) {
    if (fileUrl) {
    const dataUrl = 'data:image/jpeg;base64,'; 
          window.open("http://localhost:8080/api/files/load/"+fileUrl);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Le fichier n\'existe pas.'
      });
    }
  }

  acceptDonataire(donataire: any) {
    donataire.status = "ENABLED"
    this.userService.update(donataire).subscribe({
      next :(res : any )=> {
        this.getAllDonataires() 
    Swal.fire({
      icon: 'success',
      title: 'Donataire accepté',
      text: `${donataire.name} a été accepté avec succès!`,
    });
      }
    })
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

  refuseDonataire(donataire: any ) {
    
    donataire.status = "DISABLED"
    this.userService.update(donataire).subscribe({
      next :(res : any )=> {
        this.getAllDonataires() 
    Swal.fire({
      icon: 'success',
      title: 'Donataire accepté',
      text: `${donataire.name} a été accepté avec succès!`,
    });
      }
    })
    
    Swal.fire({
      icon: 'success',
      title: 'Donataire refusé',
      text: `${donataire.name} a été refusé avec succès!`,
    });
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

  suspendDonataire(donataire: any) {
    donataire.status = "DISABLED"
    this.userService.update(donataire).subscribe({
      next :(res : any )=> {
        this.getAllDonataires() 
    Swal.fire({
      icon: 'success',
      title: 'Donataire accepté',
      text: `${donataire.name} a été accepté avec succès!`,
    });
      }
    })
    
    Swal.fire({
      icon: 'success',
      title: 'Donataire refusé',
      text: `${donataire.name} a été refusé avec succès!`,
    });
    
  }

  reactivateDonataire(donataire: any) {
    donataire.status = "ENABLED"
    this.userService.update(donataire).subscribe({
      next :(res : any )=> {
        this.getAllDonataires() 
    Swal.fire({
      icon: 'success',
      title: 'Donataire accepté',
      text: `${donataire.name} a été accepté avec succès!`,
    });
      }
    })
    
    Swal.fire({
      icon: 'success',
      title: 'Donataire refusé',
      text: `${donataire.name} a été refusé avec succès!`,
    });
  }
   
}
