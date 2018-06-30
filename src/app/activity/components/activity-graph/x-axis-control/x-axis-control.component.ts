import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageEvent} from '../../../../shared/utils';

@Component({
  selector: 'app-x-axis-control',
  templateUrl: './x-axis-control.component.html'
})
export class XAxisControlComponent implements OnInit {

  @Output()
  changeEvent = new EventEmitter<MessageEvent<string>>();

  @Input()
  axisKeys: string[];

  private selectedAxis: string;

  constructor() { }

  ngOnInit() {
    if(this.axisKeys) {
      this.selectedAxis = this.axisKeys[0];
    }
  }

  selectAxis(axisName: string) {
    this.selectedAxis = axisName;
    this.changeEvent.emit(new MessageEvent<string>('selectXAxis', axisName));
  }

}
