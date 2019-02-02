import { TestBed, async, inject } from '@angular/core/testing';

import { Auth5Guard } from './auth5.guard';

describe('Auth5Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth5Guard]
    });
  });

  it('should ...', inject([Auth5Guard], (guard: Auth5Guard) => {
    expect(guard).toBeTruthy();
  }));
});
