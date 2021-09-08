import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginInputComponent} from "../../components/login-input/login-input.component";
import {PasswordInputComponent} from "../../components/password-input/password-input.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LoginInputComponent,
    PasswordInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginInputComponent,
    PasswordInputComponent,
    ReactiveFormsModule
  ]
})
export class AuthInputsModule {
}
