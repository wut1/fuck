import { Http,Response } from '@angular/http';
import { Injectable,Inject } from '@angular/core';
import 'rxjs/add/operator/map';
@Injectable()
export class LoginService {
    constructor(private http:Http){}
    postLogin(obj){
        return this.http.post(configUri.postLogin,obj)
            .map((res:Response)=>{
                return res.json();
            })
    }
}