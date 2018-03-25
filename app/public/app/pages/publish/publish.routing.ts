import { PublishComponent } from './publish.component';
import { Routes, RouterModule }  from '@angular/router';

import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: PublishComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
