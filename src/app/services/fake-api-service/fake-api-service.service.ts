import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FakeUser} from "./fake-user";

@Injectable({
  providedIn: 'root'
})
export class FakeApiServiceService {

  baseUrl = 'https://jsonplaceholder.typicode.com';

  routes = {
    getTodoById: `${this.baseUrl}/todos`
  }

  constructor(private httpClient: HttpClient) { }

  getUser(id: string): Observable<FakeUser> {
    return this.httpClient.get<FakeUser>(`${this.routes.getTodoById}/${id}`);
  }
}
