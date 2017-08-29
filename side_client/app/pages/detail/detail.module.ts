import { DetailComponent } from './detail.component';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { PnfModule } from '../../theme/pnf.module';
import {routing} from './detail.routing'

@NgModule({
  imports: [
    CommonModule,
    PnfModule,
    routing
  ],
  declarations: [
   DetailComponent
  ]
})
export class DetailModule {}
