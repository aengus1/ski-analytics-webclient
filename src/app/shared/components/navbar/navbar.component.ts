import {Component, OnInit} from '@angular/core';
import * as fromRoot from '../../../reducers/';
import {Store} from '@ngrx/store';
import {ToggleNavbar} from '../../layout/actions/layout.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarCollapsed$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.navbarCollapsed$ = this.store.select(fromRoot.getNavbarCollapsed);
  }

  toggleNavbar() {
    this.store.dispatch(new ToggleNavbar());
  }

}
