import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { CampaignDetails, CampaignGQL } from '@chutney/data-access';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'chutney-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent implements OnInit {

  campaignId: string;
  campaign: CampaignDetails;

  constructor(private campaignGQL: CampaignGQL,
              private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.campaignId = this.route.snapshot.paramMap.get('id');
    if (this.campaignId) {
      this.campaignGQL.watch({campaignId: this.campaignId}).valueChanges.pipe(pluck('data', 'campaign'))
        .subscribe((result) => {
          this.campaign = result
        });
    }
  }

}
