import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MessageEvent} from '../../../shared/utils';
import {LoggerService} from '../../../shared/services/logger.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  private _feeling: number;

  constructor(private logger: LoggerService) { }

  public get feeling() {
    return this._feeling;
  }
  public set feeling(value: number) {
    this._feeling = value;
    this.logger.info('[RatingComponent] set feeling called ' + this.feeling);
    this.changeEvent.emit(new MessageEvent('setFeeling', this.feeling));
  }

  @Output()
  changeEvent = new EventEmitter<MessageEvent<number | string>>();


  ngOnInit() {
    this.feeling = -1;
  }
}
