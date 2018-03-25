import { PublishService } from './publish.service';
import { routing } from './publish.routing';
import { PublishComponent } from './publish.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


@NgModule({
    declarations: [PublishComponent],
    imports: [ CommonModule,ReactiveFormsModule,routing,FroalaEditorModule.forRoot(), FroalaViewModule.forRoot() ],
    providers:[PublishService]
})
export class PublishModule {}