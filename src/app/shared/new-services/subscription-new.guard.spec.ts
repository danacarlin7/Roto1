import { TestBed, async, inject } from '@angular/core/testing';

import { SubscriptionNewGuard } from './subscription-new.guard';

describe('SubscriptionNewGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubscriptionNewGuard]
    });
  });

  it('should ...', inject([SubscriptionNewGuard], (guard: SubscriptionNewGuard) => {
    expect(guard).toBeTruthy();
  }));
});
