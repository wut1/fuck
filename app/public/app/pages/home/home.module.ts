import { HomeComponent } from './home.component';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { PnfModule } from '../../theme/pnf.module';
import {routing} from './home.routing'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    PnfModule
  ],
  declarations: [
   HomeComponent
  ]
})
export class HomeModule {}
