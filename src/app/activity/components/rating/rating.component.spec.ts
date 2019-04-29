import {RatingComponent} from './rating.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NgbRating, NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import {LoggerService} from '../../../shared/services/logger.service';
import {ConsoleLoggerService} from '../../../shared/services/console-logger.service';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingComponent ],
      imports: [NgbRatingModule],
      providers: [NgbRating, { provide: LoggerService, useClass: ConsoleLoggerService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
