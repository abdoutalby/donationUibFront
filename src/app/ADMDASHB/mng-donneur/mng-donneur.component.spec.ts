import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngDonneurComponent } from './mng-donneur.component';

describe('MngDonneurComponent', () => {
  let component: MngDonneurComponent;
  let fixture: ComponentFixture<MngDonneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MngDonneurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MngDonneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
