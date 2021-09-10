import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplateComponent} from '../components/template/template.component';
import {MyCasesComponent} from '../components/my-cases/my-cases.component';
import {SharedCasesComponent} from '../components/shared-cases/shared-cases.component';
import {TrashBinComponent} from '../components/trash-bin/trash-bin.component';
import {RouterModule, Routes} from "@angular/router";
import {MyCasesModule} from "./my-cases.module";
import {TrashBinModule} from "./trash-bin.module";
import {CasesService} from "../services/cases.service";
import {PathService} from "../services/path.service";
import {CreateModule} from "./create.module";
import {CreateComponent} from "../components/create/create.component";
import {ProfileComponent} from "../components/profile/profile.component";
import {DesksLoaderService} from "../services/desks-loader.service";


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
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
]


@NgModule({
  declarations: [
    TemplateComponent,
    SharedCasesComponent,
    ProfileComponent
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
    PathService,
    DesksLoaderService
  ]
})
export class MainScreenModule {
}
