interface String {
  insertAt(at: number, token: string): string;
}

String.prototype.insertAt = function (at: number, stringToInsert: string): string {
  const value: string = this.valueOf();
  if (at < 0 || at > this.length) {
    return value;
  }
  return `${value.slice(0, at)}${stringToInsert}${value.slice(at)}`;
}
