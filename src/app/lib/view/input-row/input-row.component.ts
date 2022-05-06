import {Component, Input} from '@angular/core';
import {ValidationItem} from "../../models/validation-item";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input-row',
  templateUrl: './input-row.component.html',
  styleUrls: ['./input-row.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputRowComponent
    }
  ]
})
export class InputRowComponent implements ControlValueAccessor {
  @Input() inputType: string = 'text';
  @Input() title: string = '';
  @Input() placeHolder: string = '';
  @Input() validationItems: ValidationItem[] = [];

  public text: string = '';
  public onChange = (text: string) => {};
  public onTouched = () => {};

  disabled: boolean = false;
  constructor() { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue(newText: string): void {
    this.text = newText;
    this.markAsTouched();
  }

  markAsTouched() {
    this.onTouched();
  }

  public onTextChange(newText: any) {
    this.onChange(newText.target.value);
  }

  onBlur() {
    this.markAsTouched();
  }
}
