import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrashBinComponent} from "./components/trash-bin/trash-bin.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ClearTrashBinPopupComponent} from "./components/clear-trashbin-popup/clear-trash-bin-popup.component";


@NgModule({
  declarations: [
    ClearTrashBinPopupComponent,
    TrashBinComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    TrashBinComponent,
  ]
})
export class TrashBinModule {
}
