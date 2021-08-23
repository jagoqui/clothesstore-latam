import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartService } from '@appShared/services/cart.service';
import { ItemCart } from '@appShared/models/shared/cart.model';
import { Observable } from 'rxjs';
import SwAlert from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  cart$: Observable<ItemCart[]> = this.cartSvc.cart;

  constructor(public cartSvc: CartService) {}

  deleteItem(productId: string) {
    return this.cartSvc.removeItem(productId);
  }

  updateItem(qty: number, productId: string) {
    this.cartSvc.updateItem(qty, productId);
  }

  onClear() {
    SwAlert.fire({
      title: 'Está seguro?',
      text: 'Si eliminarán todos los productos del carrito',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, vaciar!',
      cancelButtonText: 'Cancelar'
    }).then((resultDelete) => {
      if (resultDelete.isConfirmed) {
        this.cartSvc.clear();
        SwAlert.fire(`El carrito fue vaciado! `, '', 'success').then();
      }
    });
  }
}
