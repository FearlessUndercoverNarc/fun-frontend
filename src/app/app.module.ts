import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AccountService} from "./shared/services/account.service";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";
import {NewCaseBtnComponent} from './modules/main-screen/components/create/new-case-btn/new-case-btn.component';
import {NewFolderBtnComponent} from './modules/main-screen/components/create/new-folder-btn/new-folder-btn.component';
import {NewDeskBtnComponent} from './modules/main-screen/components/create/new-desk-btn/new-desk-btn.component';
import { ProfileComponent } from './modules/main-screen/components/profile/profile.component';
import { SettingsComponent } from './modules/main-screen/components/settings/settings.component';
import { SubscriptionComponent } from './modules/main-screen/components/subscription/subscription.component';


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    AccountService,
    INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
