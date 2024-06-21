import { Component, HostListener, OnInit } from '@angular/core';

interface Project {
  image: string;
  title: string;
  publisher: string;
  goal: number;
  raised: number;
}

@Component({
  selector: 'app-presque-fini',
  templateUrl: './presque-fini.component.html',
  styleUrls: ['./presque-fini.component.css']
})
export class PresqueFiniComponent implements OnInit {
  allProjects: Project[] = [
    // Example projects
    { image: 'assets/project.jpg', title: 'Initiative pour l\'eau potable', publisher: 'EauAid', goal: 20000, raised: 19000, },
    { image: 'assets/project.jpg', title: 'Fournitures éducatives', publisher: 'Sauver les Enfants', goal: 10000, raised: 9100, },
    { image: 'assets/project.jpg', title: 'Projet de reforestation', publisher: 'Terre Verte', goal: 17000, raised: 16900, },
    { image: 'assets/project.jpg', title: 'Aide médicale pour les réfugiés', publisher: 'Médecins', goal: 25000, raised: 24000, },
    { image: 'assets/project.jpg', title: 'Distribution alimentaire', publisher: 'Nourrir Palestine', goal: 45000, raised: 41000, },
    { image: 'assets/project.jpg', title: 'Sauvetage des animaux', publisher: 'Protection des Animaux', goal: 10000, raised: 9300, },
  
    // Add more projects as needed
  ];

  displayedProjects: Project[] = [];
  currentIndex: number = 0;
  maxDisplayedProjects: number = 5;

  ngOnInit() {
    this.updateMaxDisplayedProjects();
    this.updateDisplayedProjects();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateMaxDisplayedProjects();
    this.updateDisplayedProjects();
  }

  updateMaxDisplayedProjects() {
    const width = window.innerWidth;

    if (width < 768) {
      this.maxDisplayedProjects = 1;
    } else if (width < 992) {
      this.maxDisplayedProjects = 3;
    } else if (width < 1200) {
      this.maxDisplayedProjects = 4;
    } else {
      this.maxDisplayedProjects = 5;
    }
  }

  prevProject() {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.maxDisplayedProjects;
      if (this.currentIndex < 0) {
        this.currentIndex = 0;
      }
      this.updateDisplayedProjects();
    }
  }

  nextProject() {
    if (this.currentIndex + this.maxDisplayedProjects < this.allProjects.length) {
      this.currentIndex += this.maxDisplayedProjects;
      if (this.currentIndex + this.maxDisplayedProjects > this.allProjects.length) {
        this.currentIndex = this.allProjects.length - this.maxDisplayedProjects;
      }
      this.updateDisplayedProjects();
    }
  }

  updateDisplayedProjects() {
    this.displayedProjects = this.allProjects.slice(this.currentIndex, this.currentIndex + this.maxDisplayedProjects);
  }
}