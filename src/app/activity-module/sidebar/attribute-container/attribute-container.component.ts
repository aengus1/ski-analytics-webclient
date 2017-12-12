import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-attribute-container',
  templateUrl: './attribute-container.component.html',
  styleUrls: ['./attribute-container.component.css']
})
export class AttributeContainerComponent implements OnInit {

  @Input() attributeOpen: boolean;

  constructor() { }

  ngOnInit() {
  }

}
