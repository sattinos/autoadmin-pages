export interface Condition<T> {
  condition: (arg: T) => boolean;
}
