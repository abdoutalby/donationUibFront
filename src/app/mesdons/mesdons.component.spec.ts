import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesdonsComponent } from './mesdons.component';

describe('MesdonsComponent', () => {
  let component: MesdonsComponent;
  let fixture: ComponentFixture<MesdonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesdonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesdonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
