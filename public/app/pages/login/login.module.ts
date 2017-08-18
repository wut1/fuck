import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PnfModule } from '../../theme/pnf.module';

import { Login } from './login.component';
import { routing }       from './login.routing';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PnfModule,
    routing
  ],
  declarations: [
    Login
  ]
})
export class LoginModule {}
