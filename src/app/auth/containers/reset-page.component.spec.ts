import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResetPageComponent} from './reset-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {combineReducers, StoreModule} from '@ngrx/store';
import * as fromAuth from '../reducers';
import {ResetFormComponent} from '../components/reset-form/reset-form.component';

describe('ResetPageComponent', () => {
  let component: ResetPageComponent;
  let fixture: ComponentFixture<ResetPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPageComponent, ResetFormComponent ],
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
    fixture = TestBed.createComponent(ResetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
