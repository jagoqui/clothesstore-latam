import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ImagesCarouselComponent} from "@home/components/images-carousel/images-carousel.component";
import {ProductsCarouselComponent} from "@home/components/products-carousel/products-carousel.component";
import {HomeComponent} from "@home/home.component";
import {HomeRoutingModule} from "@home/home-routing.module";


@NgModule({
  declarations: [
    HomeComponent,
    ImagesCarouselComponent,
    ProductsCarouselComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule {
}
