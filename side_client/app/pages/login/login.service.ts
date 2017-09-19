import { HttpClient  } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';

@Injectable()
export class LoginService {
    constructor(private http:HttpClient){}
    postLogin(obj){
        return this.http.post<any>(CONFIGNI.postLogin,obj);
    }
    postLoginByNote(obj){
        return this.http.post<any>(CONFIGNI.postLoginByNote,obj);
    }
    sendNote(obj){
        return this.http.post<any>(CONFIGNI.sendNote,obj);
    }
}