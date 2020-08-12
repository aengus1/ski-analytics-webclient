import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageEvent} from '../../../shared/utils';
import {ActivatedRoute} from '@angular/router';
import {PageInfo} from '../../../../generated/graphql';

@Component({
  selector: 'app-page-number-display',
  templateUrl: './page-number-display.component.html',
  styleUrls: ['./page-number-display.component.scss']
})
export class PageNumberDisplayComponent  implements OnInit {

  public currentPage: number;
  public totalPages: number;

  private routePageSize: number;
  private routePageNumber: number;

  private _resultCount = 1;

  constructor(private route: ActivatedRoute) {

}


  set resultCount(val: number) {
    console.log('result count set with ' + val);
    this._resultCount = val;
    this.calcPagination();
  }

// using typescript setter to intercept change event in order to call calcPagination
  @Input()
  get resultCount(): number {
    return this._resultCount;
  }


  @Output()
  public refresh: EventEmitter<MessageEvent<string>> = new EventEmitter<MessageEvent<string>>();

  callRefresh() {
      this.refresh.emit(new MessageEvent<string>('refresh'));
  }


  calcPagination() {
    try {
      const pagination: PageInfo = <PageInfo>JSON.parse(this.route.snapshot.paramMap.get('pagination'));
      this.routePageSize = pagination.pageSize;
      this.routePageNumber = pagination.pageNumber;
    } catch (ex) {
      console.log(ex);
      this.routePageSize = 1;
      this.routePageNumber = 1;
    }
    this.currentPage = this.routePageNumber;
    this.totalPages = Math.ceil(Number(this._resultCount) / Number(this.routePageSize));

  }

  ngOnInit(): void {
    this.calcPagination();
  }
}
