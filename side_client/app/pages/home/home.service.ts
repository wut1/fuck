import { Http,Response } from '@angular/http';
import { Injectable,Inject } from '@angular/core';
import 'rxjs/add/operator/map';
@Injectable()
export class HomeService {
    constructor(private http:Http){}
    getListArticle(obj){
        return this.http.post(configUri.getArticles,obj)
            .map((res:Response)=>{
                return res.json();
            })
    }
}