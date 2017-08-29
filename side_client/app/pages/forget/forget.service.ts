import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ForgetService {
    constructor(private http:Http){}
    postForget(obj){
        return this.http.post(configUri.forget,obj).map(res => {
            return res.json()
        })
    }
}