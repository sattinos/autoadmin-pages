import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {DialogComponent} from './lib/dialog/dialog.component';
import {InputRowComponent} from './lib/view/input-row/input-row.component';
import {ValidationMessagesComponent} from "./lib/view/validation-messages/validation-messages.component";
import {AchievementListComponent} from './lib/view/achievement-list/achievement-list.component';
import {NewPasswordComponent} from './new-password/new-password.component';
import {LoadingComponent} from "./lib/view/loading/loading.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoadingInterceptor} from "./lib/interceptors/loading-interceptor";

@NgModule({
  declarations: [
    LoadingComponent,
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ResetPasswordComponent,
    DialogComponent,
    ValidationMessagesComponent,
    InputRowComponent,
    AchievementListComponent,
    NewPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
