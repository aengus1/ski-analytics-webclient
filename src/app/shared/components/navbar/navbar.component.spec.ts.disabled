import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbCollapse, NgbCollapseModule, NgbDropdown, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {combineReducers, StoreModule} from '@ngrx/store';
import * as fromLayout from '../../layout/reducers/layout.reducer';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [RouterTestingModule, NgbDropdownModule, NgbCollapseModule,
        StoreModule.forRoot({
          layout: combineReducers(fromLayout.reducer),
        })],
      providers: [NgbDropdown, NgbCollapse]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
