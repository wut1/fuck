import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class PublishService {
    constructor(private http:Http){}
    public postPublish(obj){
        return this.http.post(configUri.publish,obj).map(res=>{
            return res.json();
        })
    }
}