import { Injectable } from '@angular/core';
import { BehaviorSubject} from "rxjs";
import {LibModule} from "../lib.module";

@Injectable({
  providedIn: LibModule
})
export class LoadingService {

  private _loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }

  show() {
    this._loadingSubject.next(true);
  }

  hide() {
    this._loadingSubject.next(false);
  }

  get isLoading() {
    return this._loadingSubject.getValue();
  }
}
