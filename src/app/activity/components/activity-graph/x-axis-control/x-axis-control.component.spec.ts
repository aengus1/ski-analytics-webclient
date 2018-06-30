import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {XAxisControlComponent} from './x-axis-control.component';

describe('XAxisControlComponent', () => {
  let component: XAxisControlComponent;
  let fixture: ComponentFixture<XAxisControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XAxisControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XAxisControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
