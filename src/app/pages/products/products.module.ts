import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsListComponent} from "@products/components/products-list/products-list.component";
import {ProductsRoutingModule} from "@products/products-routing.module";
import {ProductCardComponent} from "@products/components/product-card/product-card.component";
import {ProductsComponent} from "@products/products.component";
import {ProductDetailsComponent} from "@products/components/product-details/product-details.component";

@NgModule({
  declarations: [
    ProductsComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
