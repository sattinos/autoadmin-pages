import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DialogComponent } from './lib/dialog/dialog.component';
import { InputRowComponent } from './lib/view/input-row/input-row.component';
import {ValidationMessagesComponent} from "./lib/view/validation-messages/validation-messages.component";
import { AchievementListComponent } from './lib/view/achievement-list/achievement-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ResetPasswordComponent,
    DialogComponent,
    ValidationMessagesComponent,
    InputRowComponent,
    AchievementListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
