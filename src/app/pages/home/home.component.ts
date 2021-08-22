import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsByCategoryService } from '@appShared/services/products-by-category.service';
import { takeUntil } from 'rxjs/operators';
import SwAlert from 'sweetalert2';
import { Subject } from 'rxjs';
import { Product } from '@appShared/models/Products/product.model';
import { ParamsSearch } from '@appShared/models/shared/params-search.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  productsMostWanted: Product[] = [];
  private destroy$ = new Subject<unknown>();

  constructor(private productsByCategorySvc: ProductsByCategoryService) {}

  ngOnInit(): void {
    const paramsSearch: ParamsSearch = {
      q: 'Mas vendidos',
      limit: 20,
      offset: 0
    };
    this.productsByCategorySvc
      .searchItemsInCategory(paramsSearch)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (itemsResponse) => {
          this.productsMostWanted = itemsResponse.results;
        },
        () => {
          SwAlert.showValidationMessage(`Error obteniendo productos más buscados.`);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
