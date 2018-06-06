import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {D3RadialComponent} from './d3-radial.component';

describe('D3RadialComponent', () => {
  let component: D3RadialComponent;
  let fixture: ComponentFixture<D3RadialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3RadialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3RadialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
