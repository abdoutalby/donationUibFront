import { Component, OnInit } from '@angular/core';

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
  projects: Project[] = [
    { title: 'Initiative Eau Propre', image: 'assets/water.jpg', progress: 75, category: 'Eau', shortDescription: "Fournir de l'eau propre." },
    { title: 'Santé pour Tous', image: 'assets/med.jpeg', progress: 50, category: 'Santé', shortDescription: 'Accès aux soins de santé.' },
    { title: 'Éducation pour Tous', image: 'assets/edu.jpg', progress: 85, category: 'Éducation', shortDescription: "Soutenir l'éducation globale." },
    { title: 'Énergie Renouvelable', image: 'assets/ener.jpeg', progress: 40, category: 'Énergie', shortDescription: 'Solutions énergétiques.' },
    { title: 'Conservation de la Faune', image: 'assets/tree.jpeg', progress: 30, category: 'Environnement', shortDescription: 'Conservation de la faune.' },
    { title: 'Reboisement Urbain', image: 'assets/tree.jpeg', progress: 60, category: 'Environnement', shortDescription: 'Reboisement des villes.' },
    { title: 'Accès Médical', image: 'assets/med.jpeg', progress: 90, category: 'Santé', shortDescription: 'Accès médical aux zones reculées.' },
    { title: 'Tech pour Écoles', image: 'assets/kids.jpg', progress: 45, category: 'Éducation', shortDescription: 'Technologie dans les écoles.' },
    { title: 'Énergies Vertes', image: 'assets/ener.jpeg', progress: 70, category: 'Énergie', shortDescription: 'Initiatives vertes.' },
    { title: 'Sauvegarde des Océans', image: 'assets/ocean.jpg', progress: 55, category: 'Environnement', shortDescription: 'Conservation des océans.' },
    { title: 'Formation Professionnelle', image: 'assets/training.jpg', progress: 35, category: 'Éducation', shortDescription: 'Formation professionnelle.' },
    { title: 'Santé Mentale', image: 'assets/med.jpeg', progress: 25, category: 'Santé', shortDescription: 'Sensibilisation à la santé mentale.' }
  ];

  filteredProjects: Project[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  sortAlphabet: string = '';
  sortProgress: string = '';
  searchError: string = '';

  ngOnInit(): void {
    this.filterProjects();
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
