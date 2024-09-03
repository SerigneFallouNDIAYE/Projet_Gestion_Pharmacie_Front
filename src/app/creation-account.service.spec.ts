
import { TestBed } from '@angular/core/testing';

import { CreationAccountService } from './creation-account.service';

describe('CreationAccountService', () => {
  let service: CreationAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreationAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
