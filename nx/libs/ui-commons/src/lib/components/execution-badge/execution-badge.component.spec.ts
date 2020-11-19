import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionBadgeComponent } from './execution-badge.component';
import { ElementRef, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { UiMaterialModule } from '@chutney/ui-material';
import { UiCommonsModule } from '@chutney/ui-commons';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

describe('ExecutionBadgeComponent', () => {
  let component: ExecutionBadgeComponent;
  let fixture: ComponentFixture<ExecutionBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ExecutionBadgeComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
