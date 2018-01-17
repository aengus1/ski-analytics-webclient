import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.css']
})
export class FilterContainerComponent implements OnInit {

  @Input() filterOpen: boolean;

  constructor() { }

  ngOnInit() {
  }

}
