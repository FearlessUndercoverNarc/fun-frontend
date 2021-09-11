import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateComponent} from "../components/create/create.component";
import {NewCaseBtnComponent} from "../components/create/new-case-btn/new-case-btn.component";
import {NewDeskBtnComponent} from "../components/create/new-desk-btn/new-desk-btn.component";
import {NewFolderBtnComponent} from "../components/create/new-folder-btn/new-folder-btn.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {CaseCreatorDialogComponent} from "../components/create/shared/components/case-creator-dialog/case-creator-dialog.component";
import {FolderCreatorDialogComponent} from "../components/create/shared/components/folder-creator-dialog/folder-creator-dialog.component";
import {DeskCreatorDialogComponent} from "../components/create/shared/components/desk-creator-dialog/desk-creator-dialog.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CreateComponent,
    NewCaseBtnComponent,
    NewDeskBtnComponent,
    NewFolderBtnComponent,
    CaseCreatorDialogComponent,
    FolderCreatorDialogComponent,
    DeskCreatorDialogComponent,

  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    MatInputModule
  ],
})
export class CreateModule {
}
