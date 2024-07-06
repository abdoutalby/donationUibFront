import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  campaignUpdateForm!: FormGroup;
  causes: string[] = ['Eau', 'Santé', 'Éducation', 'Énergie', 'Animaux'];
  imageSrc!: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.campaignUpdateForm = this.fb.group({
      nom: [{ value: '', disabled: true }],
      cause: [{ value: '', disabled: true }],
      objectif: [{ value: '', disabled: true }],
      description: [''],
      image: [null]
    });

    this.loadCampaignData();
  }

  loadCampaignData(): void {
    // Fake data
    const campaign = {
      nom: 'Animal Rescue',
      cause: 'Animaux',
      objectif: 5000,
      description: 'Ceci est une description de campagne.',
      imageUrl: 'assets/animal.jpg'
    };

    this.campaignUpdateForm.patchValue({
      nom: campaign.nom,
      cause: campaign.cause,
      objectif: campaign.objectif,
      description: campaign.description
    });

    this.imageSrc = campaign.imageUrl;
  }

  onFileChange(event: Event): void {
    const reader = new FileReader();
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.campaignUpdateForm.patchValue({
        image: file
      });

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  onSubmit(): void {
    if (this.campaignUpdateForm.valid) {
      const formData = new FormData();
      Object.keys(this.campaignUpdateForm.controls).forEach(key => {
        const control = this.campaignUpdateForm.get(key);
        if (control) {
          formData.append(key, control.value);
        }
      });

      console.log('Form data:', formData); // Just logging the form data for now
    }
  }
}
