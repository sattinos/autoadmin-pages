import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {DialogComponent} from "./lib/dialog/dialog.component";
import {NewPasswordComponent} from "./new-password/new-password.component";

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'dialog', component: DialogComponent},
  { path: 'newPassword', component: NewPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
