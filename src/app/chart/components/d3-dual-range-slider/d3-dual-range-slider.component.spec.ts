import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3DualRangeSliderComponent } from './d3-dual-range-slider.component';

describe('D3DualRangeSliderComponent', () => {
  let component: D3DualRangeSliderComponent;
  let fixture: ComponentFixture<D3DualRangeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3DualRangeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3DualRangeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
