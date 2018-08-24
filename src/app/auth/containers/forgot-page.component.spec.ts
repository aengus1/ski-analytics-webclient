import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ForgotPageComponent} from './forgot-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {combineReducers, StoreModule} from '@ngrx/store';
import * as fromAuth from '../reducers';
import {ForgotFormComponent} from '../components/forgot-form/forgot-form.component';

describe('ForgotPageComponent', () => {
  let component: ForgotPageComponent;
  let fixture: ComponentFixture<ForgotPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPageComponent, ForgotFormComponent ],
      imports: [
        StoreModule.forRoot({
          auth: combineReducers(fromAuth.reducers),
        }),
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
