import {Directive, ElementRef, HostListener} from '@angular/core';
import "../../core/string/string-extensions";
import {keyboard} from "../../core/constants/keyboard";
import {htmlInputElementExtensions} from "../../core/html-elements/input-extensions";
@Directive({
  selector: '[digitOnly]'
})
export class DigitOnlyDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('keydown', ['$event'])
  OnKeyDown(event: KeyboardEvent) {
    if( keyboard.isNavigationKeyEvent(event) ||
        keyboard.isCombinationKeyEvent(event) ) {
      return;
    }

    if( event.key === ' ' || isNaN(Number(event.key)) ) {
      event.preventDefault();
    }
  }

  @HostListener('paste', [ '$event'])
  OnPaste(event: ClipboardEvent) {
    if( !event.clipboardData ) {
      return;
    }
    event.preventDefault();
    const digitOnlyPastedText: string = event.clipboardData?.getData('text/plain').replace(/\D/g, '');

    var selectionStart = this.elementRef.nativeElement.selectionStart;
    var selectionEnd = this.elementRef.nativeElement.selectionEnd;
    var caretPos = this.elementRef.nativeElement.selectionStart;

    if( selectionStart < selectionEnd ) {
      var leftOfCursor = this.elementRef.nativeElement.value.substring(0, selectionStart);
      var rightOfCursor = this.elementRef.nativeElement.value.substring(selectionEnd);
      var value = `${leftOfCursor}${digitOnlyPastedText}${rightOfCursor}`;
      htmlInputElementExtensions.setInputValue(this.elementRef.nativeElement, value, selectionStart, selectionEnd);
      return;
    }
    var inputText = this.elementRef.nativeElement.value as string;
    htmlInputElementExtensions.setInputValue(
      this.elementRef.nativeElement,
      inputText.insertAt(caretPos, digitOnlyPastedText),
      caretPos, caretPos + digitOnlyPastedText.length
    );
  }
}
