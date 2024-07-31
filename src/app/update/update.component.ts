import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CampagneService } from '../services/campagne.service';
import { FilesService } from '../services/files.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  campaignUpdateForm!: FormGroup;
  causes: string[] = ['Eau', 'Santé', 'Éducation', 'Énergie', 'Animaux'];
  imageSrc!: string;
  imgChanged = false ;
   campaign : any  = {
  };

  constructor(
    private activeRoute :  ActivatedRoute,
    private campagneService : CampagneService,
    private fileService : FilesService,
    private router : Router,
    private fb: FormBuilder) { }

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
  let id = this.activeRoute.snapshot.params['id']
  this.campagneService.getById(id).subscribe({
      next : (res)=> {
        console.log(res)
        this.campaign = res;
        this.campaignUpdateForm.patchValue({
          nom: this.campaign.nom,
           objectif: this.campaign.objectifCollecte,
          description: this.campaign.description
        });
      }
  })

  }

  onFileChange(event: Event): void {
    this.imgChanged  = true ;
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
        console.log(this.campaignUpdateForm.get("image")!.value);
        var body = new FormData() ;
        body.append('file' , this.campaignUpdateForm.get("image")!.value); 
        this.fileService.upload(body).subscribe(
          {
            next : (res : any )=> {
              console.log(res)
              this.campaign.image = res.filename ;
              this.campaign.description = this.campaignUpdateForm.get("description")!.value
              console.log(this.campaign)
              this.campagneService.update(this.campaign).subscribe({
                next : (res : any )=> {
                  console.log("campagne updated succ");
                  this.router.navigate(["/orgmanage"])
                },
                error : (err : any )=>{
                  console.log(err)
                } 
              })
            },
            error : (err)=> {
              console.error(err)
            }
          }
        )

          }
  }
}
