import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryMetadataComponent } from './summary-metadata.component';

describe('SummaryMetadataComponent', () => {
  let component: SummaryMetadataComponent;
  let fixture: ComponentFixture<SummaryMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
