import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsListComponent } from './campaigns-list.component';
import { CampaignsGQL } from '@chutney/data-access';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UiMaterialModule } from '@chutney/ui-material';
import { UiCommonsModule } from '@chutney/ui-commons';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

describe('CampaignsListComponent', () => {
  let component: CampaignsListComponent;
  let fixture: ComponentFixture<CampaignsListComponent>;
  let campaignsGQL: CampaignsGQL;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiMaterialModule,
        UiCommonsModule,
        CommonModule,
        ReactiveFormsModule,
      ],
      declarations: [CampaignsListComponent],
      providers: [
        {provide: CampaignsGQL, useValue: {campaigns: jest.fn()}},
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    })
      .compileComponents();
    campaignsGQL = TestBed.inject(CampaignsGQL);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
