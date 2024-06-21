import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngCampagneComponent } from './mng-campagne.component';

describe('MngCampagneComponent', () => {
  let component: MngCampagneComponent;
  let fixture: ComponentFixture<MngCampagneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MngCampagneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MngCampagneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
