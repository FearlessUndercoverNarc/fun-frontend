import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes} from "@angular/router";
import {MyCasesComponent} from "../components/my-cases/my-cases.component";
import {CreateCaseComponent} from "../components/create-case/create-case.component";
import {CreateElementComponent} from "../components/create-element/create-element.component";


const routes: Routes = [
  {
    path: '',
    component: MyCasesComponent
  },
  {
    path: 'create-case',
    component: CreateCaseComponent
  },
  {
    path: 'create-element',
    component: CreateElementComponent
  }
]

@NgModule({
  declarations: [
    MyCasesComponent,
    CreateCaseComponent,
    CreateElementComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MyCasesComponent,
    CreateCaseComponent,
    CreateElementComponent
  ]
})
export class MyCasesModule {
}
