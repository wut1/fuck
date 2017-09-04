import { Component } from '@angular/core';
import { GlobalState } from './global.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  isMenuCollapsed: boolean = false;
  title = 'app';
  constructor(private _state:GlobalState){
    
  }
  ngAfterViewInit():void{
    $('#preloader').hide();
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }
}
