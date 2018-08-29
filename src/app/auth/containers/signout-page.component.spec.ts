import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SignoutPageComponent} from './signout-page.component';
import {AuthService} from '../services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import * as fromAuth from '../reducers';
import {combineReducers, StoreModule} from '@ngrx/store';

describe('SignoutPageComponent', () => {
  let component: SignoutPageComponent;
  let fixture: ComponentFixture<SignoutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        StoreModule.forRoot({
          auth: combineReducers(fromAuth.reducers),
        })],
      providers: [AuthService],
      declarations: [ SignoutPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
