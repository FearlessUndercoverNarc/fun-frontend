import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./shared/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cases',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/access/components/auth/auth.module').then(a => a.AuthModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/access/components/register/register.module').then(r => r.RegisterModule),
  },
  {
    path: 'not-found',
    loadChildren: () => import('./modules/access/components/not-found/not-found.module').then(nf => nf.NotFoundModule),
  },
  {
    path: 'forbidden',
    loadChildren: () => import('./modules/access/components/forbidden/forbidden.module').then(f => f.ForbiddenModule),
  },
  {
    path: 'cases',
    loadChildren: () => import('./modules/main-screen/main-screen.module').then(ms => ms.MainScreenModule),
    // canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
