import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  nouvellesCampagnes = [
    { organisation: 'Organisation A', nom: 'Campagne 1' },
    { organisation: 'Organisation B', nom: 'Campagne 2' },
    { organisation: 'Organisation C', nom: 'Campagne 3' }
  ];

  organisationsReussies = [
    { nom: 'Organisation X', objectif: 1000 },
    { nom: 'Organisation Y', objectif: 500 },
    { nom: 'Organisation Z', objectif: 2000 }
  ];

  derniersDonateurs = [
    { nom: 'Jean Dupont', montant: 50 },
    { nom: 'Marie Martin', montant: 100 },
    { nom: 'Pierre Durand', montant: 200 }
  ];
}