import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: any = {
    title: 'Initiative Eau Propre',
    image: 'assets/water.jpg',
    publisher: 'Fondation Eau pour Tous',
    donationPercentage: 75,
    description: 'L\'Initiative Eau Propre vise à fournir de l\'eau potable propre et sûre aux communautés dans le besoin. Nous utilisons des systèmes de filtration avancés et l\'engagement communautaire pour assurer des solutions durables en matière d\'eau.',
    publisherName: 'Fondation Eau pour Tous',
    publisherBio: 'La Fondation Eau pour Tous est une organisation à but non lucratif dédiée à l\'amélioration de l\'accès à l\'eau potable dans le monde entier.',
    publisherAvatar: 'assets/water.jpg'
  };

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

  comments: any[] = [
    { author: 'Alice', text: 'Super projet, bonne chance!', date: '2023-06-15' },
    { author: 'Bob', text: 'Je soutiens pleinement cette initiative.', date: '2023-06-16' }
  ];

  newComment: any = { text: '' };

  ngOnInit(): void {}

  constructor(private router: Router, private authService: AuthService) {}

  isConnected(): boolean {
    return this.authService.isAuthenticated();
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
      this.comments.push({
        author: 'Utilisateur',
        text: this.newComment.text,
        date: new Date().toISOString().split('T')[0]
      });
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
