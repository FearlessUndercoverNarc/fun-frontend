import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from "./components/register/register.component";
import {RegisterInputsModule} from "../../../../shared/modules/register-inputs/register-inputs.module";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthInputsModule} from "../../../../shared/modules/auth-inputs/auth-inputs.module";

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    AuthInputsModule,
    CommonModule,
    ReactiveFormsModule,
    RegisterInputsModule,
    RouterModule.forChild(routes),
  ]
})
export class RegisterModule {
}
