import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplateComponent} from './components/template/template.component';
import {SharedCasesComponent} from './modules/shared-cases/components/shared-cases/shared-cases.component';
import {TrashBinComponent} from './modules/trash-bin/components/trash-bin/trash-bin.component';
import {RouterModule, Routes} from "@angular/router";
import {MyCasesModule} from "./modules/my-cases/my-cases.module";
import {TrashBinModule} from "./modules/trash-bin/trash-bin.module";
import {CasesService} from "./services/cases.service";
import {CreateModule} from "./modules/create/create.module";
import {CreateComponent} from "./modules/create/components/create/create.component";
import {ProfileComponent} from "./components/profile/profile.component";

import {SettingsComponent} from "./components/settings/settings.component";
import {SubscriptionComponent} from "./components/subscription/subscription.component";
import {RepositoryComponent} from "./components/repository/repository.component";

import {DesksLoaderService} from "./services/desks-loader.service";
import {PathLineComponent} from "./components/path-line/path-line.component";
import {FolderTrashBinService} from "./services/folder-trash-bin.service";
import {DeskTrashBinService} from "./services/desk-trash-bin.service";
import {SharedCasesModule} from "./modules/shared-cases/shared-cases.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ShareModalModule} from "../../shared/modules/share-modal/share-modal.module";


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
    loadChildren: () => import('./modules/my-cases/my-cases.module').then(mc => mc.MyCasesModule)
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
    PathLineComponent,
    ProfileComponent,
    RepositoryComponent,
    SettingsComponent,
    SubscriptionComponent,
    TemplateComponent,
  ],
  imports: [
    CommonModule,
    CreateModule,
    FormsModule,
    MatSnackBarModule,
    MyCasesModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ShareModalModule,
    SharedCasesModule,
    TrashBinModule,
  ],
  providers: [
    CasesService,
    DeskTrashBinService,
    DesksLoaderService,
    FolderTrashBinService,
  ],
})
export class MainScreenModule {
}
