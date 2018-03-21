import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActivityPageComponent } from './view-activity-page.component';

describe('ViewActivityPageComponent', () => {
  let component: ViewActivityPageComponent;
  let fixture: ComponentFixture<ViewActivityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewActivityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
