import { TestBed } from '@angular/core/testing';

import { FakeApiServiceService } from './fake-api-service.service';

describe('FakeApiServiceService', () => {
  let service: FakeApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
