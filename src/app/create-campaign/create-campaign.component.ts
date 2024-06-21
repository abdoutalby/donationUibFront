import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {
  campaignCreationForm: FormGroup;
  formSubmitted = false;
  causes: string[] = ['Santé', 'Sport', 'Éducation'];

  constructor(private formBuilder: FormBuilder) {
    this.campaignCreationForm = this.formBuilder.group({
      nom: ['', Validators.required],
      image: [null, Validators.required],
      cause: ['', Validators.required],
      objectif: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.campaignCreationForm.patchValue({ image: file });
    }
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.campaignCreationForm.valid) {
      const formData = new FormData();
      formData.append('nom', this.campaignCreationForm.get('nom')?.value);
      formData.append('image', this.campaignCreationForm.get('image')?.value);
      formData.append('cause', this.campaignCreationForm.get('cause')?.value);
      formData.append('objectif', this.campaignCreationForm.get('objectif')?.value);
      formData.append('description', this.campaignCreationForm.get('description')?.value);

      // Mocking an HTTP request
      console.log('Campaign Data:', formData);

      Swal.fire({
        title: 'Campagne créée avec succès!',
        text: 'Votre campagne a été créée avec succès.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Informations manquantes',
        text: 'Veuillez remplir toutes les informations requises.',
        confirmButtonText: 'OK'
      });
    }
  }
}
