import { ForgetComponent } from './forget.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {routing} from './forget.routing'

@NgModule({
    declarations: [ForgetComponent],
    imports: [ CommonModule,ReactiveFormsModule,
        FormsModule,routing ],
})
export class ForgetModule {}