import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {FilterBase} from '../filter-base.model';
import {ActivityFilter} from '../../../model/activity-filter/activity-filter.model';
import {LoggerService} from '../../../../shared/services/logger.service';
import {Subject} from 'rxjs/index';
import {MessageEvent} from '../../../../shared/utils';
import {Activity} from '../../../model/activity/Activity_pb';
import {debounceTime} from 'rxjs/operators';
import {HrzoneFilter} from './hrzone-filter';

@Component({
  selector: 'app-filter-hrzone',
  template: `
    <div class="container">
      <div class="btn-group-toggle col-xs-12" data-toggle="buttons">
        <label
          *ngFor="let state of initialState; index as i;"
          class="btn btn-sm btn-outline-secondary"
          [ngClass]="this.initialState[i]===true?'active':''"
          >
          <input
            type="checkbox"
            name="z{{i}}"
            id="z{{i+1}}"
            value="{{i+1}}"
            (click)="updateState(i)"
            [checked]="this.initialState[i]">{{i+1}}
        </label>
      </div>
    </div>`,
  styleUrls: ['filter-hrzone.component.css'],
  providers: [{provide: FilterBase, useExisting: forwardRef(() => FilterHrzoneComponent)}]
})
export class FilterHrzoneComponent extends FilterBase implements OnInit {


  @Output()
  changeEvent = new EventEmitter<MessageEvent<any[]| ActivityFilter | string>>();
  @Input()
  private activity: Activity;
  @Input()
  private userZoneBoundaries: number[];
  private filterId = 'hrzone';
  private debouncer: Subject<MessageEvent<any[]| ActivityFilter>> = new Subject<MessageEvent<any[]| ActivityFilter>>();
  private initialState = [false, false, false, false, false];

  constructor(private logger: LoggerService) {
    super();
  }

  ngOnInit() {

  }

  updateState(zone: number) {
    this.initialState[zone] = !this.initialState[zone]; // toggle state;
    this.debouncer.next(new MessageEvent('filterCategory', [this.filterId, this.initialState, this.userZoneBoundaries]));
  }

  disable(): void {
    this.changeEvent.emit(new MessageEvent('removeActivityFilter', this.filterId));
  }

  enable(): void {
    const hrZoneFilter = new HrzoneFilter(this.initialState, this.filterId);
    hrZoneFilter.setUserZoneBoundaries(this.userZoneBoundaries);

    this.logger.info('[FilterHrZoneComponent] enabling activity filter ' + hrZoneFilter.id);
    this.changeEvent.emit(new MessageEvent('addActivityFilter', hrZoneFilter));
    this.filterId = hrZoneFilter.id;
    this.debouncer.pipe(debounceTime(0)).subscribe(v => {
      this.changeEvent.emit(v);
    });
  }

  getFilterId(): string {
    return this.filterId;
  }

  reset(): void {
    this.logger.info('[FilterHrZoneComponent] reset called');
    this.initialState = [false, false, false, false, false];
  }

  set (filter: ActivityFilter) {
    const f = <HrzoneFilter>filter;
    this.initialState  = f.initialZones;
    this.debouncer.pipe(debounceTime(200)).subscribe(v => {
      this.changeEvent.emit(v);
    });
  }

}
