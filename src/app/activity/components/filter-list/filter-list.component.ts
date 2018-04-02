import {Component, Input, OnInit} from '@angular/core';
import {FilterComponent} from '../filter/filter.component';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {

  @Input() filterOpen: boolean;

  constructor() { }

  ngOnInit() {
  }

}
