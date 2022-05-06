import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ValidationItem} from "../lib/models/validation-item";
import {
  isElementMissed, isElementTooShort,
  isEmailNotValidFormat
} from "../lib/controller/validation/validation-queries";

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {  }

  loginForm = this.formBuilder.group({
     email: ['', [Validators.required, Validators.email]],
     password: ['',
       Validators.compose([
           Validators.required,
           Validators.minLength(8)         ]
       )
     ],
     rememberMe: ['']
   });

  emailValidationItems: ValidationItem[] = [
    {message: "Please provide an email address", flag: isElementMissed.bind(this, this.loginForm, 'email')},
    {message: "The email address entered is not valid format", flag: isEmailNotValidFormat.bind(this, this.loginForm, 'email')}
  ];

  passwordValidationItems: ValidationItem[] = [
    { message: "password is required", flag: isElementMissed.bind(this, this.loginForm, 'password') },
    { message: "should be at least 8 characters", flag: isElementTooShort.bind(this, this.loginForm, 'password') }
  ];

  ngOnInit(): void {
  }

  onSignInTapped() {
    console.log("OnSignInTapped", this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
  }

  get isEmailInvalid() {
    let element = this.loginForm.controls['email'];
    return element.touched && element.invalid;
  }

  get isPasswordInvalid() {
    let element = this.loginForm.controls['password'];
    return element.touched && element.invalid;
  }

  isInvalid() {
    return this.loginForm.invalid;
  }
}
