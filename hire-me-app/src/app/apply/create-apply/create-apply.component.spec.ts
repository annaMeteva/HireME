import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApplyComponent } from './create-apply.component';

describe('CreateApplyComponent', () => {
  let component: CreateApplyComponent;
  let fixture: ComponentFixture<CreateApplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateApplyComponent]
    });
    fixture = TestBed.createComponent(CreateApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
