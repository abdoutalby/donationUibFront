import { Component, OnInit } from '@angular/core';
import { DonService } from '../../services/don.service';
import { error } from 'highcharts';
import { CommentaireService } from '../../services/commentaire.service';
import { UsersService } from '../../services/users.service';
import { CampagneService } from '../../services/campagne.service';
import { AuthService } from '../../services/auth.service';

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

  recentDonations: any [] = [];
  campaigns: Campaign[] = [];
  recentComments: any  = [];

  totalCount: any  = 0;
  donneurCount: any = 0;
  campagneCount: any  = 0;

  totalCountTriggered: boolean = false;
  donneurCountTriggered: boolean = false;
  campagneCountTriggered: boolean = false;

  constructor(
    private userService : UsersService,
    private donService :  DonService,
    private commentsService : CommentaireService,
    private campagneService : CampagneService,
    private authService : AuthService,
  ) { }

  ngOnInit(): void {
    this.triggerCountUp();
    this.getDons()
    this.getLatestComments()
    this.getLatestDons()
    this.getDonneur()
    this.getTotalCampagne()
  }
  getLatestDons() {
    this.donService.getLastThree().subscribe({
      next : (res : any )=> {
        this.recentDonations = res ;
        console.log(res)
      }
    })  
  }

  getTotalCampagne(){
    this.campagneService.getAllByUserId(this.authService.getUserId()).subscribe({
      next : (res : any )=> {
        console.log(res)
        console.log(res.length);
        this.campagneCount = res.length
      }
    })
  }

  getLatestComments(){
    this.commentsService.getLatestComments().subscribe({
      next : (res)=> {this.recentComments = res
        console.log(this.recentComments)
      } 
    })
  }

  getDonneur(){
    this.userService.getTotalDonneur().subscribe({
      next : (res : any )=> this.donneurCount = res 
    })
  }
  getDons(){
    this.donService.getTotal().subscribe({
      next  : (res)=> this.totalCount = res ,
      error : (err)=> console.log(err)
      
      
    })
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
