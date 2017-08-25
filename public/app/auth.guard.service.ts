import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { CanActivate, Routes,Router,CanLoad,ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthGuard  {
    constructor(private http:Http,private router:Router,private activeRouter: ActivatedRoute){}
    canActivate():Observable<boolean>{
        return this.checkLogin(); 
    }
    canLoad():Observable<boolean>{
        return this.checkLogin(); 
    }
    checkLogin():Observable<boolean>{
        return this.http.post(configUri.isLogin,{}).map(res => {
            let response = res.json();
                if(response.resultCode ==1){           
                    return true;
                } else if(response.resultCode ==0){
                    return false;         
                }
            })
    }

    getUser():Observable<any> {
        return this.http.post(configUri.isLogin,{}).map(res => {        
                return res.json();
            });
    }
    logout():Observable<any> {
        return this.http.post(configUri.logout,{}).map(res => {        
            return res.json();
        });
    }
}