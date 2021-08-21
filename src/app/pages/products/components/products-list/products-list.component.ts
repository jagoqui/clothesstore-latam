import { Component, HostListener, Inject, Input } from '@angular/core';
import { Product } from '@appShared/models/Products/product.model';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  @Input() products: Product[] | undefined;

  // characters$ = this.dataSvc.characters;
  showButtonScrollingUp = false;

  private scrollHeight = 830;
  private pageNum = 1;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffset = window.pageYOffset;
    const { scrollTop } = this.document.documentElement;

    this.showButtonScrollingUp = (yOffset || scrollTop) > this.scrollHeight;
  }

  onScrollTop() {
    this.document.documentElement.scrollTop = 0;
  }

  onScrollDown(arrowDownPress?: boolean) {
    if (arrowDownPress) {
      this.document.documentElement.scrollTop = this.document.documentElement.scrollTop + 600;
    }
    console.log('Down');
    // TODO: Hacer paginado con el filtro
    // this.dataSvc.getCharactersByPages(this.pageNum++);
  }
}
