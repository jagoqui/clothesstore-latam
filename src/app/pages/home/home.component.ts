import { Component, OnInit } from '@angular/core';
import { ItemsByCategoryService } from '@appShared/services/items-by-category.service';
import { takeUntil } from 'rxjs/operators';
import SwAlert from 'sweetalert2';
import { Subject } from 'rxjs';
import { Product } from '@appShared/models/Products/product.model';
import { ItemsByCategory } from '@appShared/models/items-by-category.model';
import { ProductSearchControlService } from '@appShared/services/product-search-control.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productsMostWanted: Product[] = [];
  productsFiltered: Product[] = [];
  private destroy$ = new Subject<ItemsByCategory>();

  constructor(
    private itemsByCategory: ItemsByCategoryService,
    private productSearchControlSvc: ProductSearchControlService
  ) {}

  ngOnInit(): void {
    this.itemsByCategory
      .searchItemsInCategory('hombre', 50, 0)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (itemsResponse) => {
          this.productsMostWanted = itemsResponse.results;
        },
        () => {
          SwAlert.showValidationMessage(`Error obteniendo productos más buscados.`);
        }
      );

    this.productSearchControlSvc.query$.subscribe((query) => {
      if (query === '') {
        this.productsFiltered = [];
        return;
      }
      this.itemsByCategory
        .searchItemsInCategory(query, 50, 0)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (itemsResponse) => {
            this.productsFiltered = itemsResponse.results;
          },
          () => {
            SwAlert.showValidationMessage(`Error obteniendo productos más buscados.`);
          }
        );
    });
  }
}
