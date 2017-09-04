import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'publish',
    templateUrl: './publish.html',
    styleUrls: ['./publish.less']
})
export class PublishComponent{
    constructor() { 
        $('div#froala-editor').froalaEditor({
            language: 'zh'
          })
        
    }
}