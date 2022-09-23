import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {keyboard} from "../../core/constants/keyboard";
import {htmlInputElementExtensions} from "../../core/html-elements/input-extensions";

@Directive({
  selector: '[mask]'
})
export class InputMaskDirective implements OnInit {
  @Input() mask: string = '';

  maskRegEx: RegExp = new RegExp('');
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    if( !!this.mask ) {
      this.maskRegEx = new RegExp(this.mask);
    }
  }

  @HostListener('keydown', ['$event'])
  OnKeyDown(event: KeyboardEvent) {
    if( keyboard.isNavigationKeyEvent(event) ||
        keyboard.isCombinationKeyEvent(event) ) {
      return;
    }

    var selectionStart = this.elementRef.nativeElement.selectionStart;
    var selectionEnd = this.elementRef.nativeElement.selectionEnd;
    if( selectionStart < selectionEnd ) {
      var leftOfCursor = this.elementRef.nativeElement.value.substring(0, selectionStart);
      var rightOfCursor = this.elementRef.nativeElement.value.substring(selectionEnd);
      var value = `${leftOfCursor}${event.key}${rightOfCursor}`;
      if( !this.maskRegEx.test(value) ) {
        event.preventDefault();
      }
      return;
    }

    var caretPos = this.elementRef.nativeElement.selectionStart;
    var inputText = this.elementRef.nativeElement.value as string;
    var value = inputText.insertAt(caretPos, event.key);
    if( !this.maskRegEx.test(value) ) {
      event.preventDefault();
    }
  }

  @HostListener('paste', [ '$event'])
  OnPaste(event: ClipboardEvent) {
    if( !event.clipboardData ) {
      return;
    }
    event.preventDefault();
    const pastedText: string = event.clipboardData?.getData('text/plain');
    var selectionStart = this.elementRef.nativeElement.selectionStart;
    var selectionEnd = this.elementRef.nativeElement.selectionEnd;
    var caretPos = this.elementRef.nativeElement.selectionStart;

    if( selectionStart < selectionEnd ) {
      var leftOfCursor = this.elementRef.nativeElement.value.substring(0, selectionStart);
      var rightOfCursor = this.elementRef.nativeElement.value.substring(selectionEnd);
      var value = `${leftOfCursor}${pastedText}${rightOfCursor}`;
      if( !this.maskRegEx.test(value) ) {
        event.preventDefault();
        return;
      }
      htmlInputElementExtensions.setInputValue(this.elementRef.nativeElement, value, caretPos, caretPos + pastedText.length);
      return;
    }
    var inputText = this.elementRef.nativeElement.value as string;
    var value = inputText.insertAt(caretPos, pastedText);
    if( !this.maskRegEx.test(value) ) {
      event.preventDefault();
      return;
    }
    htmlInputElementExtensions.setInputValue(this.elementRef.nativeElement, value, caretPos, caretPos + pastedText.length);
  }
}
