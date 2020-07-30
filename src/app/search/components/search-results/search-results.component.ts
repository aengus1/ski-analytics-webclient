import {Component, Input, OnInit} from '@angular/core';
import {ActivitySearchResult} from '../../../../generated/graphql';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  constructor() { }

  @Input()
  public searchResults: ActivitySearchResult[];

  ngOnInit(): void {
  }

}
