import { Component, OnInit } from '@angular/core';
import { CampagneService } from '../services/campagne.service';

interface Project {
  title: string;
  image: string;
  progress: number;
  category: string;
  shortDescription: string;
}

@Component({
  selector: 'app-les-annonces',
  templateUrl: './les-annonces.component.html',
  styleUrls: ['./les-annonces.component.css']
})
export class LesAnnoncesComponent implements OnInit {
getProgress(p: any) {
  return  (p.montantCollecte / p.objectifCollecte) * 100
}
  projects:any [] = [];

  filteredProjects: any[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  sortAlphabet: string = '';
  sortProgress: string = '';
  searchError: string = '';

  constructor(private campagneService : CampagneService){

  }
  ngOnInit(): void {
    this.getCampagnes();
    this.filterProjects();

  }
  getCampagnes(){
    this.campagneService.getAll().subscribe({
      next : (res : any )=> {
        this.projects=res;
        console.log(res);
        
        this.filteredProjects = this.projects.filter((ann : any )=> ann.statut === 'ACTIF' );
      }

    })
  }

  filterProjects(): void {
    this.filteredProjects = this.projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            project.category.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = !this.selectedCategory || project.category === this.selectedCategory;
      const matchesProgress = !this.sortProgress ||
        (this.sortProgress === '0%' && project.progress === 0) ||
        (this.sortProgress === '>50%' && project.progress > 50) ||
        (this.sortProgress === '<50%' && project.progress < 50);

      return matchesSearch && matchesCategory && matchesProgress;
    });

    if (this.filteredProjects.length === 0 && this.searchQuery.trim() !== '') {
      this.searchError = `Aucun projet trouvé pour "${this.searchQuery}"`;
    } else {
      this.searchError = '';
    }

    if (this.sortAlphabet) {
      this.filteredProjects.sort((a, b) => {
        if (this.sortAlphabet === 'asc') {
          return a.title.localeCompare(b.title);
        } else if (this.sortAlphabet === 'desc') {
          return b.title.localeCompare(a.title);
        } else {
          return 0;
        }
      });
    }
  }

  onSearch(): void {
    this.filterProjects();
  }

  onCategoryChange(event: any): void {
    this.selectedCategory = event.target.value;
    this.filterProjects();
  }

  onSortAlphabetChange(value: string): void {
    this.sortAlphabet = value;
    this.filterProjects();
  }

  onSortProgressChange(value: string): void {
    this.sortProgress = value;
    this.filterProjects();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.sortAlphabet = '';
    this.sortProgress = '';
    this.searchError = '';
    this.filterProjects();
  }
}
