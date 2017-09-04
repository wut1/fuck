import { NgModule, ModuleWithProviders,Optional, SkipSelf }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  BaBackTopComponent,
  BaPageTop,
  BaSidebar,
  BaMenu,
  BaMenuItem
} from './components';

import {
  MomentTime
} from './pipes';
import {
  BaSlimScroll,
} from './directives';
import {
  BaMenuService
} from './services';

const PNF_COMPONENTS = [
  BaBackTopComponent,
  BaPageTop,
  BaSidebar,
  BaMenu,
  BaMenuItem
]

const PNF_PIPES = [
  MomentTime
]
const PNF_DIRECTIVES = [
  BaSlimScroll
];
const PNF_SERVICES = [
  BaMenuService
]

@NgModule({
  declarations: [
    ...PNF_COMPONENTS,
    ...PNF_PIPES,
    ...PNF_DIRECTIVES
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ...PNF_COMPONENTS,
    ...PNF_PIPES,
    ...PNF_DIRECTIVES
  ]
})
export class PnfModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: PnfModule,
      providers: [
        ...PNF_SERVICES
      ],
    };
  }
}
