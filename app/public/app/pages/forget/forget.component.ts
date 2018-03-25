import { ForgetService } from './forget.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'forget',
    templateUrl: './forget.html',
    styleUrls: ['./forget.less'],
    providers:[ForgetService]
})
export class ForgetComponent{
    
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
    constructor(fb:FormBuilder,private forgetService:ForgetService,private router:Router) {
        this.form = fb.group({
          'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });
    
        this.email = this.form.controls['email'];
      }
      public onSubmit(values:any):void {
        this.submitted = true;
        if (this.form.valid) {
          this.forgetService.postForget({
            email:values.email}).subscribe((response)=>{
              alert(response.resultMess);
              if(response.resultCode ==1){            
                this.router.navigate(['/pages/home']);
              }
            })
        }
      }
}