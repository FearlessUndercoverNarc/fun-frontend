import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FioInputComponent} from "../../components/fio-input/fio-input.component";
import {AuthInputsModule} from "../auth-inputs/auth-inputs.module";



@NgModule({
  declarations: [
    FioInputComponent
  ],
  imports: [
    CommonModule,
    AuthInputsModule
  ]
})
export class RegisterInputsModule { }
