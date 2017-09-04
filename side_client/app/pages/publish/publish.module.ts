import { routing } from './publish.routing';
import { PublishComponent } from './publish.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


@NgModule({
    declarations: [PublishComponent],
    imports: [ CommonModule,routing,FroalaEditorModule.forRoot(), FroalaViewModule.forRoot() ]
})
export class PublishModule {}