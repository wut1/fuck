import { HomeComponent } from './home.component';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PnfModule } from '../../theme/pnf.module';
import {routing} from './home.routing'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PnfModule,
    routing
  ],
  declarations: [
   HomeComponent
  ],
  providers: [
 
  ]
})
export class HomeModule {}
