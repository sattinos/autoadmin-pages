import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationItem} from "../lib/models/validation-item";
import {
  isElementMissed,
  isElementTooShort,
  isEmailNotValidFormat
} from "../lib/controller/validation/validation-queries";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(4), Validators.email])
  });

  emailValidationItems: ValidationItem[] = [
    {message: "Please provide an email address", flag: isElementMissed.bind(this, this.resetPasswordForm,'email') },
    {message: "The email address should be at least 5 characters", flag: isElementTooShort.bind(this,this.resetPasswordForm,'email') },
    {message: "The email address entered is not valid format", flag: isEmailNotValidFormat.bind(this, this.resetPasswordForm, 'email') }
  ];

  onResetTapped() {
    console.log(this.resetPasswordForm.value);
  }

  isInvalid() {
    return this.resetPasswordForm.invalid;
  }
}
