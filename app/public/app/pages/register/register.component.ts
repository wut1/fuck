import { RegisterService } from './register.service';
import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.less'],
  providers:[RegisterService]
})
export class Register {

  public form:FormGroup;
  public name:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;

  public submitted:boolean = false;

  constructor(fb:FormBuilder,private registerService:RegisterService,private router:Router) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = this.form.get('passwords') as FormGroup;
    this.password = this.form.get('passwords.password');
    this.repeatPassword =this.form.get('passwords.repeatPassword');
  }
  

  public onSubmit(values:any):void {
    this.submitted = true;
    if (this.form.valid) {
      this.registerService.postRegister({
        name:values.name,
        email:values.email,
        password:values.passwords.password
      }).subscribe((response)=>{
        alert(response.resultMess);
        if(response.resultCode ==1){
          this.router.navigate(['/pages/home']);
        }
      })
    }
  }
}
