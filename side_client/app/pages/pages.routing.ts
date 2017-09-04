import { AuthGuard } from './../auth.guard.service';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterModule'
  },
  {
    path: 'forget',
    loadChildren: './forget/forget.module#ForgetModule'
  },
  {
    path: 'reset/:token',
    loadChildren: './reset/reset.module#ResetModule'
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'detail/:id', loadChildren:'./detail/detail.module#DetailModule' },
      { path: 'publish', loadChildren:'./publish/publish.module#PublishModule',canLoad:[AuthGuard] }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
