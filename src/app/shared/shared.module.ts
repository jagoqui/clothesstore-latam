import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LottieModule } from 'ngx-lottie';
import { HeaderComponent } from '@appShared/components/header/header.component';
import { SearchComponent } from '@appShared/components/search/search.component';
import { FooterComponent } from '@appShared/components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';

export const playerFactory = () => import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');

const componentsExport = [HeaderComponent, FooterComponent];
const modulesExport = [CommonModule, RouterModule, LottieModule.forRoot({ player: playerFactory })];

@NgModule({
  declarations: [componentsExport, SearchComponent, NavbarComponent],
  imports: [modulesExport, ReactiveFormsModule],
  exports: [modulesExport, componentsExport]
})
export class SharedModule {}
