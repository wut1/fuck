import { PnfModule } from './theme/pnf.module';
import { PagesModule } from './pages/pages.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { GlobalState } from './global.state';
import { HttpModule, Http, RequestOptions,XHRBackend } from '@angular/http';
import {httpFactory} from './http.interceptor';

import {routing} from './app.routing'

import './app.config'


const APP_PROVIDERS = [
  GlobalState
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PnfModule.forRoot(),
    PagesModule,
    routing
  ],
  providers: [...APP_PROVIDERS,{
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions]
        }],
  bootstrap: [AppComponent]
})
export class AppModule { }
