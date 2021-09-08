import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthComponent} from "./auth.component";
import {AuthInputsModule} from "../../../../shared/modules/auth-inputs/auth-inputs.module";
import {AccountService} from "../../../../shared/services/account.service";



@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthInputsModule
  ],
  providers: []
})
export class AuthModule { }
