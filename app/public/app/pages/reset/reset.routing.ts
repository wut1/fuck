import { Routes, RouterModule }  from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import {ResetComponent} from './reset.component'

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ResetComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
