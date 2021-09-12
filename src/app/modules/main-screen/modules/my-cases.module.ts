import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyCasesComponent} from "../components/my-cases/my-cases.component";
import {CreateCaseComponent} from "../components/create-case/create-case.component";
import {CreateElementComponent} from "../components/create-element/create-element.component";
import {RightClickModule} from "../../../shared/modules/right-click/right-click.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ShareModalModule} from "../../../shared/modules/share-modal/share-modal.module";
import {FolderEditComponent} from "../components/create/shared/folder-edit/folder-edit.component";
import {DeskEditComponent} from "../components/create/shared/desk-edit/desk-edit.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatOptionModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    MyCasesComponent,
    CreateCaseComponent,
    CreateElementComponent,
    FolderEditComponent,
    DeskEditComponent
  ],
  imports: [
    CommonModule,
    RightClickModule,
    DragDropModule,
    ShareModalModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    MatInputModule
  ],
  exports: [
    MyCasesComponent,
    CreateCaseComponent,
    CreateElementComponent
  ]
})
export class MyCasesModule {
}
