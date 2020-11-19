import { Component, OnInit } from '@angular/core';
import {
  Campaign,
  CampaignGQL,
  CampaignsDocument,
  CampaignsGQL,
  CampaignsQuery,
  DeleteCampaignGQL
} from '@chutney/data-access';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { TdDialogService } from '@covalent/core/dialogs';
import { filter, searchInObj, sortByKeys } from '@chutney/utils';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'chutney-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  campaigns$: Observable<Campaign[]>;
  filteredCampaigns$: Observable<Campaign[]>;
  filterControl: FormControl = new FormControl();

  constructor(private campaignsGQL: CampaignsGQL,
              private deleteCampaignGQL: DeleteCampaignGQL,
              private route: ActivatedRoute,
              private router: Router,
              private _dialogService: TdDialogService,) {
  }

  ngOnInit(): void {
    this.campaigns$ = this.campaignsGQL.watch().valueChanges.pipe(pluck('data', 'campaigns'));
    this.applyFilter();
  }

  applyFilter() {
    this.filteredCampaigns$ = this.campaigns$.pipe(map((campaigns) => {
      return filter(campaigns, [
        (campaign) => searchInObj(campaign, this.filterControl.value)]);
    }))
  }

  onEdit(id: string) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  onDelete(id: string) {
    this._dialogService
      .openConfirm({
        title: 'Confirm',
        message: 'After deletion, the campaign cannot be restored',
        cancelButton: 'Cancel',
        acceptButton: 'Ok',
      }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.deleteCampaignGQL
          .mutate(
            {input: id},
            {
              update: (store, result) => {
                const data: CampaignsQuery = store.readQuery({query: CampaignsDocument});
                const index = data.campaigns.findIndex((campaign) => campaign.id === id);
                const campaigns = [
                  ...data.campaigns.slice(0, index),
                  ...data.campaigns.slice(index + 1),
                ];
                store.writeQuery({query: CampaignsDocument, data: {campaigns}});
              },
            }
          ).subscribe();
      }
    });
  }

  createCampaign() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
