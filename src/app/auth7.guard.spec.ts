import { TestBed, async, inject } from '@angular/core/testing';

import { Auth7Guard } from './auth7.guard';

describe('Auth7Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth7Guard]
    });
  });

  it('should ...', inject([Auth7Guard], (guard: Auth7Guard) => {
    expect(guard).toBeTruthy();
  }));
});
