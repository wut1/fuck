import { AuthGuard } from './../auth.guard.service';
import { Component} from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';

@Component({
  selector: 'pages',
  template: `
  <ba-page-top [user]="user"></ba-page-top>
  <ba-sidebar></ba-sidebar>
  <div class="wrap">
    <router-outlet></router-outlet>
  </div>
  `,
  styles:['.wrap {padding-top:60px;}']
})
export class Pages {
  user:any;
  constructor(private userServer:AuthGuard,private _menuService:BaMenuService){
    
  }
  ngOnInit(){
    this.user = this.userServer.getUser();
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }
}
