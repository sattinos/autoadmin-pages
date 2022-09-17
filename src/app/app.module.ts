import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {NewPasswordComponent} from './new-password/new-password.component';
import {HttpClientModule} from "@angular/common/http";
import {LibModule} from "./lib/lib.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ResetPasswordComponent,
    NewPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    LibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
