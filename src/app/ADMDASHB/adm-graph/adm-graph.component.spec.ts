import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmGraphComponent } from './adm-graph.component';

describe('AdmGraphComponent', () => {
  let component: AdmGraphComponent;
  let fixture: ComponentFixture<AdmGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
