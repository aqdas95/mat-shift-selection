import { TestBed } from '@angular/core/testing';

import { NgxMatShiftSelectionService } from './ngx-mat-shift-selection.service';

describe('NgxMatShiftSelectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxMatShiftSelectionService = TestBed.get(NgxMatShiftSelectionService);
    expect(service).toBeTruthy();
  });
});
