import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MovingStopComponent} from './moving-stop.component';

describe('MovingStopComponent', () => {
  let component: MovingStopComponent;
  let fixture: ComponentFixture<MovingStopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovingStopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovingStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
