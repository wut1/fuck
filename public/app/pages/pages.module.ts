
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './../auth.guard.service';
import { HomeModule } from './home/home.module';
import { PnfModule } from './../theme/pnf.module';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';

import { Pages } from './pages.component';

@NgModule({
  imports: [FormsModule,CommonModule,routing,HomeModule,PnfModule],
  declarations: [Pages]
})
export class PagesModule {
}
