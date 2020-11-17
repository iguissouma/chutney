import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChutneyComponent } from './chutney.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChutneyComponent', () => {
  let component: ChutneyComponent
  let fixture: ComponentFixture<ChutneyComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChutneyComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ChutneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'chutney'`, () => {
    expect(component.title).toEqual('chutney');
  });
});
