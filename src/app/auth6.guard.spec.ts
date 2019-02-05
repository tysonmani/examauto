import { TestBed, async, inject } from '@angular/core/testing';

import { Auth6Guard } from './auth6.guard';

describe('Auth6Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth6Guard]
    });
  });

  it('should ...', inject([Auth6Guard], (guard: Auth6Guard) => {
    expect(guard).toBeTruthy();
  }));
});
