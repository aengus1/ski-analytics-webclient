import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSearchPageComponent } from './view-search-page.component';

describe('ViewSearchPageComponent', () => {
  let component: ViewSearchPageComponent;
  let fixture: ComponentFixture<ViewSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
