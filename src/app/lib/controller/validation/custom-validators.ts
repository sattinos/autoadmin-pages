import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidators {
  public static patternValidator(nameRe: RegExp, validationErrors: ValidationErrors): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      if( !control.value ) {
        return null;
      }
      let isMatch = nameRe.test(control.value);
      return isMatch ? null : validationErrors;
    }
  }

  public static matchValidator(controlName: string, matchingControlName: string, validationErrors: ValidationErrors): ValidatorFn {
    // @ts-ignore
    return (form: FormGroup): ValidationErrors | null => {
      const control = form.controls[controlName];
      const matchingControl  = form.controls[matchingControlName];
      if( control.value !== matchingControl.value) {
        return validationErrors;
      }
      return null;
    }
  }
}
