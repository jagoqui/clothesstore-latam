import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '@appShared/models/Products/product.model';
import { ItemCart } from '@appShared/models/shared/cart.model';
import { find, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemsCart = new BehaviorSubject<ItemCart[]>([]);
  itemsCart$ = this.itemsCart.asObservable();

  get numberOfItems(): number {
    let size = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of this.itemsCart.getValue()) {
      size += item.quantity;
    }
    return size;
  }

  addToCart(product: Product): void {
    // eslint-disable-next-line no-restricted-syntax
    // for (const item of this.itemsCart.getValue()) {
    //   if (item.product.id === product.id) {
    //     const { quantity } = item;
    //     // this.removeItemCart(item.product);
    //     this.itemsCart.next([...this.itemsCart.getValue(), { product, quantity: quantity + 1 }]);
    //     return;
    //   }
    // }
    this.itemsCart.next([...this.itemsCart.getValue(), { product, quantity: 1 }]);
    console.log(this.itemsCart.getValue());
  }

  removeItemCart(product: Product): Observable<ItemCart | undefined> {
    return this.itemsCart$.pipe(
      mergeMap((itemsCart) => itemsCart),
      find((itemsCart) => itemsCart?.product.id === product.id)
    );
  }

  getItemCart(product: Product): Observable<ItemCart | undefined> {
    return this.itemsCart$.pipe(
      mergeMap((itemsCart) => itemsCart),
      find((itemsCart) => itemsCart?.product.id === product.id)
    );
  }

  clear() {
    this.itemsCart.next([]);
  }
}
