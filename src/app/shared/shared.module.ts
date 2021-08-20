import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {LottieModule} from "ngx-lottie";
import {HeaderComponent} from "@appShared/components/header/header.component";
import {SearchComponent} from "@appShared/components/search/search.component";
import {FooterComponent} from "@appShared/components/footer/footer.component";

export const playerFactory = () => import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');

const imports = [
  CommonModule,
  RouterModule,
  LottieModule.forRoot({player: playerFactory})
];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SearchComponent],
  imports: [
    imports
  ],
  exports: [
    imports,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule {
}
