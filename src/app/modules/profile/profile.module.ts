import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './pages/settings/settings.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';



@NgModule({
  declarations: [
    SettingsComponent,
    SubscriptionComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProfileModule { }
