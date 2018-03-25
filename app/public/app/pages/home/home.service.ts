import { HttpClient  } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
@Injectable()
export class HomeService {
    constructor(private http:HttpClient){}
    getListArticle(obj){
        return this.http.post<any>(CONFIGNI.getArticles,obj)
    }
}