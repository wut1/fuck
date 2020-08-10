import {Component, ElementRef, HostListener} from '@angular/core';
import {GlobalState} from '../../../global.state';

@Component({
  selector: 'ba-sidebar',
  templateUrl: './baSidebar.html',
  styleUrls: ['./baSidebar.less']
})
export class BaSidebar {
  public isMenuCollapsed:boolean = false;
  public isMenuShouldCollapsed:boolean = false;

  constructor(private _elementRef:ElementRef, private _state:GlobalState) {

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }
  public ngOnInit():void {
    this.menuCollapse();
  }
  public menuExpand():void {
    this.menuCollapseStateChange(false);
  }

  public menuCollapse():void {
    this.menuCollapseStateChange(true);
  }

  public menuCollapseStateChange(isCollapsed:boolean):void {
    this.isMenuCollapsed = isCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
  }
}
