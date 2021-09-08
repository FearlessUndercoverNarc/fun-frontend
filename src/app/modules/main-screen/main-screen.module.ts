import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplateComponent} from './components/template/template.component';
import {MyCasesComponent} from './components/my-cases/my-cases.component';
import {SharedCasesComponent} from './components/shared-cases/shared-cases.component';
import {TrashBinComponent} from './components/trash-bin/trash-bin.component';


@NgModule({
  declarations: [
    TemplateComponent,
    MyCasesComponent,
    SharedCasesComponent,
    TrashBinComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class MainScreenModule {
}
