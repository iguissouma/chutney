import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenariosListComponent } from './scenarios-list.component';
import { UiMaterialModule } from '@chutney/ui-material';
import { UiCommonsModule } from '@chutney/ui-commons';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ScenariosListComponent', () => {
  let component: ScenariosListComponent;
  let fixture: ComponentFixture<ScenariosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
      declarations: [ScenariosListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenariosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
