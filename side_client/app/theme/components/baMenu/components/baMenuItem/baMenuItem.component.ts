import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ba-menu-item',
  templateUrl: './baMenuItem.html',
  styleUrls: ['./baMenuItem.less']
})
export class BaMenuItem {

  @Input() menuItem:any;
}
