import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemCart } from '@appShared/models/shared/cart.model';

const initialState: ItemCart[] = [
  {
    productId: 'MCO571557808',
    productQty: 1,
    productPrice: 105000,
    productName: 'Bota Converse All Star Unisex Importada',
    productThumbnail: 'https://http2.mlstatic.com/D_643445-MCO42732622767_072020-O.jpg'
  }
];

@Injectable({
  providedIn: 'root'
})
export class CartService {
  subjectStore = new BehaviorSubject<ItemCart[]>(initialState);
  store$ = this.subjectStore.asObservable();

  constructor() {
    // const cartItems: ItemCart[] = JSON.parse(<string>localStorage.getItem('CartItems'));
    // if (cartItems) {
    //   this.subjectStore.next(cartItems);
    // }
  }

  get cart() {
    return this.store$;
  }

  get totalItems() {
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
      // localStorage.setItem('CartItems', JSON.stringify(this.subjectStore.value));
      return;
    }
    this.subjectStore.next([...products, { ...item, productQty: 1 }]);
  }

  removeItem(productId: string) {
    const products = this.subjectStore.value.filter((x) => x.productId !== productId);
    // localStorage.setItem('CartItems', JSON.stringify(this.subjectStore.value));
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
    // localStorage.removeItem('CartItems');
  }
}
