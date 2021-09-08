import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from "./register.component";
import {RegisterInputsModule} from "../../../../shared/modules/register-inputs/register-inputs.module";


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterInputsModule
  ]
})
export class RegisterModule {
}
