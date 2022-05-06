import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from "@angular/forms";
import {ValidationItem} from "../lib/models/validation-item";
import {CustomValidators} from "../lib/controller/validation/custom-validators";
import {
  isElementInvalid,
  isElementMissed,
  isElementTooLong,
  isElementTooShort,
  isEmailNotValidFormat
} from "../lib/controller/validation/validation-queries";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  eyeToggled = false;

  signupForm = this.formBuilder.group({
    fullname: ['', [Validators.required, Validators.minLength(8)]],
    genderSelector: ['', [Validators.required]],
    birthdate: ['', [Validators.required] ],
    username: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30),
      CustomValidators.patternValidator(/^[a-z]/, { noStartWithLowercase: true } ),
      CustomValidators.patternValidator(/^\w+$/, { noAlphanumericOnly: true } )
    ]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.email]],
    password: ['',
      Validators.compose([
          Validators.required,
          Validators.minLength(8),
          CustomValidators.patternValidator(/\d/, { missingNumber: true }),
          CustomValidators.patternValidator(/[a-z]+/, { missingAtLeastOneLowercase: true } ),
          CustomValidators.patternValidator(/[A-Z]+/, { missingAtLeastOneUpperCase: true }),
          CustomValidators.patternValidator(/[@#$%^&\-+=()]/, { missingAtLeastOneSymbol: true})
        ]
      )
    ],
    repeatPassword: ['', [Validators.required]]
  }, {
      validators: CustomValidators.matchValidator('password', 'repeatPassword', { passwordMismatch: true})
    }
  );

  fullnameValidationItems: ValidationItem[] = [
    {message: "Please provide a fullname", flag: isElementMissed.bind(this, this.signupForm,'fullname')},
    {message: "The fullname should be at least 8 characters", flag: isElementTooShort.bind(this,this.signupForm, "fullname")},
  ];

  usernameValidationItems: ValidationItem[] = [
    { message: "Please provide a username", flag: isElementMissed.bind(this, this.signupForm,'username') },
  ];

  usernameStrenghPoints: ValidationItem[] = [
    { message: "should be at least 6 characters", flag: isElementTooShort.bind(this, this.signupForm, 'username') },
    { message: "should not exceed 30 characters", flag: isElementTooLong.bind(this, this.signupForm, 'username') },
    { message: "should start with a lowercase character", flag:  this.userNameNoStartWithLowerCase.bind(this) },
    { message: "should contain only alphanumeric characters", flag:  this.userNameNoAlphaNumeric.bind(this) }
  ];

  birthDateValidationItems: ValidationItem[] = [
    {message: "Please provide a birth date", flag: isElementMissed.bind(this, this.signupForm, 'birthdate')}
  ];

  genderValidationItems: ValidationItem[] = [
    {message: "Please select your gender", flag: isElementMissed.bind(this, this.signupForm, 'genderSelector')}
  ];

  emailValidationItems: ValidationItem[] = [
    {message: "Please provide an email address", flag: isElementMissed.bind(this, this.signupForm, 'email')},
    {message: "The email address should be at least 5 characters", flag: isElementTooShort.bind(this,this.signupForm, "email") },
    {message: "The email address entered is not valid format", flag: isEmailNotValidFormat.bind(this, this.signupForm, 'email')}
  ];

  passwordValidationItems: ValidationItem[] = [
    { message: "password is required", flag: isElementMissed.bind(this, this.signupForm, 'password') }
  ];

  repeatPasswordValidationItems: ValidationItem[] = [
    { message: "password repeat is required", flag: isElementMissed.bind(this, this.signupForm, 'repeatPassword') },
    { message: "repeat password should match password", flag: this.isPasswordMisMatch.bind(this) }
  ];

  passwordStrenghPoints: ValidationItem[] = [
    { message: "should be at least 8 characters", flag: isElementTooShort.bind(this, this.signupForm, 'password') },
    { message: "should contain at least one number", flag: this.missingNumber.bind(this) },
    { message: "should contain at least one lowercase character", flag: this.missingAtLeastOneLowercase.bind(this) },
    { message: "should contain at least one uppercase character", flag: this.missingAtLeastOneUpperCase.bind(this) },
    { message: "should contain at least one symbol", flag: this.missingAtLeastOneSymbol.bind(this) }
  ];

  isPasswordFilled() {
    let element = this.signupForm.controls['password'];
    return element.touched && !element.hasError('required');
  }

  missingNumber() {
    let element = this.signupForm.controls['password'];
    return element.errors?.required || (element.touched && element.errors?.missingNumber);
  }

  missingAtLeastOneSymbol() {
    let element = this.signupForm.controls['password'];
    return element.errors?.required || (element.errors?.missingAtLeastOneSymbol);
  }

  missingAtLeastOneLowercase() {
    let element = this.signupForm.controls['password'];
    return element.errors?.required || (element.touched && element.errors?.missingAtLeastOneLowercase);
  }

  missingAtLeastOneUpperCase() {
    let element = this.signupForm.controls['password'];
    return element.errors?.required || (element.touched && element.errors?.missingAtLeastOneUpperCase);
  }

  userNameNoStartWithLowerCase() {
    let element = this.signupForm.controls['username'];
    return element.errors?.required || (element.touched && element.errors?.noStartWithLowercase);
  }

  userNameNoAlphaNumeric() {
    let element = this.signupForm.controls['username'];
    return element.errors?.required || (element.touched && element.errors?.noAlphanumericOnly);
  }

  isUsernameFilled() {
    let element = this.signupForm.controls['username'];
    return element.touched && !element.hasError('required');
  }

  isElementInvalid(elementName: string) {
    return isElementInvalid(this.signupForm, elementName);
  }

  isPasswordMisMatch() {
    let passwordElement = this.signupForm.controls['password'];
    let repeatPasswordElement = this.signupForm.controls['repeatPassword'];
    return passwordElement.touched && repeatPasswordElement.touched && this.signupForm.errors?.passwordMismatch;
  }

  signupTapped() {
    console.log('signup with data: ', this.signupForm.value);
  }

  get minAge() {
    let today = new Date();
    today.setFullYear(today.getFullYear() - 15);
    return today.toISOString().split('T')[0];
  }

  onEyeClicked() {
    this.eyeToggled = !this.eyeToggled;
  }
}
