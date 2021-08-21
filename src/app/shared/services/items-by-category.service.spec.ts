import { TestBed } from '@angular/core/testing';

import { ItemsByCategoryService } from './items-by-category.service';

describe('ItemsByCategoryService', () => {
  let service: ItemsByCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsByCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
