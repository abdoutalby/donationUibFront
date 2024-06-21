import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgGraphDoughnutComponent } from './org-graph-doughnut.component';

describe('OrgGraphDoughnutComponent', () => {
  let component: OrgGraphDoughnutComponent;
  let fixture: ComponentFixture<OrgGraphDoughnutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgGraphDoughnutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrgGraphDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
