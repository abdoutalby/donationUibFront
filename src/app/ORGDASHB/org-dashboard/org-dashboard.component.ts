import { Component, OnInit } from '@angular/core';

interface Stat {
  label: string;
  value: number;
}

interface Donation {
  donor: string;
  amount: number;
  date: Date;
  campaignName: string;
}

interface Campaign {
  name: string;
  description: string;
  goal: number;
  raised: number;
  image: string; // Added image attribute
}

interface Comment {
  userName: string;
  commentText: string;
  campaignName: string;
}

@Component({
  selector: 'app-org-dashboard',
  templateUrl: './org-dashboard.component.html',
  styleUrls: ['./org-dashboard.component.css']
})
export class OrgDashboardComponent implements OnInit {

  recentDonations: Donation[] = [];
  campaigns: Campaign[] = [];
  recentComments: Comment[] = [];

  totalCount: number = 0;
  donneurCount: number = 0;
  campagneCount: number = 0;

  totalCountTriggered: boolean = false;
  donneurCountTriggered: boolean = false;
  campagneCountTriggered: boolean = false;

  constructor() {

    this.recentDonations = [
      { donor: 'Anis Ouerhani', amount: 500, date: new Date(), campaignName: 'Campagne 1' },
      { donor: 'Houssem Kouki', amount: 250, date: new Date(), campaignName: 'Campagne 2' },
      { donor: 'Hayder Thamlaoui', amount: 100, date: new Date(), campaignName: 'Campagne 3' }
    ];
    this.campaigns = [
      { name: 'Campagne 1', description: 'Description de la campagne', goal: 10000, raised: 5000, image: 'assets/edu.jpg' },
      { name: 'Campagne 2', description: 'Description de la campagne', goal: 20000, raised: 15000, image: 'assets/kids.jpg' },
      { name: 'Campagne 3', description: 'Description de la campagne', goal: 10000, raised: 5000, image: 'assets/med.jpeg' },
      { name: 'Campagne 4', description: 'Description de la campagne', goal: 17000, raised: 5000, image: 'assets/ener.jpeg' },
      { name: 'Campagne 5', description: 'Description de la campagne', goal: 35000, raised: 0, image: 'assets/project.jpg' }
    ];
    this.recentComments = [
      { userName: 'Anis', commentText: 'Super initiative!', campaignName: 'Campagne 1' },
      { userName: 'Ayoub', commentText: 'Félicitations à toute l\'équipe!', campaignName: 'Campagne 3' },
      { userName: 'Houssem', commentText: 'Continuez comme ça!', campaignName: 'Campagne 2' },
      { userName: 'Hayder', commentText: 'Je suis fier de contribuer.', campaignName: 'Campagne 4' }
    ];

  }

  ngOnInit(): void {
    this.triggerCountUp();
  }

  triggerCountUp() {
    if (!this.totalCountTriggered) {
      this.totalCountTriggered = true;
      // Implement logic to set totalCount and trigger count up animation
      this.totalCount = 20000; // Example value, replace with your actual logic
    }
    if (!this.donneurCountTriggered) {
      this.donneurCountTriggered = true;
      // Implement logic to set donneurCount and trigger count up animation
      this.donneurCount = 1500; // Example value, replace with your actual logic
    }
    if (!this.campagneCountTriggered) {
      this.campagneCountTriggered = true;
      // Implement logic to set campagneCount and trigger count up animation
      this.campagneCount = 3; // Example value, replace with your actual logic
    }
  }
}
