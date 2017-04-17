import { TestBed, inject } from '@angular/core/testing';

import { BreakThoughtService } from './break-thought.service';

describe('BreakThoughtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreakThoughtService]
    });
  });

  it('should ...', inject([BreakThoughtService], (service: BreakThoughtService) => {
    expect(service).toBeTruthy();
  }));
});
