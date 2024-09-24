import { Component, HostListener, OnInit } from '@angular/core';
import { CampagneService } from '../services/campagne.service';

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
  allProjects: any[] = [];

  displayedProjects: any [] = [];
  currentIndex: number = 0;
  maxDisplayedProjects: number = 5;

  constructor( private campagneService : CampagneService) {
    
  }
  ngOnInit() {
    this.updateMaxDisplayedProjects();
    this.updateDisplayedProjects();
    this.getAlmostFinished()
  }


  getAlmostFinished(){
    this.campagneService.getAlmostFinished().subscribe({
      next : (res : any )=> {
         this.allProjects  =res 
        this.displayedProjects = this.allProjects
      }
    })
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