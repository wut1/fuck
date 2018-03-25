import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable()
export class PublishService {
    constructor(private http:HttpClient){}
    public postPublish(obj){
        return this.http.post<any>(CONFIGNI.publish,obj);
    }
}