import { ResetService } from './reset.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router,ActivatedRoute,ParamMap  } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'reset',
    templateUrl: './reset.html',
    styleUrls: ['./reset.less'],
    providers:[ResetService]
})
export class ResetComponent implements OnInit {
    token:string;
    public form:FormGroup;
    public email:AbstractControl;
    public password:AbstractControl;
    public submitted:boolean = false;
      constructor(fb:FormBuilder,private resetService:ResetService,private router:Router,private route:ActivatedRoute) {
          this.form = fb.group({
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
          });
      
          this.password = this.form.controls['password'];
        }
        public onSubmit(values:any):void {
          this.submitted = true;
          if (this.form.valid) {
            this.resetService.postRest({
                token:this.token,
                password:values.password}).subscribe((response)=>{
                alert(response.resultMess);
                if(response.resultCode ==1){            
                  this.router.navigate(['/pages/home']);
                }
              })
          }
        }
        ngOnInit(){
            this.route.paramMap
            .switchMap((params: ParamMap) => {
              return params.get('token');
            }).subscribe(res=>{
                this.token = res;
            })
        }

}