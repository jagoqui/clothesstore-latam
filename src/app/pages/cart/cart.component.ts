import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '@appShared/services/cart.service';
import { ItemCart } from '@appShared/models/shared/cart.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import SwAlert from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  items: ItemCart[] = [];
  private destroy$ = new Subject<unknown>();
  constructor(public cartSvc: CartService) {}

  ngOnInit() {
    this.cartSvc.itemsCart$.pipe(takeUntil(this.destroy$)).subscribe(
      (items: ItemCart[]) => {
        this.items = items;
      },
      () => {},
      () => {
        console.log('termina');
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
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
