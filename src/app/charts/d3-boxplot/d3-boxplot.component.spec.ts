import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3BoxplotComponent } from './d3-boxplot.component';

describe('D3BoxplotComponent', () => {
  let component: D3BoxplotComponent;
  let fixture: ComponentFixture<D3BoxplotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3BoxplotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3BoxplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
