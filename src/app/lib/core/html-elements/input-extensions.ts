const setInputValue = (nativeHtmlElement: HTMLInputElement, value: string, selectionStart: number, selectionEnd: number) => {
  nativeHtmlElement.value = value;
  nativeHtmlElement.selectionStart = selectionStart;
  nativeHtmlElement.selectionEnd = selectionEnd;
}

export const htmlInputElementExtensions = {
  setInputValue
};
