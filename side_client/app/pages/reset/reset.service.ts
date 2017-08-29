import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ResetService {
    constructor(private http:Http){}
    postRest(obj){
        return this.http.post(configUri.reset,obj).map(res=>{
            return res.json()
        })
    }
}