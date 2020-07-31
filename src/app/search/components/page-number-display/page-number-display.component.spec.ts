import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNumberDisplayComponent } from './page-number-display.component';

describe('PageNumberDisplayComponent', () => {
  let component: PageNumberDisplayComponent;
  let fixture: ComponentFixture<PageNumberDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNumberDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNumberDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
