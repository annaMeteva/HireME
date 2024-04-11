import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyDetailComponent } from './apply-detail.component';

describe('ApplyDetailComponent', () => {
  let component: ApplyDetailComponent;
  let fixture: ComponentFixture<ApplyDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyDetailComponent]
    });
    fixture = TestBed.createComponent(ApplyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
