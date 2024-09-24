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
  relatedProjects: any[] = [];
  id : any ;

  comments: any[] = [];

  newComment: any = { text: '' };
  showPayment: boolean =false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.getCurrentProject(id)
    });
  }

  constructor(
    private campagneService : CampagneService,
    private commentaireService : CommentaireService,
    private route : ActivatedRoute,
    private router: Router, private authService: AuthService) {}

  isConnected(): boolean {
    return this.authService.isAuthenticated();
  }

  getRelatedProjects(){
    this.campagneService.getRelatedProject(this.project.cause).subscribe({
      next : (res : any )=> {
        this.relatedProjects = res.filter((p : any ) => 
          p.id != this.project.id
        ) ;
        console.log(res);
        
      }
    })
  }
  getCurrentProject(id : any ){
   this.campagneService.getById(id).subscribe({
    next : (res)=> {
      console.log(res)
      this.project = res ;
      this.getProjectComments();
      this.getRelatedProjects();
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
      this.showPayment = true 
         window.open('https://buy.stripe.com/test_14kaFZfRM02y120dQQ', '_blank');

    } else {
      this.router.navigate(['/login']);
    }  
    
  }

  addComment() {
    if (this.isConnected()) {
      
       let comment =  {
          "content" :this.newComment.text,
          "userId" : this.authService.getUserId(),
          "postId" : this.project.id
      }
      this.commentaireService.save(comment).subscribe({
        next : (res)=> this.getCurrentProject(this.project.id)
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
  this.router.navigate(['details' , project.id])
  
  }
}
