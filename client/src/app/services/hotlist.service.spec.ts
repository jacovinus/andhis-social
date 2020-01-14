import { TestBed } from '@angular/core/testing';

import { HotlistService } from './hotlist.service';

describe('HotlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotlistService = TestBed.get(HotlistService);
    expect(service).toBeTruthy();
  });
});
