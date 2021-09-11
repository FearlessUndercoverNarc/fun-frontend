import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RightClickModalComponent} from "../../components/right-click-modal/right-click-modal.component";


@NgModule({
  declarations: [
    RightClickModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RightClickModalComponent
  ]
})
export class RightClickModule {
}
