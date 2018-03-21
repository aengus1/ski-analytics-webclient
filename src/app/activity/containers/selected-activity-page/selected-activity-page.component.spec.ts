import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedActivityPageComponent } from './selected-activity-page.component';

describe('SelectedActivityPageComponent', () => {
  let component: SelectedActivityPageComponent;
  let fixture: ComponentFixture<SelectedActivityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedActivityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
