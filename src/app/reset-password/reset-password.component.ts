import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationItem} from "../lib/models/validation-item";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(4), Validators.email])
  });

  emailValidationItems: ValidationItem[] = [
    {message: "Please provide an email address", flag: this.isElementMissed.bind(this, 'email') },
    {message: "The email address should be at least 5 characters", flag: this.isElementTooShort.bind(this, 'email')},
    {message: "The email address entered is not valid format", flag: this.isEmailNotValidFormat.bind(this)}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  onResetTapped() {
    console.log('email:');
    console.log(this.resetPasswordForm.value);
  }

  isInvalid() {
    return this.resetPasswordForm.invalid;
  }

  isElementMissed(elementName: string) {
    let element = this.resetPasswordForm.controls[elementName];
    return element.touched && element.errors?.required;
  }

  isElementTooShort(elementName: string) {
    let element = this.resetPasswordForm.controls[elementName];
    return element.touched && element.errors?.minlength;
  }

  isEmailMissed() {
    return this.resetPasswordForm.controls.email.touched && this.resetPasswordForm.controls.email.errors?.required;
  }

  isEmailTooShort() {
    return this.resetPasswordForm.controls.email.touched && this.resetPasswordForm.controls.email.errors?.minlength;
  }

  isEmailNotValidFormat() {
    return this.resetPasswordForm.controls.email.touched && this.resetPasswordForm.controls.email.errors?.email;
  }
}
