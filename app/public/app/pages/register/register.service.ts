
import { HttpClient  } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';

@Injectable()
export class RegisterService {
    constructor(private http:HttpClient){}
    postRegister(obj){
        return this.http.post<any>(CONFIGNI.postRegister,obj);
    }
}