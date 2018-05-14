import {ActivityPage} from './filter-panel.po';
import {browser, protractor} from 'protractor';
import {testHelpers} from '../../test-helpers';

describe('filter panel', () => {
  let page: ActivityPage;
  const until = protractor.ExpectedConditions;

  beforeEach(() => {
    browser.driver.manage().window().setSize(1280, 1024);
    page = new ActivityPage();
    page.navigateTo();
  });


  it('should display toggle button badge', () => {
    const filterToggleCount = page.getFilterToggleCount();
    browser.wait(until.presenceOf(filterToggleCount), 3000, 'waiting for filter toggle count to appear in DOM');
      expect(filterToggleCount.getAttribute('data-count')).toBe('0');
    });


  it('should open the filter sidebar when filter toggle is clicked', () => {
    const filterToggle = page.getFilterToggle();
      browser.wait(testHelpers.isClickable(filterToggle), 3000, 'waiting for filter toggle to become clickable');
      filterToggle.click();

      const filterList = page.getFilterList();
      browser.wait(until.presenceOf(filterList), 5000, 'waiting for filter list to appear in DOM');

      const firstFilterSwitch = page.getFirstFilterSwitchLabel();
      browser.wait(testHelpers.isClickable(firstFilterSwitch), 10000, 'waiting for filter switch to appear in DOM');
      firstFilterSwitch.click();

      expect(page.getFilterToggleCount().getAttribute('data-count')).toBe('1');
    });


});



