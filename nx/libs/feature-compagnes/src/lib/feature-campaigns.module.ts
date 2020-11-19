import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsComponent } from './containers/campaigns/campaigns.component';
import { UiCommonsModule } from '@chutney/ui-commons';
import { RouterModule } from '@angular/router';
import { UiMaterialModule } from '@chutney/ui-material';
import { ReactiveFormsModule } from '@angular/forms';
import { CampaignsListComponent } from './components/campaigns-list/campaigns-list.component';
import { ExecutionsListComponent } from './components/executions-list/executions-list.component';
import { CampaignDetailsComponent } from './containers/camapign-details/campaign-details.component';
import { CampaignFormComponent } from './components/campaign-form/campaign-form.component';

@NgModule({
  imports: [
    CommonModule,
    UiCommonsModule,
    RouterModule.forChild([
      { path: '', component: CampaignsComponent },
      { path: 'create', component: CampaignDetailsComponent },
      { path: ':id/edit', component: CampaignDetailsComponent },
    ]),
    UiMaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [CampaignsComponent, CampaignsListComponent, ExecutionsListComponent, CampaignDetailsComponent, CampaignFormComponent],
})
export class FeatureCampaignsModule {}
