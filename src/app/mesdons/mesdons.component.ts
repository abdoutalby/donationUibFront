import { Component, OnInit } from '@angular/core';
import { DonService } from '../services/don.service';

interface Donation {
    id: number;
    campaignName: string;
    montant: number;
    donDate: Date;
}

@Component({
    selector: 'app-mesdons',
    templateUrl: './mesdons.component.html',
    styleUrls: ['./mesdons.component.css']
})
export class MesdonsComponent implements OnInit {
    donations: Donation[] = [];

    constructor(private donService : DonService) { }

    ngOnInit(): void {
        this.fetchDonations();
    }

    fetchDonations(): void {
        this.donService.getAllByUser(1).subscribe({
            next : (res : any )=> {
                this.donations = res ;
            }
        })
    }
}
