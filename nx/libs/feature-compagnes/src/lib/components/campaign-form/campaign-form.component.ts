import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignDetails } from '@chutney/data-access';

@Component({
  selector: 'chutney-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss']
})
export class CampaignFormComponent implements OnInit {

  @Input('campaign') campaign: CampaignDetails;
  campaignForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    console.log('aaaa')
    this.buildForm();
  }

  buildForm() {
    this.campaignForm = this.fb.group({
      title: [this.campaign? this.campaign.title: '', Validators.required],
      description: [this.campaign? this.campaign.description: ''],
      jiraId: [this.campaign? this.campaign.id: ''],
      datasetId: [this.campaign? this.campaign.datasetId: ''],
      environment: [this.campaign? this.campaign.environment: ''],
      scheduleTime: [this.campaign? this.campaign.scheduleTime: ''],
      parallelRun: [this.campaign? this.campaign.title: ''],
      retryAuto: [this.campaign? this.campaign.retryAuto: ''],
    });
  }
}
