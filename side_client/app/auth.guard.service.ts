import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Routes,Router,CanLoad,ActivatedRoute } from '@angular/router';
@Injectable()
export class AuthGuard  {
    constructor(private http:HttpClient,private router:Router,private activeRouter: ActivatedRoute){}
    canActivate():Observable<boolean>{
        return this.checkLogin(); 
    }
    canLoad():Observable<boolean>{
        return this.checkLogin(); 
    }
    checkLogin():Observable<boolean>{
        return this.http.post<any>(CONFIGNI.isLogin,{}).map(response => {
                if(response.resultCode ==1){                      
                    return true;
                } else if(response.resultCode ==0){
                    alert('请先登录');
                    this.router.navigate(['/login']);
                    return false;         
                }
            })
    }

    getUser():Observable<any> {
        return this.http.post<any>(CONFIGNI.isLogin,{}).map(res => {   
            if(res.resultCode==1){
                return res.resultObj;
            } else {
                return {};
            }         
        });
    }
    logout():Observable<any> {
        return this.http.post<any>(CONFIGNI.logout,{}).map(res => {        
            return res;
        });
    }
}