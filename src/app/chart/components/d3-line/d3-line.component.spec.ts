import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {D3LineComponent} from './d3-line.component';

describe('D3LineComponent', () => {
  let component: D3LineComponent;
  let fixture: ComponentFixture<D3LineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3LineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3LineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
