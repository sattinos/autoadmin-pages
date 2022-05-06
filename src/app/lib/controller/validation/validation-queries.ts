import {FormGroup} from "@angular/forms";

export function isElementMissed(form: FormGroup, elementName: string): boolean {
  let element = form.controls[elementName];
  return element.touched && element.errors?.required;
}

export function isEmailNotValidFormat(form: FormGroup, elementName: string) {
  let element = form.controls[elementName];
  return element.touched && element.errors?.email;
}

export function isPasswordTooShort(form: FormGroup, elementName: string) {
  let element = form.controls[elementName];
  return element.touched && element.errors?.minlength;
}

export function isElementTooShort(form: FormGroup, elementName: string) {
  let element = form.controls[elementName];
  return element.touched && element.errors?.minlength;
}

export function isElementTooLong(form: FormGroup, elementName: string) {
  let element = form.controls[elementName];
  return element.touched && element.errors?.maxlength;
}

