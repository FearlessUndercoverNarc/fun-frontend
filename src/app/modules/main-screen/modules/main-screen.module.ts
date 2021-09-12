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
import {CreateModule} from "./create.module";
import {CreateComponent} from "../components/create/create.component";
import {ProfileComponent} from "../components/profile/profile.component";

import {SettingsComponent} from "../components/settings/settings.component";
import {SubscriptionComponent} from "../components/subscription/subscription.component";
import {RepositoryComponent} from "../components/repository/repository.component";

import {DesksLoaderService} from "../services/desks-loader.service";
import {FoldersService} from "../services/folders.service";
import {PathLineComponent} from "../components/template/path-line/path-line.component";
import {DeleteService} from "../services/delete.service";
import {PathService} from "../services/path.service";
import {TrashedFoldersService} from "../services/trashed-folders.service";
import {TrashedDesksService} from "../services/trashed-desks.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


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
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'subscription',
    component: SubscriptionComponent
  },
  {
    path: 'repository',
    component: RepositoryComponent
  }
]


@NgModule({
  declarations: [
    TemplateComponent,
    PathLineComponent,
    SharedCasesComponent,

    SettingsComponent,
    ProfileComponent,
    SubscriptionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MyCasesModule,
    TrashBinModule,
    CreateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [
    CasesService,
    DesksLoaderService,
    FoldersService,
    TrashedFoldersService,
    TrashedDesksService
  ],
})
export class MainScreenModule {
}
