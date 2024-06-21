import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  reviews = [
    { name: 'Médecins Sans Frontières', photo: 'assets/med.jpeg', feedback: "Grâce à DonBYUIB, nous avons pu atteindre nos objectifs de financement plus rapidement que jamais." },
    { name: 'Protection Mondiale des Animaux' , photo: 'assets/animal.jpg', feedback: "La plateforme est incroyablement facile à utiliser et nous permet de suivre l'impact de nos dons en temps réel." },
    // Add more reviews as needed
  ];
  currentReviewIndex = 0;

  nextReview() {
    this.currentReviewIndex = (this.currentReviewIndex + 1) % this.reviews.length;
  }

  prevReview() {
    this.currentReviewIndex = (this.currentReviewIndex - 1 + this.reviews.length) % this.reviews.length;
  }

  getCurrentReview() {
    return this.reviews[this.currentReviewIndex];
  }
}
