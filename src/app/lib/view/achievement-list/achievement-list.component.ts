import {Component, Input, OnInit} from '@angular/core';
import {ValidationItem} from "../../models/validation-item";

@Component({
  selector: 'app-achievement-list',
  templateUrl: './achievement-list.component.html',
  styleUrls: ['./achievement-list.component.scss']
})
export class AchievementListComponent implements OnInit {
  @Input()
  ValidationItems: ValidationItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
