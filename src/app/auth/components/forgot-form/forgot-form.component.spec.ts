import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ForgotFormComponent} from './forgot-form.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

describe('ForgotFormComponent', () => {
  let component: ForgotFormComponent;
  let fixture: ComponentFixture<ForgotFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ ForgotFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
