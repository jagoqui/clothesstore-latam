import { ParamsSearch } from '@appShared/models/shared/params-search.model';
import { of } from 'rxjs';
import { ItemsByCategory } from '@appShared/models/items-by-category.model';
import { ProductsByCategoryService } from './products-by-category.service';

describe('ProductsByCategoryService', () => {
  let service: ProductsByCategoryService;
  let httpClientSpy: { get: jasmine.Spy };
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ProductsByCategoryService(httpClientSpy as any);
  });

  it('Debe crear el servicio correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('Debe retornar los productos con la query de busqueda', (done: DoneFn) => {
    // Mock de datos
    const mockParamsSearch: ParamsSearch = { q: 'Ropa y accesorios', limit: 20, offset: 0 };
    const mockProductsSearch: ItemsByCategory[] = [];

    httpClientSpy.get.and.returnValue(of(mockProductsSearch));

    service.searchItemsInCategory(mockParamsSearch).subscribe((itemsResponse) => {
      if (itemsResponse?.results) {
        done();
      }
    });
  });
});
