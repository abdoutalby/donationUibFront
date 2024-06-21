import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as countryList from 'country-list';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  isEditMode = false;
  userData: any;
  countries = countryList.getData();
  userRole!: string;

  donneurData = {
    nom: 'John',
    prenom: 'Doe',
    clientChezUib: 'Oui',
    dateDeNaissance: '1990-01-01',
    pays: 'Tunisia',
    telephone: '123456789',
    email: 'john.doe@example.com'
  };

  donataireData = {
    type: 'Association',
    nom: 'Jane',
    filiereActivite: 'Santé',
    description: 'Description A',
    telephone: '987654321',
    pays: 'Tunisia',
    email: 'jane.smith@example.com'
  };

  constructor(private router: Router, private authService: AuthService) {
    this.updateUserData();
  }

  getUserRole(): string {
    return this.authService.getUserRole();
  }
  

  updateUserData() {
    this.userRole = this.getUserRole();
    switch (this.userRole) {
      case 'donneur':
        this.userData = {...this.donneurData };
        break;
      case 'donataire':
        this.userData = {...this.donataireData };
        break;
      default:
        this.userData = {};
        break;
    }
  }

  editMode() {
    this.isEditMode = true;
  }

  editPhoto() {
    // Add logic to edit photo here
    const fileInput = document.getElementById('photoInput');
    if (fileInput) {
      fileInput.click(); // Trigger click event on file input
    }
  }

  onPhotoSelected(event: any) {
    // Add logic to handle selected photo
    const file = event.target.files[0];
    if (file) {
      // Assuming you want to display the selected photo
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userData.photoUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges() {
    this.isEditMode = false;
    // Add logic to save changes here
  }

  cancelEdit() {
    this.isEditMode = false;
    // Reset fields to their original values
    this.updateUserData(); // Reset user data
  }
}