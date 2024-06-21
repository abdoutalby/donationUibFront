import { Component, NgZone } from '@angular/core';
import * as countryList from 'country-list';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  selectedRole: string | null = null;
  countries = countryList.getData();

  donataire = {
    type: '',
    organizationName: '',
    country: '',
    activityField: '',
    logo: null,
    taxId: null,
    rib: '',
    description: ''
  };

  donneur = {
    firstName: '',
    lastName: '',
    birthDate: '',
    country: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    isExistingClient: false
  };

  fakeData = [
    { nom: 'Anis', prénom: 'Ouerhani', date: '1990-01-01', country:'Tunisia', rib: '987654321' },
    { nom: 'Ayoub', prénom: 'Melki', date: '1992-02-02', country:'Bangladesh', rib: '123456789' }
  ];

  constructor(private zone: NgZone) {}

  selectRole(role: string) {
    if (role === 'donneur') {
      Swal.fire({
        title: 'Vous êtes déjà un client?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Oui',
        denyButtonText: 'Non',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Entrer votre RIB s\'il vous plaît',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Soumettre',
            showLoaderOnConfirm: true,
            preConfirm: (rib) => {
              const match = this.fakeData.find(d => d.rib === rib);
              if (match) {
                this.zone.run(() => {
                  this.donneur.firstName = match.nom;
                  this.donneur.lastName = match.prénom;
                  this.donneur.birthDate = match.date;
                  this.donneur.country = match.country;
                  this.donneur.isExistingClient = true;
                  this.selectedRole = role;
                  console.log("DATA : ",this.donneur.firstName, this.donneur.lastName, this.donneur.birthDate, this.donneur.country)
                });
                Swal.fire({
                  icon: 'success',
                  title: `Bienvenue ${match.prénom} ${match.nom}`,
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 5000,
                  timerProgressBar: true
                });
              } else {
                return Swal.showValidationMessage('RIB non trouvé');
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isDismissed || result.isDenied) {
              Swal.fire({
                title: 'Voulez-vous réessayer ou annuler?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Réessayer',
                denyButtonText: 'Annuler',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.selectRole(role);
                } else {
                  this.zone.run(() => {
                    this.selectedRole = role;
                  });
                }
              });
            }
          });
        } else if (result.isDenied) {
          this.zone.run(() => {
            this.selectedRole = role;
          });
        }
      });
    } else {
      this.selectedRole = role;
    }
  }

  clearSelection() {
    this.selectedRole = null;
    this.donneur.isExistingClient = false;
  }

  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    if (field === 'logo') {
      this.donataire.logo = file;
    } else if (field === 'taxId') {
      this.donataire.taxId = file;
    }
  }

  createAccount() {
    if (this.selectedRole === 'donataire') {
      console.log('Donataire data:', this.donataire);
    } else if (this.selectedRole === 'donneur') {
      console.log('Donneur data:', this.donneur);
    }
    // API calls
  }

  onSubmit(){
    //
  }
}
