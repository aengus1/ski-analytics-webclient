import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-attribute-container',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  @Input() attributeOpen: boolean;

  constructor() { }

  ngOnInit() {
  }

}
