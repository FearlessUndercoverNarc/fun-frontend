import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RightClickModule} from "../../../../shared/modules/right-click/right-click.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ShareModalModule} from "../../../../shared/modules/share-modal/share-modal.module";
import {SharedCasesComponent} from "./components/shared-cases/shared-cases.component";


@NgModule({
  declarations: [
    SharedCasesComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    RightClickModule,
    ShareModalModule
  ],
  exports: [
    SharedCasesComponent
  ]
})
export class SharedCasesModule {
}
