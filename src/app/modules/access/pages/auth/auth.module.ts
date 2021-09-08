import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthComponent} from "./auth.component";
import {AuthInputsModule} from "../../../../shared/modules/auth-inputs/auth-inputs.module";



@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthInputsModule
  ]
})
export class AuthModule { }
