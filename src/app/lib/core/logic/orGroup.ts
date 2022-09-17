import {Condition} from "./condition";

export class OrGroup<T> {
  constructor(conditions: Condition<T>[]) {
    this.conditions = conditions;
  }

  conditions: Condition<T>[];
  public IsMet(forArg: T): boolean {
    for (let i=0; i<this.conditions.length; i++) {
      if( this.conditions[i].condition(forArg) ) {
        return true;
      }
    }
    return false;
  }
}
