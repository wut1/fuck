import { BrowserModule,BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TransferHttpCacheModule} from '@nguniversal/common';

import { AppComponent } from './app.component';
import { PnfModule } from './theme/pnf.module';
import { PagesModule } from './pages/pages.module';
import { GlobalState } from './global.state';
import {InterceptedHttp} from './http.interceptor';
import {routing} from './app.routing'
import './app.constant';


const APP_PROVIDERS = [
  GlobalState
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserTransferStateModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PnfModule.forRoot(),
    PagesModule,
    routing,
    TransferHttpCacheModule
  ],
  providers: [...APP_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptedHttp,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
