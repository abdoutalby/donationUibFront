import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CampagneService } from '../services/campagne.service';
import { FilesService } from '../services/files.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {
  campaignCreationForm: FormGroup;
  formSubmitted = false;
  causes: string[] = ['Santé', 'Sport', 'Éducation'];

  constructor(private formBuilder: FormBuilder , 
    private campagneService : CampagneService,
    private fileService : FilesService,
    private authService : AuthService,
    private router : Router,
  ) {
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
      var body = new FormData() ;
      body.append('file' , this.campaignCreationForm.get("image")!.value); 
     
      this.fileService.upload(body).subscribe({
        next : (res : any )=> {


      const campagne =  {
        "nom" : this.campaignCreationForm.get("nom")?.value,
        "image" :res.filename,
         "objectifCollecte" : this.campaignCreationForm.get("objectif")?.value,
         "cause" : this.campaignCreationForm.get("cause")?.value,
        "description" : this.campaignCreationForm.get("description")?.value,
        "campagneDate" : new Date() , 
        "userId" : this.authService.getUserId()
      }
      this.campagneService.save(campagne).subscribe({
        next : (res)=> {
      Swal.fire({
        title: 'Campagne créée avec succès!',
        text: 'Votre campagne a été créée avec succès.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.router.navigate(['/orgmanage'])
        },
        error : (err : any )=> {
          console.log(err);
          
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'something went wrong please try again.'+err.error.error,
        confirmButtonText: 'OK'
      });
        }
      })

        },
        error: (err : any )=> {
          Swal.fire({
            icon: 'error',
            title: 'error uploading image',
            text: 'something went wrong please try again.'+err.error.error,
            confirmButtonText: 'OK'
          });
              
        }
      })
       


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
