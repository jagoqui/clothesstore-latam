import { Component } from '@angular/core';
import { ProductSearchControlService } from '@appShared/services/product-search-control.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private productSearchControlSvc: ProductSearchControlService) {}
  query = '';

  onFilter(query: string) {
    this.query = query;
  }
}
