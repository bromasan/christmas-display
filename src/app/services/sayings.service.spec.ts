import { TestBed } from '@angular/core/testing';

import { SayingsService } from './sayings.service';

describe('SayingsService', () => {
  let service: SayingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SayingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
