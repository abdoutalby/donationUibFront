import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresqueFiniComponent } from './presque-fini.component';

describe('PresqueFiniComponent', () => {
  let component: PresqueFiniComponent;
  let fixture: ComponentFixture<PresqueFiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresqueFiniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresqueFiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
