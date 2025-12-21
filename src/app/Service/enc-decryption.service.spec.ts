import { TestBed } from '@angular/core/testing';

import { EncDecryptionService } from './enc-decryption.service';

describe('EncDecryptionService', () => {
  let service: EncDecryptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncDecryptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
