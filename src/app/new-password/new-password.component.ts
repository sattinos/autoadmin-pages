import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

import {CustomValidators} from "../lib/controller/validation/custom-validators";
import {ValidationItem} from "../lib/models/validation-item";
import {isElementInvalid, isElementMissed, isElementTooShort} from "../lib/controller/validation/validation-queries";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html'
})
export class NewPasswordComponent implements OnInit {
  // sessionId
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      this.sessionId = params['sessionId'];
    });
  }

  sessionId: string | undefined = undefined;

  eyeToggled = false;

  newPasswordForm = this.formBuilder.group({
      newPassword: ['',
        Validators.compose([
            Validators.required,
            Validators.minLength(8),
            CustomValidators.patternValidator(/\d/, {missingNumber: true}),
            CustomValidators.patternValidator(/[a-z]+/, {missingAtLeastOneLowercase: true}),
            CustomValidators.patternValidator(/[A-Z]+/, {missingAtLeastOneUpperCase: true}),
            CustomValidators.patternValidator(/[@#$%^&\-+=()]/, {missingAtLeastOneSymbol: true})
          ]
        )
      ],
      repeatPassword: ['', [Validators.required]]
    }, {
      validators: CustomValidators.matchValidator('newPassword', 'repeatPassword', {passwordMismatch: true})
    }
  );

  newPasswordValidationItems: ValidationItem[] = [
    {message: "new password is required", flag: isElementMissed.bind(this, this.newPasswordForm, 'newPassword')}
  ];

  repeatPasswordValidationItems: ValidationItem[] = [
    {message: "password repeat is required", flag: isElementMissed.bind(this, this.newPasswordForm, 'repeatPassword')},
    {message: "repeat password should match password", flag: this.isPasswordMisMatch.bind(this)}
  ];

  newPasswordStrenghPoints: ValidationItem[] = [
    {message: "should be at least 8 characters", flag: isElementTooShort.bind(this, this.newPasswordForm, 'newPassword')},
    {message: "should contain at least one number", flag: this.missingNumber.bind(this)},
    {message: "should contain at least one lowercase character", flag: this.missingAtLeastOneLowercase.bind(this)},
    {message: "should contain at least one uppercase character", flag: this.missingAtLeastOneUpperCase.bind(this)},
    {message: "should contain at least one symbol", flag: this.missingAtLeastOneSymbol.bind(this)}
  ];

  isNewPasswordFilled() {
    let element = this.newPasswordForm.controls['newPassword'];
    return element.touched && !element.hasError('required');
  }

  missingNumber() {
    let element = this.newPasswordForm.controls['newPassword'];
    return element.errors?.required || (element.touched && element.errors?.missingNumber);
  }

  missingAtLeastOneSymbol() {
    let element = this.newPasswordForm.controls['newPassword'];
    return element.errors?.required || (element.errors?.missingAtLeastOneSymbol);
  }

  missingAtLeastOneLowercase() {
    let element = this.newPasswordForm.controls['newPassword'];
    return element.errors?.required || (element.touched && element.errors?.missingAtLeastOneLowercase);
  }

  missingAtLeastOneUpperCase() {
    let element = this.newPasswordForm.controls['newPassword'];
    return element.errors?.required || (element.touched && element.errors?.missingAtLeastOneUpperCase);
  }

  isPasswordMisMatch() {
    let passwordElement = this.newPasswordForm.controls['newPassword'];
    let repeatPasswordElement = this.newPasswordForm.controls['repeatPassword'];
    return passwordElement.touched && repeatPasswordElement.touched && this.newPasswordForm.errors?.passwordMismatch;
  }

  onEyeClicked() {
    this.eyeToggled = !this.eyeToggled;
  }

  isElementInvalid(elementName: string) {
    return isElementInvalid(this.newPasswordForm, elementName);
  }

  onSubmitTapped() {
    let formValue = this.newPasswordForm.value;
    formValue['sessionId'] = this.sessionId;
    console.log('new password:', formValue);
  }
}
