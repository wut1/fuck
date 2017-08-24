import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '',redirectTo: 'pages/home',pathMatch: 'full'  },
  { path: '**', redirectTo: 'pages/home' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);