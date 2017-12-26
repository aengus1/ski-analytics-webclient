import { Component, OnInit } from '@angular/core';
import {FetchActivityService} from '../services/fetch-activity.service';


@Component({
  selector: 'app-summary-panel-container',
  templateUrl: './summary-panel-container.component.html',
  styleUrls: ['./summary-panel-container.component.css']
})
export class SummaryPanelContainerComponent implements OnInit {

  constructor(private activityService: FetchActivityService) { }

  loadActivity(){
    this.activityService.getActivity().subscribe(data => {console.log(data.getMeta().getCreatedts()); },
    err => {console.log(err); });
  }
  ngOnInit() {
    this.loadActivity();
  }

}
