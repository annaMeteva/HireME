import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliesListComponent } from './applies-list.component';

describe('AppliesListComponent', () => {
  let component: AppliesListComponent;
  let fixture: ComponentFixture<AppliesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppliesListComponent]
    });
    fixture = TestBed.createComponent(AppliesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
