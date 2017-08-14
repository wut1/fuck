import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { CanActivate, Routes,Router,CanLoad,ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthGuard implements CanLoad,CanActivate  {
    constructor(private http:Http,private router:Router,private activeRouter: ActivatedRoute){}
    canActivate():Observable<boolean>{
        return this.checkLogin(); 
    }
    canLoad():Observable<boolean>{
        return this.checkLogin(); 
    }
    checkLogin():Observable<boolean>{
        return this.http.post(configUri.isLogin,{se:'+3'}).map(res => {
            let response = res.json();
                if(response.resultCode ==1){           
                    return true;
                } else if(response.resultCode ==401){
                    console.log('未登陆==')
                    this.router.navigate(['/pages/login']);
                    return false;
                    
                }
            })
    }
}