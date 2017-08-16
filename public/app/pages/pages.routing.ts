import { AuthGuard } from './../auth.guard.service';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'detail/:id', loadChildren:'./detail/detail.module#DetailModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
