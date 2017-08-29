import { NgModule } from '@angular/core';
import { ResetComponent } from "./reset.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {routing} from './reset.routing'

@NgModule({
    declarations: [ResetComponent],
    imports: [ CommonModule,
        ReactiveFormsModule,
        FormsModule,routing ]
})
export class ResetModule {}