import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlertComponent} from './alert.component';
import {NgbDropdown, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../../auth/services/auth.service';
import {AlertService} from '../../services/alert.service';
import {StoreModule} from '@ngrx/store';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent],
      imports: [NgbDropdownModule,
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot([])
      ],
      providers: [NgbDropdown, RouterTestingModule, AlertService, AuthService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
