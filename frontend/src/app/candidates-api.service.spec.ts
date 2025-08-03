import { TestBed } from '@angular/core/testing';

import { CandidatesApiService } from './candidates-api.service';

describe('CandidatesApiService', () => {
  let service: CandidatesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
