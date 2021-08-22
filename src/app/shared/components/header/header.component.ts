import { Component } from '@angular/core';
import { CartService } from '@appShared/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  query: string = '';

  constructor(public cartSvc: CartService) {}
}
