import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {PageNotFoundComponent} from "@pageNotFound/page-not-found.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxSpinnerModule} from "ngx-spinner";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterceptorService} from "@appShared/interceptors/interceptor.service";
import {AppRoutingModule} from "@app/app-routing.module";
import {SharedModule} from "@appShared/shared.module";
import {AppComponent} from "@app/app.component";

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
