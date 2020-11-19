import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionsListComponent } from './executions-list.component';
import { CampaignsGQL, CampaignsLastExecutionsGQL } from '@chutney/data-access';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UiMaterialModule } from '@chutney/ui-material';
import { UiCommonsModule } from '@chutney/ui-commons';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ExecutionsListComponent', () => {
  let component: ExecutionsListComponent;
  let fixture: ComponentFixture<ExecutionsListComponent>;
  let campaignsLastExecutionsGQL: CampaignsLastExecutionsGQL;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiMaterialModule,
        UiCommonsModule,
        CommonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      declarations: [ExecutionsListComponent],
      providers: [
        {provide: CampaignsLastExecutionsGQL, useValue: {valueChanges: jest.fn()}},
      ],
    })
      .compileComponents();
    campaignsLastExecutionsGQL = TestBed.inject(CampaignsLastExecutionsGQL);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
