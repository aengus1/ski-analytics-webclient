import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-root',
  template: `<router-outlet></router-outlet>`
})
export class SearchRootComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
