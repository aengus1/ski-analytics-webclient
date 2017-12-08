import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-module',
  templateUrl: './activity-module.component.html',
  styleUrls: ['./activity-module.component.css']
})
export class ActivityModuleComponent implements OnInit {

  summaryDisplay: Boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
