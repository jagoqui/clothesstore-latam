import { Component, Input } from '@angular/core';
import { Product } from '@appShared/models/Products/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: Product | undefined;

  percent(regular_amount: number | undefined, amount: number | undefined) {
    if (regular_amount && amount) {
      return 1 - amount / regular_amount;
    }
    return 0;
  }

  addToCart(product: Product) {}
}
