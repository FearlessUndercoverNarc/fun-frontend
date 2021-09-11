import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyCasesComponent} from "../components/my-cases/my-cases.component";
import {CreateCaseComponent} from "../components/create-case/create-case.component";
import {CreateElementComponent} from "../components/create-element/create-element.component";
import {RightClickModule} from "../../../shared/modules/right-click/right-click.module";


@NgModule({
  declarations: [
    MyCasesComponent,
    CreateCaseComponent,
    CreateElementComponent,
  ],
  imports: [
    CommonModule,
    RightClickModule
  ],
  exports: [
    MyCasesComponent,
    CreateCaseComponent,
    CreateElementComponent
  ]
})
export class MyCasesModule {
}
