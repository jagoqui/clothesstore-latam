import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from '@products/components/products-list/products-list.component';
import { ProductsRoutingModule } from '@products/products-routing.module';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsComponent } from '@products/products.component';
import { ProductDetailsComponent } from '@products/components/product-details/product-details.component';
import { SharedModule } from '@appShared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [ProductsComponent, ProductCardComponent, ProductDetailsComponent, ProductsListComponent],
  exports: [ProductsListComponent, ProductCardComponent],
  imports: [CommonModule, ProductsRoutingModule, InfiniteScrollModule, SharedModule, ScrollingModule]
})
export class ProductsModule {}
