import { NgModule, ModuleWithProviders,Optional, SkipSelf }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  BaBackTopComponent
} from './components';

const NGA_COMPONENTS = [
  BaBackTopComponent
]

@NgModule({
  declarations: [
    ...NGA_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ...NGA_COMPONENTS,
  ]
})
export class PnfModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: PnfModule,
      providers: [
      ],
    };
  }
}
