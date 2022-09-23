const navigationKeys: string[] = [
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

const combinationKeys: string[] = [
  'a', 'c', 'v', 'x'
];

const isNavigationKeyEvent = (event: KeyboardEvent) => {
  return navigationKeys.indexOf(event.key) > -1;
};

const isCombinationKeyEvent = (event: KeyboardEvent) => {
  return (event.ctrlKey || event.metaKey) && keyboard.combinationKeys.indexOf(event.key) > -1;
};

export const keyboard = {
  navigationKeys,
  combinationKeys,
  isNavigationKeyEvent,
  isCombinationKeyEvent
};
