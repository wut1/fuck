import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import {Component } from '@angular/core';
import 'rxjs/add/operator/exhaustMap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.less'],
  providers:[HomeService]
})
export class HomeComponent{
  noteList:any[] = [];
  page:number = 0;
   constructor(private router: Router,private homeService:HomeService){
     
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
    this.getList();
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
