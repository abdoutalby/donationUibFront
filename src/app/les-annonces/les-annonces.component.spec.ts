import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesAnnoncesComponent } from './les-annonces.component';

describe('LesAnnoncesComponent', () => {
  let component: LesAnnoncesComponent;
  let fixture: ComponentFixture<LesAnnoncesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LesAnnoncesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LesAnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
