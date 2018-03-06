import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityRootComponent } from './activity-root.component';

describe('ActivityRootComponent', () => {
  let component: ActivityRootComponent;
  let fixture: ComponentFixture<ActivityRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
