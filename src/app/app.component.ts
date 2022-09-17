import { Component } from '@angular/core';
import {LoadingService} from "./lib/services/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AutoAdminPages';

  constructor(public loadingService: LoadingService) {
  }
}
