import { AuthGuard } from '../../../auth.guard.service';
import {Component,Input } from '@angular/core';
import { Router } from '@angular/router';

import {GlobalState} from '../../../global.state';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.less'],
  providers:[AuthGuard]
})
export class BaPageTop {
  user: any={};
  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = true;

  constructor(private _state:GlobalState,private authGuard:AuthGuard,private router:Router) {
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
  ngOnInit() {
    this.user = this.authGuard.getUser();
    this.router.events.subscribe((event:any) => {
      if(event.url){
        this._state.notifyDataChanged('menu.isCollapsed', true);
      }
  });
  }
  logout(){
    this.authGuard.logout().subscribe((response) =>{
      if(response.resultCode ==1){
        alert(response.resultMess);
        location.reload();
      }  
    })
  }
}
