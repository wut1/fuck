import { DetailComponent } from './detail.component';
import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: DetailComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
