import { Component, Input } from '@angular/core';
import { Product } from '@appShared/models/Products/product.model';
import { CartService } from '@appShared/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: Product | undefined;
  @Input() onCardView: boolean = false;

  constructor(private cartSvc: CartService) {}

  percent(regular_amount: number | undefined, amount: number | undefined) {
    if (regular_amount && amount) {
      return 1 - amount / regular_amount;
    }
    return 0;
  }

  addToCart(product: Product) {
    this.cartSvc.addToCart(product);
  }
}
