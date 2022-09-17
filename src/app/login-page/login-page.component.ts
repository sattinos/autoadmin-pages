import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ValidationItem} from "../lib/models/validation-item";
import {
  isElementMissed, isElementTooShort,
  isEmailNotValidFormat
} from "../lib/controller/validation/validation-queries";
import {FakeApiServiceService} from "../services/fake-api-service/fake-api-service.service";
import {FakeUser} from "../services/fake-api-service/fake-user";

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private fakeApiServiceService: FakeApiServiceService) {
  }

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
    this.fakeApiServiceService.getUser('1').subscribe(
      (fakeUser: FakeUser) => {
        console.log('fakeUser: ', fakeUser);
      }, (err) => {
        console.log('fakeUser(err): ', err);
      });
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
