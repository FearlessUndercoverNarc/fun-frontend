import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrashBinComponent} from "../components/trash-bin/trash-bin.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {PopupComponent} from "../components/template/popup/popup.component";


@NgModule({
  declarations: [
    TrashBinComponent,
    PopupComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    TrashBinComponent,
    MatDialogModule,
    MatButtonModule
  ]
})
export class TrashBinModule {
}
