import { TestBed } from '@angular/core/testing';

import { HotlistitemService } from './hotlistitem.service';

describe('HotlistitemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotlistitemService = TestBed.get(HotlistitemService);
    expect(service).toBeTruthy();
  });
});
