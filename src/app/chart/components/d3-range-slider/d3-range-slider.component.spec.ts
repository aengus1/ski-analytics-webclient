import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3RangeSliderComponent } from './d3-range-slider.component';

describe('D3RangeSliderComponent', () => {
  let component: D3RangeSliderComponent;
  let fixture: ComponentFixture<D3RangeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3RangeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3RangeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
