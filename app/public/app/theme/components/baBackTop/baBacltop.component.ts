import {Component, ViewChild, HostListener, Input, ElementRef,PLATFORM_ID,Inject} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';


@Component({
  selector: 'ba-back-top',
  styleUrls: ['./baBackTop.less'],
  template: `
    <i #baBackTop class="fa fa-angle-up back-top ba-back-top" title="Back to Top"></i>
  `
})
export class BaBackTopComponent {
  @Input() position:number = 400;
  @Input() showSpeed:number = 500;
  @Input() moveSpeed:number = 1000;

  @ViewChild('baBackTop') _selector:ElementRef;
  constructor(@Inject(PLATFORM_ID) private platformId: Object){

  }
  ngAfterViewInit () {
    if (isPlatformBrowser(this.platformId)) {
      this._onWindowScroll();
   }
  }

  @HostListener('click')
  _onClick():boolean {
    jQuery('html, body').animate({scrollTop:0}, {duration:this.moveSpeed});
    return false;
  }

  @HostListener('window:scroll')
  _onWindowScroll():void {
    let el = this._selector.nativeElement;
    window.scrollY > this.position ? jQuery(el).fadeIn(this.showSpeed) : jQuery(el).fadeOut(this.showSpeed);
  }
}
