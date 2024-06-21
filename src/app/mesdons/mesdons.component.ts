import { Component, OnInit } from '@angular/core';

interface Donation {
    campaignId: number;
    campaignName: string;
    amount: number;
    date: Date;
}

@Component({
    selector: 'app-mesdons',
    templateUrl: './mesdons.component.html',
    styleUrls: ['./mesdons.component.css']
})
export class MesdonsComponent implements OnInit {
    donations: Donation[] = [];

    constructor() { }

    ngOnInit(): void {
        this.fetchDonations();
    }

    fetchDonations(): void {
        // Fetch donations data (replace this with actual service call)
        this.donations = [
            { campaignId: 1, campaignName: 'Campagne A', amount: 50, date: new Date('2023-05-15') },
            { campaignId: 2, campaignName: 'Campagne B', amount: 30, date: new Date('2023-06-10') },
            { campaignId: 3, campaignName: 'Campagne C', amount: 20, date: new Date('2023-07-22') },
            // Add more donations here
        ];
    }
}
