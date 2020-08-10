import { PublishService } from './publish.service';
import {environment} from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'publish',
    templateUrl: './publish.html',
    styleUrls: ['./publish.less']
})
export class PublishComponent{
    public form:FormGroup;
    public title:AbstractControl;
    public editor:AbstractControl;
    public submitted:boolean = false;
    constructor(private fb:FormBuilder,private publishService:PublishService,private router:Router ) { 
        this.form = fb.group({
            'title': ['', Validators.compose([Validators.required])],
            'editor':['',Validators.compose([Validators.required])]
          });
          this.title = this.form.controls['title'];
          this.editor = this.form.controls['editor'];
    }
    public onSubmit(values:any):void {
        this.submitted = true;
        if (this.form.valid) {
            this.publishService.postPublish(values).subscribe(response=>{
                if(response.resultCode ==1){
                    alert('发布成功');
                    this.router.navigate(['/page/home']);
                }
            })
        }
      }
      public setControlValue(html){
        this.form.patchValue({'editor':html});
      }
    public options: any = {
        placeholderText: '在这里编辑!',
        language:'zh_cn',
        imageUploadURL:environment.realHost + CONFIGNI.upload,
        imageErrorCallback: (data)=> {
            console.log(data)
        },
        events : {
            'froalaEditor.focus' : (e, editor)=> {
              var html = editor.html.get(); 
                this.setControlValue(html);
            },
            'froalaEditor.contentChanged': (e, editor)=> {
                var html = editor.html.get();   
                    this.setControlValue(html);
              },
          }
      }
}