/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityModuleComponent } from './activity-module.component';
import {FilterContainerComponent} from '../filter-container/filter-container.component';
import {SharedModule} from '../../../shared/shared.module';


describe('ActivityModuleComponent', () => {
  let component: ActivityModuleComponent;
  let fixture: ComponentFixture<ActivityModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityModuleComponent ],
      imports: [SharedModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
