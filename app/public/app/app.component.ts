import { Component,Inject,PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { GlobalState } from './global.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  isMenuCollapsed: boolean = false;
  title = 'app';
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private _state:GlobalState){
    
  }
  ngAfterViewInit():void{
    if (isPlatformBrowser(this.platformId)) {
      $('#preloader').hide();
      this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
        this.isMenuCollapsed = isCollapsed;
      });
  }
}
}
