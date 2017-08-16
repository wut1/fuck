import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HomeService } from './home.service';
import {Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.less'],
  providers:[HomeService]
})
export class HomeComponent{
  noteList:any[] = [];
   constructor(private router: Router,private homeService:HomeService){
     
   }
   toDetail(id:string):void {
    this.router.navigate(['/pages/detail', id]);
   }
   ngOnInit():void{
    //console.log(this.router.queryParams);
    this.homeService.getListArticle({page:0}).subscribe((response)=>{
           if(response.resultCode==1){
               this.noteList = response.resultObj;
           }
        })
   }
}
