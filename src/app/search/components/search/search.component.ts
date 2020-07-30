import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivitySearchResult} from '../../../../generated/graphql';
import {MessageEvent} from '../../../shared/utils';
import {ActivitySidebarType} from '../../../activity/actions/activity.actions';

@Component({
  selector: 'app-search-module',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input()
  public searchResults: ActivitySearchResult[];

  @Output()
  public messageEvent = new EventEmitter<MessageEvent<string | ActivitySidebarType>>();

  constructor() { }

  ngOnInit(): void {
  }

}
