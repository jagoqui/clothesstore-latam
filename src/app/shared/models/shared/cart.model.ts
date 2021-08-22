import { Product } from '@appShared/models/Products/product.model';

export interface ItemCart {
  idUser?: number;
  product: Product;
  quantity: number;
}
