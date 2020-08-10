import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageNumberDisplayComponent} from './page-number-display.component';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';

describe('PageNumberDisplayComponent', () => {
  let component: PageNumberDisplayComponent;
  let fixture: ComponentFixture<PageNumberDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({pagination: {pageSize: 50, pageNumber: 1}})
          }
        }
      ],
      declarations: [PageNumberDisplayComponent],
      imports: [RouterTestingModule]
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
