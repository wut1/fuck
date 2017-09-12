import { HttpClient  } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';

@Injectable()
export class LoginService {
    constructor(private http:HttpClient){}
    postLogin(obj){
        return this.http.post<any>(CONFIGNI.postLogin,obj);
    }
}