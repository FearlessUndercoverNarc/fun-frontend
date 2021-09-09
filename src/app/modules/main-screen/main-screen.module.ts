import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplateComponent} from './components/template/template.component';
import {MyCasesComponent} from './components/my-cases/my-cases.component';
import {SharedCasesComponent} from './components/shared-cases/shared-cases.component';
import {TrashBinComponent} from './components/trash-bin/trash-bin.component';
import {RouterModule, Routes} from "@angular/router";


// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'template',
//     pathMatch: 'full'
//   },
//   {
//     path: 'template',
//     component: TemplateComponent,
//   },
// ]

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-cases',
    pathMatch: 'full'
  },
  {
    path: 'my-cases',
    component: MyCasesComponent
  },
  {
    path: 'shared-cases',
    component: SharedCasesComponent
  },
  {
    path: 'trash-bin',
    component: TrashBinComponent
  }
]


@NgModule({
  declarations: [
    TemplateComponent,
    MyCasesComponent,
    SharedCasesComponent,
    TrashBinComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MainScreenModule {
}
