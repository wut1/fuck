import { Http,Response } from '@angular/http';
import { Injectable,Inject } from '@angular/core';
import 'rxjs/add/operator/map';
@Injectable()
export class DetailService {
    constructor(private http:Http){}
    getArticleDetail(obj){
        return this.http.post(configUri.getArticleDetail,obj)
            .map((res:Response)=>{
                return res.json();
            })
    }
}