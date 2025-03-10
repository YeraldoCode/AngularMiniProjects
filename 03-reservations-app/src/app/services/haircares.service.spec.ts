import { TestBed } from '@angular/core/testing';

import { HaircaresService } from './haircares.service';

describe('HaircaresService', () => {
  let service: HaircaresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HaircaresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
