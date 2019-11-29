import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatShiftSelectionComponent } from './ngx-mat-shift-selection.component';

describe('NgxMatShiftSelectionComponent', () => {
  let component: NgxMatShiftSelectionComponent;
  let fixture: ComponentFixture<NgxMatShiftSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMatShiftSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatShiftSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
