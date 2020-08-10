import { HttpClient  } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';

@Injectable()
export class DetailService {
    constructor(private http:HttpClient){}
    getArticleDetail(obj){
        return this.http.post<any>(CONFIGNI.getArticleDetail,obj)
    }
}