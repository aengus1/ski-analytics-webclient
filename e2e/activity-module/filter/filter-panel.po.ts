import {browser, by, element} from 'protractor';

export class ActivityPage {
  navigateTo() {
    return browser.get('/activity/1');
  }
  getFilterToggle() {
      return element(by.id('filterToggle'));
  }

  getFilterToggleCount() {
      return element(by.id('filterCount'));
  }

  getFilterList() {
    return element(by.id('filterList'));
  }

  getFirstFilterSwitch() {
    return element(by.id('switch-id'));
  }

  getFirstFilterSwitchLabel() {
    return element(by.css("label[for='switch-id']"));
  }
}
