import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {LoadingInterceptor} from "./interceptors/loading-interceptor";
import {LoadingComponent} from "./view/loading/loading.component";
import {DialogComponent} from "./dialog/dialog.component";
import {InputRowComponent} from "./view/input-row/input-row.component";
import {ValidationMessagesComponent} from "./view/validation-messages/validation-messages.component";
import {AchievementListComponent} from "./view/achievement-list/achievement-list.component";
import {DigitOnlyDirective} from "./directives/digit-only/digit-only.directive";
import { InputMaskDirective } from './directives/input-mask/input-mask.directive';

@NgModule({
  declarations: [
    LoadingComponent,
    DialogComponent,
    InputRowComponent,
    ValidationMessagesComponent,
    AchievementListComponent,
    DigitOnlyDirective,
    InputMaskDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  exports: [
    InputRowComponent,
    DialogComponent,
    LoadingComponent,
    ValidationMessagesComponent,
    AchievementListComponent,
    DigitOnlyDirective,
    InputMaskDirective
  ]
})
export class LibModule {
}
