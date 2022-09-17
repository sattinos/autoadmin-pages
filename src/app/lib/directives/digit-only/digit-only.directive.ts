import {Directive, ElementRef, HostListener} from '@angular/core';
import {Condition} from "../../core/logic/condition";
import {OrGroup} from "../../core/logic/orGroup";
import "../../core/string/string-extensions";
@Directive({
  selector: '[digitOnly]'
})
export class DigitOnlyDirective {

  navigationKeys: string[] = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste'
  ];

  combinationKeys: string[] = [
    'a', 'c', 'v', 'x'
  ];

  conditions: Condition<KeyboardEvent>[] = [
    {condition: (arg: KeyboardEvent) => arg.ctrlKey && this.combinationKeys.indexOf(arg.key) > -1},
    {condition: (arg: KeyboardEvent) => arg.metaKey && this.combinationKeys.indexOf(arg.key) > -1}
  ]

  constructor(private elementRef: ElementRef) {}

  @HostListener('keydown', ['$event'])
  OnKeyDown(event: KeyboardEvent) {
    if( this.navigationKeys.indexOf(event.key) > -1 ) {
      return;
    }

    const orGroup = new OrGroup<KeyboardEvent>(this.conditions);
    if( orGroup.IsMet(event) ) {
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

    var caretPos = this.elementRef.nativeElement.selectionStart;
    var inputText = this.elementRef.nativeElement.value as string;
    this.elementRef.nativeElement.value = inputText.insertAt(caretPos, digitOnlyPastedText)
    this.elementRef.nativeElement.selectionStart = caretPos;
    this.elementRef.nativeElement.selectionEnd = caretPos + digitOnlyPastedText.length;
  }
}

