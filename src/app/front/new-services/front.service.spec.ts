import { TestBed, inject } from '@angular/core/testing';

import { FrontService } from './front.service';

describe('FrontService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FrontService]
    });
  });

  it('should be created', inject([FrontService], (service: FrontService) => {
    expect(service).toBeTruthy();
  }));
});
