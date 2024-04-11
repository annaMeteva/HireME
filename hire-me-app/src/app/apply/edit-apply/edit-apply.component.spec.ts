import { ComponentFixture, TestBed } from '@angular/core/testing';

import EditApplyComponent from './edit-apply.component';

describe('EditApplyComponent', () => {
  let component: EditApplyComponent;
  let fixture: ComponentFixture<EditApplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditApplyComponent]
    });
    fixture = TestBed.createComponent(EditApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
