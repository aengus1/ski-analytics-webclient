import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageEvent} from '../../../shared/utils';

@Component({
  selector: 'app-page-number-display',
  templateUrl: './page-number-display.component.html',
  styleUrls: ['./page-number-display.component.scss']
})
export class PageNumberDisplayComponent  {

  @Input()
  public pageNumber: number;

  @Input()
  public pageCount: number;

  @Output()
  public refresh: EventEmitter<MessageEvent<string>> = new EventEmitter<MessageEvent<string>>();

  callRefresh() {
      this.refresh.emit(new MessageEvent<string>('refresh'));
  }

}
