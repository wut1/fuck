import { LoginService } from './login.service';
import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.less'],
  providers:[LoginService]
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder,private loginService:LoginService,private router:Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:any):void {
    this.submitted = true;
    if (this.form.valid) {
      this.loginService.postLogin({
        email:values.email,
        password:values.password}).subscribe((response)=>{
          if(response.resultCode ==1){
            this.router.navigate(['/pages/home']);
          }
        })
      // your code goes here
      // console.log(values);
    }
  }
}
