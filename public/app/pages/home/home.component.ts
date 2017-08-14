import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HomeService } from './home.service';
import {Component,OnChanges,SimpleChanges,ViewEncapsulation,ViewChild,HostBinding  } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.less'],
  providers:[HomeService]
})
export class HomeComponent{
   constructor(private router: Router,private homeService:HomeService){
     
   }
   ngOnInit():void{
    //console.log(this.router.queryParams);
    this.homeService.getListArticle({page:0}).subscribe((response)=>{
           if(response.resultCode==1){
               console.log(response.data)
           }
        })
   }
}
