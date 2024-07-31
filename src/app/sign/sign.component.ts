import { Component, NgZone } from '@angular/core';
import * as countryList from 'country-list';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  selectedRole: string | null = null;
  countries = countryList.getData();
  organizationNameError: string = '';
  firstNameError: string = '';
  lastNameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';
  ribError: string = '';
  descriptionError: string = '';
  phoneError: string = '';

  donataire = {
    type: '',
    organizationName: '',
    country: '',
    activityField: '',
    logo: null,
    taxId: null,
    rib: '',
    phone: '',
    description: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };

  donneur = {
    firstName: '',
    lastName: '',
    birthDate: '',
    country: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    isExistingClient: false
  };

  fakeData = [
    { nom: 'Anis', prénom: 'Ouerhani', date: '1990-01-01', country:'Tunisia', phone: '50100200', rib: '987654321' },
    { nom: 'Ayoub', prénom: 'Melki', date: '1992-02-02', country:'Bangladesh', phone: '50200300', rib: '123456789' }
  ];

  constructor(
    private authService : AuthService,
    private router : Router,
    private zone: NgZone) {}

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
                  this.donneur.phone = match.phone;
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

  validateOrganizationName(organizationName: any) {
    const organizationNameValue = organizationName.value;
    if (!organizationNameValue || !/^[a-zA-Z\s]+$/.test(organizationNameValue)) {
      this.organizationNameError = 'Nom de l\'organisation doit contenir uniquement des lettres.';
    } else {
      this.organizationNameError = '';
    }
  }

  validateFirstName(firstName: any) {
    const firstNameValue =firstName.value;
    if (!firstNameValue ||!/^[a-zA-Z\s]+$/.test(firstNameValue)) {
      this.firstNameError = 'Le nom doit contenir uniquement des lettres.';
    } else {
      this.firstNameError = '';
    }
  }

  validateLastName(lastName: any) {
    const lastNameValue = lastName.value;
    if (!lastNameValue ||!/^[a-zA-Z\s]+$/.test(lastNameValue)) {
      this.lastNameError = 'Le prénom doit contenir uniquement des lettres.';
    } else {
      this.lastNameError = '';
    }
  }

  validatePhone(phone: any) {
    const phoneValue = phone.value;
    if (!phoneValue || !/^\d+$/.test(phoneValue) || phoneValue.length < 8) {
      this.phoneError = 'Le numéro de téléphone doit contenir uniquement des chiffres et avoir une longueur supérieure à 8.';
    } else {
      this.phoneError = '';
    }
  }

  validateEmail(email: any) {
    const emailValue = email.value;
    if (!emailValue ||!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
      this.emailError = 'Adresse email invalide.';
    } else {
      this.emailError = '';
    }
  }

  validatePassword(password: any) {
    const passwordValue = password.value;
    if (!passwordValue || passwordValue.length < 8) {
      this.passwordError = 'Mot de passe doit contenir au moins 8 caractères.';
    } else {
      this.passwordError = '';
    }
  }

  validateConfirmPassword(confirmPassword: any) {
    const confirmPasswordValue = confirmPassword.value;
    if (!confirmPasswordValue || confirmPasswordValue!== this.donataire.password) {
      this.confirmPasswordError = 'Les mots de passe ne correspondent pas.';
    } else {
      this.confirmPasswordError = '';
    }
  }

  validateRib(rib: any) {
    const ribValue = rib.value;
    if (!ribValue || ribValue.length < 12) {
      this.ribError = 'Le RIB de l\'association doit avoir une longueur supérieure à 12.';
    } else {
      this.ribError = '';
    }
  }

  validateDescription(description: any) {
    const descriptionValue = description.value;
    if (!descriptionValue || descriptionValue.length < 10) {
      this.descriptionError = 'La description doit contenir au moins 10 caractères.';
    } else {
      this.descriptionError = '';
    }
  }

  onSubmit(){
  if(this.selectedRole == "donneur"){
    console.log(this.donneur);
   var body =  {
    "name" :  this.donneur.firstName,
    "email" : this.donneur.email,
    "username" : this.donneur.lastName,
    "password" : this.donneur.password,
    "userType" : "GIVER",
    "donneur"  : {
        "avatar" : "avatar",
        "isExistingClient": this.donneur.isExistingClient,
        "birthDate": this.donneur.birthDate,
        "country" : this.donneur.country  }
      }
      this.authService.register(body).subscribe({
        next : (res : any )=> {
          this.router.navigate(['/login'])
        },
        error : (err)=> {
          Swal.fire("error" , err.error.error , 'error')
        }
      })
  }
  
  if(this.selectedRole == "donataire"){

    var taker = {
      "name" : this.donataire.organizationName,
        "email" : this.donataire.email,
        "username" : this.donataire.organizationName,
        "password" : this.donataire.password,
        "userType" : "TAKER",
        "donataire"  : {
            "type" : this.donataire.type,
            "organizationName":this.donataire.organizationName,
            "activityField": this.donataire.activityField,
            "country" : this.donataire.country,
            "logo" : "this.donataire.logo",
            "taxId" : "this.donataire.taxId.name",
            "rib" : this.donataire.rib,
            "description" : this.donataire.description
        }
    }
    console.log(taker);
    
    this.authService.register(taker).subscribe({
      next : (res : any )=> {
        this.router.navigate(['/login'])
      },
      error : (err)=> {
        Swal.fire("error" , err.error.error , 'error')
      }
    })
  }
  
  
  }
}
