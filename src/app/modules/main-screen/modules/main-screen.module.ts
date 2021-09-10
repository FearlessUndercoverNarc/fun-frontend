import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplateComponent} from '../components/template/template.component';
import {MyCasesComponent} from '../components/my-cases/my-cases.component';
import {SharedCasesComponent} from '../components/shared-cases/shared-cases.component';
import {TrashBinComponent} from '../components/trash-bin/trash-bin.component';
import {RouterModule, Routes} from "@angular/router";
import {CreateCaseComponent} from '../components/create-case/create-case.component';
import {CreateElementComponent} from '../components/create-element/create-element.component';
import {MyCasesModule} from "./my-cases.module";
import {TrashBinModule} from "./trash-bin.module";
import {CasesService} from "../services/cases.service";
import {PathService} from "../services/path.service";
import {CreateModule} from "./create.module";
import {CreateComponent} from "../components/create/create.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-cases',
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'my-cases',
    component: MyCasesComponent,
    loadChildren: () => import('./my-cases.module').then(mc => mc.MyCasesModule)
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
    SharedCasesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MyCasesModule,
    TrashBinModule,
    CreateModule
  ],
  providers: [
    CasesService,
    PathService
  ]
})
export class MainScreenModule {
}
