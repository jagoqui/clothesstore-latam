import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '@appShared/models/Products/product.model';
import { ItemCart } from '@appShared/models/shared/cart.model';
import { find, map, mergeMap, reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemsCart = new BehaviorSubject<ItemCart[]>([]);
  itemsCart$ = this.itemsCart.asObservable();
  indexProductExisting: number | null = null;

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
    // this.itemsCart$
    //   .pipe(
    //     mergeMap((items) => items),
    //     filter((item) => item.product.id === product.id),
    //     tap((search) => {
    //       console.log(search);
    //       return true;
    //     })
    //   )
    //   .subscribe();

    this.totalAmount().subscribe((total) => {
      console.log(total);
    });
    this.itemsCart.next([...this.itemsCart.getValue(), { product, quantity: 1 }]);
    console.log(this.itemsCart.getValue());
  }

  totalAmount(): Observable<number> {
    return this.itemsCart$.pipe(
      mergeMap((itemsCart) => itemsCart),
      map((item) => item.product.price),
      reduce((acc, val) => acc + val)
    );
  }

  totalProduct(): Observable<number> {
    return this.itemsCart$.pipe(
      mergeMap((itemsCart) => itemsCart),
      map((item) => item.quantity),
      reduce((acc, val) => acc + val)
    );
  }

  removeItemCart(product: Product): Observable<ItemCart | undefined> {
    return this.itemsCart$.pipe(
      mergeMap((itemsCart) => itemsCart),
      find((itemsCart) => itemsCart?.product.id === product.id)
    );
  }

  getItemCart(product: Product): Observable<ItemCart | undefined> {
    this.indexProductExisting = null;
    return this.itemsCart$.pipe(
      mergeMap((itemsCart) => itemsCart),
      find((itemsCart, i) => {
        this.indexProductExisting = i;
        console.log(itemsCart?.product.id, product.id);
        return itemsCart?.product.id === product.id;
      })
    );
  }

  clear() {
    this.itemsCart.next([]);
  }
}
