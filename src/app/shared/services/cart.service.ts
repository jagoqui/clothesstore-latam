import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemCart } from '@appShared/models/shared/cart.model';

const initialState: ItemCart[] = [];

@Injectable({
  providedIn: 'root'
})
export class CartService {
  subjectStore = new BehaviorSubject<ItemCart[]>(initialState);
  store$ = this.subjectStore.asObservable();

  get cart() {
    return this.store$;
  }

  get totalItems() {
    console.log(this.subjectStore.value.length);
    if (this.subjectStore.value.length === 0) {
      return 0;
    }
    return this.subjectStore.value.map((item) => item.productQty).reduce((acc, val) => (acc + val ? val : 0));
  }

  get totalPrice() {
    return this.subjectStore.value
      .map((item) => item.productQty * item.productPrice)
      .reduce((acc, val) => (acc + val ? val : 0));
  }

  findProductInCart(productId: string): ItemCart | undefined {
    return this.subjectStore.value.find((x) => x.productId === productId);
  }

  findIndexProduct(productId: string): number {
    return this.subjectStore.value.findIndex((x) => x.productId === productId);
  }

  addItem(item: ItemCart) {
    const products = this.subjectStore.value;
    const productIndex = this.findIndexProduct(item.productId);

    if (productIndex !== -1) {
      products[productIndex].productQty += 1;
      this.subjectStore.next(products);
      return;
    }
    this.subjectStore.next([...products, { ...item, productQty: 1 }]);
  }

  removeItem(productId: string) {
    const products = this.subjectStore.value.filter((x) => x.productId !== productId);
    this.subjectStore.next(products);
  }

  updateItem(qty: number, productId: string) {
    const products = this.subjectStore.value;
    const productIndex = this.findIndexProduct(productId);

    if (productIndex !== -1) {
      products[productIndex].productQty = qty;
    }
  }

  clear() {
    this.subjectStore.next([]);
    this.subjectStore.complete();
  }
}
