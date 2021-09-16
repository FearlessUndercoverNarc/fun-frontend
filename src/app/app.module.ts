import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";
import {RightClickService} from "./shared/services/right-click.service";
import {RightClickModule} from "./shared/modules/right-click/right-click.module";
import {PathService} from "./modules/main-screen/services/path.service";
import {ShareModalModule} from "./shared/modules/share-modal/share-modal.module";
import {ShareFolderService} from "./modules/main-screen/services/share-folder.service";
import {FoldersService} from "./modules/main-screen/services/folders.service";


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
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RightClickModule,
    ShareModalModule
  ],
  providers: [
    FoldersService,
    PathService,
    RightClickService,
    ShareFolderService,
    INTERCEPTOR_PROVIDER
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
