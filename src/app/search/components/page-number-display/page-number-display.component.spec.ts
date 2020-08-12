import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageNumberDisplayComponent} from './page-number-display.component';
import {ActivatedRoute, convertToParamMap, Params} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';

describe('PageNumberDisplayComponent', () => {
  let component: PageNumberDisplayComponent;
  let fixture: ComponentFixture<PageNumberDisplayComponent>;

  beforeEach(async(() => {
    const json: any =  JSON.stringify( {pageSize: 50, pageNumber: 4});
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // snapshot: { paramMap: convertToParamMap(json) }
            snapshot: {
              paramMap: {
                get: () => {
                  return json;
                }
              }

            }
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

  it('should  calculate total number of pages correctly', () => {
    component.resultCount = 240;
    expect(component.totalPages).toEqual(5);
  });
});
