import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsByCategoryService } from '@appShared/services/products-by-category.service';
import { ProductSearchControlService } from '@appShared/services/product-search-control.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import SwAlert from 'sweetalert2';
import { Product } from '@appShared/models/Products/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] | undefined;
  private destroy$ = new Subject<unknown>();

  constructor(
    private productsByCategorySvc: ProductsByCategoryService,
    private productSearchControlSvc: ProductSearchControlService
  ) {}

  ngOnInit(): void {
    this.productSearchControlSvc.paramsSearch$.subscribe((params) => {
      if (params.q === '') {
        this.products = [];
        return;
      }
      this.productsByCategorySvc
        .searchItemsInCategory(params)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (itemsResponse) => {
            if (params.q === 'ofertas') {
              this.products = itemsResponse.results.filter((product) =>
                product.prices.prices.find((price) => price.type === 'promotion')
              );
              return;
            }
            this.products = itemsResponse.results;
          },
          () => {
            SwAlert.showValidationMessage(`Error obteniendo productos más buscados.`);
          }
        );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
