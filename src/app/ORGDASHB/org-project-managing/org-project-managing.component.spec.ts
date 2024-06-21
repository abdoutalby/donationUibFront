import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgProjectManagingComponent } from './org-project-managing.component';

describe('OrgProjectManagingComponent', () => {
  let component: OrgProjectManagingComponent;
  let fixture: ComponentFixture<OrgProjectManagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgProjectManagingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrgProjectManagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
