import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMaterialModule } from '@chutney/ui-material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CampaignsListComponent } from './campaigns-list.component';

describe('CampaignsListComponent', () => {
  let component: CampaignsListComponent;
  let fixture: ComponentFixture<CampaignsListComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        UiMaterialModule,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      declarations: [CampaignsListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
