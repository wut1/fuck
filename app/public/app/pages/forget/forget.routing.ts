import { Routes, RouterModule }  from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import {ForgetComponent} from './forget.component'

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ForgetComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
