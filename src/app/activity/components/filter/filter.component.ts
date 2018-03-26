import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-filter-container',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() filterOpen: boolean;

  constructor() { }

  ngOnInit() {
  }

}
