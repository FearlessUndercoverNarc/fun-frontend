import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateComponent} from "../components/create/create.component";
import {NewCaseBtnComponent} from "../components/create/new-case-btn/new-case-btn.component";
import {NewDeskBtnComponent} from "../components/create/new-desk-btn/new-desk-btn.component";
import {NewFolderBtnComponent} from "../components/create/new-folder-btn/new-folder-btn.component";


@NgModule({
  declarations: [
    CreateComponent,
    NewCaseBtnComponent,
    NewDeskBtnComponent,
    NewFolderBtnComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CreateModule {
}
