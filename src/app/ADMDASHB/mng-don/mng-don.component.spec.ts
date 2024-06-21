import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngDonComponent } from './mng-don.component';

describe('MngDonComponent', () => {
  let component: MngDonComponent;
  let fixture: ComponentFixture<MngDonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MngDonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MngDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
