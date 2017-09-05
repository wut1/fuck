
import { Component} from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';

@Component({
  selector: 'pages',
  template: `
  <ba-page-top></ba-page-top>
  <ba-sidebar></ba-sidebar>
  <div class="wrap">
    <router-outlet></router-outlet>
  </div>
  `,
  styles:['.wrap {padding-top:60px;}']
})
export class Pages {
  constructor(private _menuService:BaMenuService){
    
  }
  ngOnInit(){
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }
}
