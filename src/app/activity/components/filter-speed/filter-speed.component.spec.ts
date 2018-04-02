import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSpeedComponent } from './filter-speed.component';

describe('FilterSpeedComponent', () => {
  let component: FilterSpeedComponent;
  let fixture: ComponentFixture<FilterSpeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSpeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
