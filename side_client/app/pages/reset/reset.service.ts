import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable()
export class ResetService {
    constructor(private http:HttpClient){}
    postRest(obj){
        return this.http.post<any>(CONFIGNI.reset,obj);
    }
}