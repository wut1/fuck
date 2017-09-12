import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable()
export class ForgetService {
    constructor(private http:HttpClient){}
    postForget(obj){
        return this.http.post<any>(CONFIGNI.forget,obj)
    }
}