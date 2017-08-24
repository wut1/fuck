import { AuthGuard } from './../../../auth.guard.service';
import {Component,Input } from '@angular/core';

import {GlobalState} from '../../../global.state';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.less'],
  providers:[AuthGuard]
})
export class BaPageTop {
  @Input() user: any;
  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(private _state:GlobalState,private authGuard:AuthGuard) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
  logout(){
    this.authGuard.logout().subscribe(response =>{
      alert(response.resultMess);
      location.reload();
    })
  }
}
