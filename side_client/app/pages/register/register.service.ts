import { Http,Response } from '@angular/http';
import { Injectable,Inject } from '@angular/core';
import 'rxjs/add/operator/map';
@Injectable()
export class RegisterService {
    constructor(private http:Http){}
    postRegister(obj){
        return this.http.post(configUri.postRegister,obj)
            .map((res:Response)=>{
                return res.json();
            })
    }
}