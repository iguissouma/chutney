import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatPassToggleVisibilityComponent } from './mat-pass-toggle-visibility.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UiCommonsModule } from '@chutney/ui-commons';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

describe('MatPassToggleVisibilityComponent', () => {
  let component: MatPassToggleVisibilityComponent;
  let fixture: ComponentFixture<MatPassToggleVisibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UiCommonsModule,
        CommonModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      declarations: [MatPassToggleVisibilityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatPassToggleVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
