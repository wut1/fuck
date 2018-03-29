
import { Router } from '@angular/router';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';

import { HomeService } from './home.service';
import {Component ,Inject,PLATFORM_ID,Optional,OnInit} from '@angular/core';
import 'rxjs/add/operator/exhaustMap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

const NOTELIST_KEY = makeStateKey('noteList');

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.less'],
  providers:[HomeService]
})
export class HomeComponent implements OnInit{
  noteList:any[] = [];
  page:number = 0;
   constructor(private state: TransferState,@Optional() @Inject('noteList') private noteListUrl:any,@Inject(PLATFORM_ID) private platformId: Object,private router: Router,private homeService:HomeService){
     
   }
   onScroll():void {
    console.log('scrolled!!')
    ++this.page;
    this.getList(this.page);
   }
   toDetail(id:string):void {
    this.router.navigate(['/pages/detail', id]);
   }
   ngOnInit():void{
    
    if (isPlatformBrowser(this.platformId)) {
      let a = this.state.get(NOTELIST_KEY,null as any);
      if(!a){
        this.getList()
      } else {
        this.noteList = a;
      }
      console.log('当前是客户端平台===>=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>============>');
    }
    if (isPlatformServer(this.platformId)) {
      this.state.set(NOTELIST_KEY,this.noteListUrl as any);
      this.page++;
      console.log('当前是服务端平台===>=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>============>');
    }
   }
   getList(page:number=0):void{
    this.homeService.getListArticle({page:page}).subscribe((response)=>{
      if(response.resultCode==1){
        if(page ==0){
          this.noteList = response.resultObj;

        }else {
          this.noteList = this.noteList.concat(response.resultObj);
        }
          
      }
   })
   }

}
