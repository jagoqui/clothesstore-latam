import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDetailsComponent } from '@cart/components/item-details/item-details.component';
import { ItemComponent } from '@cart/components/item/item.component';
import { CartComponent } from '@cart/cart.component';
import { ItemsListComponent } from '@cart/components/items-list/items-list.component';
import { CartRoutingModule } from '@cart/cart-routing.module';
import { ProductsModule } from '@products/products.module';

@NgModule({
  declarations: [CartComponent, ItemDetailsComponent, ItemComponent, ItemsListComponent],
  imports: [CommonModule, CartRoutingModule, ProductsModule]
})
export class CartModule {}
