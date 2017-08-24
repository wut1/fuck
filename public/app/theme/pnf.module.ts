import { NgModule, ModuleWithProviders,Optional, SkipSelf }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  BaBackTopComponent,
  BaPageTop
} from './components';

import {
  MomentTime
} from './pipes';

const PNF_COMPONENTS = [
  BaBackTopComponent,
  BaPageTop
]

const PNF_PIPES = [
  MomentTime
]

@NgModule({
  declarations: [
    ...PNF_COMPONENTS,
    ...PNF_PIPES
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ...PNF_COMPONENTS,
    ...PNF_PIPES
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
