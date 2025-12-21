import { TestBed } from '@angular/core/testing';

import { UserregistrationserviceService } from './userregistrationservice.service';

describe('UserregistrationserviceService', () => {
  let service: UserregistrationserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserregistrationserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
