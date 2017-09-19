import { LoginService } from './login.service';
import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.less'],
  providers:[LoginService]
})
export class Login {
  public emailLogin:boolean =false;
  public form:FormGroup;
  public emailGroup:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public phoneGroup:FormGroup;
  public phone:AbstractControl;
  public validateCode:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder,private loginService:LoginService,private router:Router) {
    this.form = fb.group({
      'emailGroup':fb.group({
        'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }),
      'phoneGroup':fb.group({
        'phone': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'validateCode': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      })
    });
    this.emailGroup = <FormGroup> this.form.controls['emailGroup'];
    this.email = this.emailGroup.controls['email'];
    this.password = this.emailGroup.controls['password'];
    this.phoneGroup = <FormGroup> this.form.controls['phoneGroup'];
    this.phone = this.phoneGroup.controls['phone'];
    this.validateCode = this.phoneGroup.controls['validateCode'];
  }
  public changeLogin():void {
    this.emailLogin = !this.emailLogin;
  }
  public sendNote():void{
    this.loginService.sendNote({phone:this.phone.value}).subscribe((response)=>{
      alert(response.resultMess);
    })
  }
  public onSubmit(form:FormGroup):void {
    this.submitted = true;
    if (this.emailLogin&& form.controls.emailGroup.valid) {
      let values = form.controls.emailGroup.value;
      this.loginService.postLogin({
        email:values.email,
        password:values.password}).subscribe((response)=>{
          if(response.resultCode ==1){
            this.router.navigate(['/pages/home']);
          } else {
            alert(response.resultMess)
          }
        })
    } else if (!this.emailLogin&& form.controls.phoneGroup.valid){
      let values = form.controls.phoneGroup.value;
      this.loginService.postLoginByNote({
        phone:values.phone,
        validateCode:values.validateCode}).subscribe((response)=>{
          if(response.resultCode ==1){
            this.router.navigate(['/pages/home']);
          } else {
            alert(response.resultMess)
          }
        })
    }
  }
}
