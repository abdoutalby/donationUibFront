import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngDonataireComponent } from './mng-donataire.component';

describe('MngDonataireComponent', () => {
  let component: MngDonataireComponent;
  let fixture: ComponentFixture<MngDonataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MngDonataireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MngDonataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
