import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateComponent} from "./components/create/create.component";
import {NewCaseButtonComponent} from "./components/new-case-button/new-case-button.component";
import {NewDeskButtonComponent} from "./components/new-desk-button/new-desk-button.component";
import {NewFolderButtonComponent} from "./components/new-folder-button/new-folder-button.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {CaseCreatorDialogComponent} from "./components/case-creator-dialog/case-creator-dialog.component";
import {FolderCreatorDialogComponent} from "./components/folder-creator-dialog/folder-creator-dialog.component";
import {DeskCreatorDialogComponent} from "./components/desk-creator-dialog/desk-creator-dialog.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {CaseCreatorService} from "../../services/creators/case-creator.service";
import {FolderCreatorService} from "../../services/creators/folder-creator.service";


@NgModule({
  declarations: [
    CaseCreatorDialogComponent,
    CreateComponent,
    DeskCreatorDialogComponent,
    FolderCreatorDialogComponent,
    NewCaseButtonComponent,
    NewDeskButtonComponent,
    NewFolderButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
  ],
  providers: [
    CaseCreatorService,
    DeskCreatorDialogComponent,
    FolderCreatorService
  ]
})
export class CreateModule {
}
