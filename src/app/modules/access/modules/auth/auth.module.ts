import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthComponent} from "./components/auth/auth.component";
import {AuthInputsModule} from "../../../../shared/modules/auth-inputs/auth-inputs.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthInputsModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class AuthModule { }
