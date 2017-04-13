import { TestBed, inject } from '@angular/core/testing';

import { BrowserTitleService } from './browser-title.service';

describe('BrowserTitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserTitleService]
    });
  });

  it('should ...', inject([BrowserTitleService], (service: BrowserTitleService) => {
    expect(service).toBeTruthy();
  }));
});
