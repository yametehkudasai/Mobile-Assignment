import { TestBed } from '@angular/core/testing';

import { Staticlistservice } from './staticlistservice';

describe('Staticlistservice', () => {
  let service: Staticlistservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Staticlistservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
