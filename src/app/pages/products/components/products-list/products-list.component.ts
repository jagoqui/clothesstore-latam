import { Component, HostListener, Inject, Input, OnDestroy } from '@angular/core';
import { Product } from '@appShared/models/Products/product.model';
import { DOCUMENT } from '@angular/common';
import { ProductSearchControlService } from '@appShared/services/product-search-control.service';
import { Subject } from 'rxjs';
import { ProductsDataSource } from '@appShared/datasource/data-source.datasource';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnDestroy {
  @Input() products: (Product | undefined)[] | undefined;
  @Input() productsDataSource: ProductsDataSource[] | undefined;
  showButtonScrollingUp = false;

  private scrollHeight = 830;
  private destroy$ = new Subject<unknown>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private productSearchControlSvc: ProductSearchControlService
  ) {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffset = window.pageYOffset;
    const { scrollTop } = this.document.documentElement;
    this.showButtonScrollingUp = (yOffset || scrollTop) > this.scrollHeight;
  }

  onScrollTop() {
    this.document.documentElement.scrollTop = 0;
  }

  onScrollDown() {
    // TODO: Solucionar error de auto scrolling
    // this.productSearchControlSvc.paramsSearch$.pipe(takeUntil(this.destroy$)).subscribe((params) => {
    //   this.productSearchControlSvc.params = {
    //     q: params.q,
    //     limit: this.productSearchControlSvc.itemPorPage,
    //     offset: this.productSearchControlSvc.itemPorPage * 2
    //   };
    // });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
