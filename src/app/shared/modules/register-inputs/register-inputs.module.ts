import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FioInputComponent} from "../../components/fio-input/fio-input.component";
import {AuthInputsModule} from "../auth-inputs/auth-inputs.module";
import {UsernameInputComponent} from "../../components/username-input/username-input.component";


@NgModule({
  declarations: [
    UsernameInputComponent
  ],
  imports: [
    CommonModule,
    AuthInputsModule
  ],
  exports: [
    UsernameInputComponent,
    AuthInputsModule
  ]
})
export class RegisterInputsModule {
}
