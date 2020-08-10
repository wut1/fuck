import { NgModule }      from '@angular/core';
import { CommonModule, }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PnfModule } from '../../theme/pnf.module';

import { Register } from './register.component';
import { routing }       from './register.routing';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PnfModule,
    routing
  ],
  declarations: [
    Register
  ]
})
export class RegisterModule {}
