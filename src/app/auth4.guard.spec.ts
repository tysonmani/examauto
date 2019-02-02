import { TestBed, async, inject } from '@angular/core/testing';

import { Auth4Guard } from './auth4.guard';

describe('Auth4Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth4Guard]
    });
  });

  it('should ...', inject([Auth4Guard], (guard: Auth4Guard) => {
    expect(guard).toBeTruthy();
  }));
});
