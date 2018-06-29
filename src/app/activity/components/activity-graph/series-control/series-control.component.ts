import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageEvent} from '../../../../shared/utils';
import {DataSeries} from '../../../../chart/components/d3-line/data-series.model';

@Component({
  selector: 'app-series-control',
  templateUrl: './series-control.component.html',
  styleUrls: ['./series-control.component.css']
})
export class SeriesControlComponent implements OnInit {

  constructor() { }

  @Input()
  seriesKey: DataSeries[];

  @Output()
  changeEvent = new EventEmitter<MessageEvent<number>>();

  ngOnInit() {
  }

  toggleSeries(idx: number) {
    this.changeEvent.emit(new MessageEvent('toggleSeries', idx));
  }
}
