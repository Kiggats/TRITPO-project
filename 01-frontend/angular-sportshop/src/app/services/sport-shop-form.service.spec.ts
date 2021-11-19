import { TestBed } from '@angular/core/testing';

import { SportShopFormService } from './sport-shop-form.service';

describe('SportShopFormService', () => {
  let service: SportShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
