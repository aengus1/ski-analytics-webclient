import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AscentDescentComponent} from './ascent-descent.component';
import {Component, OnInit} from '@angular/core';
import {MockActivity} from '../../../model/activity/activity.mock';
import {ActivityModule} from '../../../activity.module';
import {combineReducers, StoreModule} from '@ngrx/store';
import * as fromActivities from '../../../reducers';
import {RouterTestingModule} from '@angular/router/testing';
import {EffectsModule} from '@ngrx/effects';
import {ActivitySummaryService} from '../../../services/activity-summary-service/activity-summary.service';

let fixture: ComponentFixture<AppMockComponent>;
let component: AppMockComponent;
let compiled: HTMLElement | null;

@Component({
  selector: 'app-mock-component',
  template: `<app-ascent-descent [uom]="layout.uom" [uomRate]="layout.uomRate" [activity]="layout.activity">
  </app-ascent-descent>`
})
class AppMockComponent  implements OnInit {

  public layout = {
    activity: MockActivity.generateMockActivity(),
    uom: 'm',
    uomRate: 'm/min'
  };



  ngOnInit() {
    // run summarize activity manually as component expects activity to be summarized
    ActivitySummaryService.summarizeActivity(this.layout.activity, null, null, null);
  }
}

  describe('AscentDescentComponent', () => {

  beforeEach(async(() => {
  TestBed.configureTestingModule({
    imports: [ActivityModule,
      StoreModule.forRoot({
        activities: combineReducers(fromActivities.reducers),
      }),
      EffectsModule.forRoot([]),
      RouterTestingModule
    ],
    declarations: [AppMockComponent]
  });

  fixture = TestBed.createComponent(AppMockComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  compiled = fixture.debugElement.nativeElement;
  }));


it('should create', () => {
  expect(component).toBeTruthy();
});

it('should display total ascent', () => {
  const ascentNum = compiled ? compiled.querySelector('#ascentNum') : undefined;
  expect(ascentNum.innerHTML).toEqual('21 m', 'ascent not displayed correctly' );
});

    it('should display total descent', () => {
      const descentNum = compiled ? compiled.querySelector('#descentNum') : undefined;
      expect(descentNum.innerHTML).toEqual('6 m', 'descent not displayed correctly' );
    });

    it('should scale up arrow appropriately', () => {
      const upArrow = compiled ? compiled.querySelector('#upArrow').getElementsByTagName('svg') : undefined;
      expect(upArrow.item(0).getAttribute('width')).toEqual('100%', 'up arrow not scaled appropriately');
    });

    it('should scale down arrow appropriately', () => {
    const downArrow = compiled ? compiled.querySelector('#downArrow').getElementsByTagName('svg') : undefined;
    const expectedWidth = ((6 / 21 ) * 100 ).toFixed(1);
    expect(downArrow.item(0).getAttribute('width')).toEqual(expectedWidth + '%', 'down arrow not scaled appropriately');
    });

});
