import { TestBed, inject } from '@angular/core/testing';

import { ActivitySummaryService } from './activity-summary.service';
import {MockActivityService} from '../activity-service/mock.activity.service';
import {Activity} from '../../model/activity/Activity_pb';
import {MockActivity} from '../../model/activity/activity.mock';
import {MockActivityFilter} from '../../model/activity-filter/activity-filter.mock';
import {SpeedFilter} from '../../components/filter-speed/speed-filter';



describe('ActivitySummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivitySummaryService]
    });
  });

  it('should be created', inject([ActivitySummaryService], (service: ActivitySummaryService) => {
    expect(service).toBeTruthy();
  }));

  describe('Ascent calculation', () => {
    const activity: Activity = MockActivity.generateMockActivity();
    ActivitySummaryService.summarizeActivity(activity, null);

    it('should calculate ascent correctly when no filters are applied', () => {
      expect(activity.getSummary().getTotalascent()).toEqual(21);
    });

    it('should calculate ascent time correctly when no filters are applied', () => {
      expect(activity.getSummary().getTotalasctime()).toEqual(9);

    });

    it('should calculate ascent distance correctly when no filters are applied', () => {
      expect(activity.getSummary().getTotalascdist()).toEqual(51);

    });

    it('should calculate ascent correctly when  filters are applied', () => {
      ActivitySummaryService.summarizeActivity(activity, [6, 7, 9, 11]);
      expect(activity.getSummary().getTotalascent()).toEqual(1);

    });

    it('should calculate ascent time correctly when  filters are applied', () => {
      ActivitySummaryService.summarizeActivity(activity, [6, 7, 9, 11]);
      expect(activity.getSummary().getTotalasctime()).toEqual(1);

    });

    it('should calculate ascent distance correctly when  filters are applied', () => {
      ActivitySummaryService.summarizeActivity(activity, [6, 7, 9, 11]);
      expect(activity.getSummary().getTotalascdist()).toEqual(2);

    });

  });


  describe('Descent calculation', () => {

    const activity: Activity = MockActivity.generateMockActivity();
    ActivitySummaryService.summarizeActivity(activity, null);
    it('should calculate descent correctly when no filters are applied', () => {
      expect(activity.getSummary().getTotaldescent()).toEqual(6);

    });

    it('should calculate descent time correctly when no filters are applied', () => {
      expect(activity.getSummary().getTotaldesctime()).toEqual(4);
    });

    it('should calculate descent distance correctly when no filters are applied', () => {
      expect(activity.getSummary().getTotaldescdist()).toEqual(46);

    });

    it('should calculate descent correctly when  filters are applied', () => {
      ActivitySummaryService.summarizeActivity(activity, [6, 7, 9, 11]);
      expect(activity.getSummary().getTotaldescent()).toEqual(0);
    });

    it('should calculate descent time correctly when  filters are applied', () => {
      ActivitySummaryService.summarizeActivity(activity, [6, 7, 9, 11]);
      expect(activity.getSummary().getTotaldesctime()).toEqual(0);

    });

    it('should calculate descent distance correctly when  filters are applied', () => {
      ActivitySummaryService.summarizeActivity(activity, [6, 7, 9, 11]);
      expect(activity.getSummary().getTotaldescdist()).toEqual(0);

    });

  });
});
