import { Routes, RouterModule }  from '@angular/router';

import { Register } from './register.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Register
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
