import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { CampagneService } from '../services/campagne.service';
import { CommentaireService } from '../services/commentaire.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: any = {};
  relatedProjects: any[] = [
    {
      title: 'Santé pour Tous',
      image: 'assets/med.jpeg',
      shortDescription: 'Fournir l\'accès aux soins de santé aux communautés défavorisées.'
    },
    {
      title: 'Éducation pour Tous',
      image: 'assets/edu.jpg',
      shortDescription: 'Soutenir les initiatives éducatives à l\'échelle mondiale.'
    },
    {
      title: 'Solutions d\'Énergie Renouvelable',
      image: 'assets/ener.jpeg',
      shortDescription: 'Promouvoir les pratiques énergétiques durables.'
    }
  ];

  comments: any[] = [];

  newComment: any = { text: '' };

  ngOnInit(): void {
    this.getCurrentProject();
    
  }

  constructor(
    private campagneService : CampagneService,
    private commentaireService : CommentaireService,
    private activeRoute : ActivatedRoute,
    private router: Router, private authService: AuthService) {}

  isConnected(): boolean {
    return this.authService.isAuthenticated();
  }


  getCurrentProject(){
  var id = this.activeRoute.snapshot.params["id"] ;
  console.log(id);
  this.campagneService.getById(id).subscribe({
    next : (res)=> {
      console.log(res)
      this.project = res ;

      this.getProjectComments();
      
    },
    error : (err)=> console.log(err)
  })
  }

  getProjectComments(){
    this.commentaireService.getAllByCampagne(this.project.id).subscribe({
      next : (res : any )=> {
        this.comments = res
      }
    })
  }

  donate() {
    if (this.isConnected()) {
      this.router.navigate(['/donate']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  addComment() {
    if (this.isConnected()) {
      
       let comment =  {
          "content" :this.newComment.text,
          "userId" : 1,
          "postId" : this.project.id
      }
      this.commentaireService.save(comment).subscribe({
        next : (res)=> this.getCurrentProject()
      })
      
      this.newComment.text = '';
    } else {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        html: 'Vous devez vous <a href="/login" style="color: #c11c1a; text-decoration: underline;">connecter</a> pour laisser un commentaire.',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true
      });
    }
  }

  goToProject(project: any) {
    this.router.navigate(['/project-details', project.id]);
  }
}
