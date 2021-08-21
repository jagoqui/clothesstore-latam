import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LottieModule } from 'ngx-lottie';
import { HeaderComponent } from '@appShared/components/header/header.component';
import { SearchComponent } from '@appShared/components/search/search.component';
import { FooterComponent } from '@appShared/components/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

export const playerFactory = () => import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');

const imports = [CommonModule, RouterModule, FlexLayoutModule, LottieModule.forRoot({ player: playerFactory })];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SearchComponent],
  imports: [imports, ReactiveFormsModule],
  exports: [imports, HeaderComponent, FooterComponent]
})
export class SharedModule {}
