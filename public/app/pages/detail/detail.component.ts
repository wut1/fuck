import { DetailService } from './detail.service';
import { Router,ActivatedRoute,ParamMap  } from '@angular/router';
import { Http } from '@angular/http';
import {Component } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'detail',
  templateUrl: './detail.html',
  styleUrls:['./detail.less'],
  providers:[DetailService]
})
export class DetailComponent{
  detail:any;
   constructor(private router: Router,private route:ActivatedRoute,private detailService:DetailService){
     
   }

   ngOnInit():void{
    this.route.paramMap
    .switchMap((params: ParamMap) => {
      // (+) before `params.get()` turns the string into a number
      let selectedId = +params.get('id');
      return this.detailService.getArticleDetail({id:selectedId});
    }).subscribe((response)=>{
      if(response.resultCode==1){
          this.detail = response.resultObj;
      }
   });
    
   }
}
