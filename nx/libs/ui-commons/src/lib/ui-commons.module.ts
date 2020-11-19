import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExecutionBadgeComponent } from './components/execution-badge/execution-badge.component';
import { TopBannerComponent } from './components/top-banner/top-banner.component';
import { UiMaterialModule } from '@chutney/ui-material';

@NgModule({
  imports: [CommonModule,
    UiMaterialModule],
  declarations: [ExecutionBadgeComponent, TopBannerComponent],
  exports: [ExecutionBadgeComponent, TopBannerComponent],
})
export class UiCommonsModule {
}
