import { browser, by, element } from 'protractor';

export class SummaryMetaDataPage {
  navigateTo() {
    // TODO -> change this to /activity/1 to get the test activity once routing has been implemented
    return browser.get('/activity/1');
  }

  getActivityType() {

    return this.navigateTo().then(() => {
      return element(by.css('activity-type')).getText();
    });
  }

  getActivitySubType() {
    return element(by.css('activity-subtype')).getText();
  }

  getActivityCreatedDate() {
    // return this.navigateTo().then(() => {
    //   return element(by.id('activity-created-date')).getText();
    // });
   return browser.driver.findElement(by.id('activity-created-date'));
    // return browser.driver.findElement(by.css('activity-created-date'))[0];
  }
  getActivityCreatedTs() {
    return element(by.css('activity-created-ts')).getText();
  }
  getActivityLocation1() {
      return element(by.css('activity-location-1')).getText();
  }
  getActivityLocation2() {
    return element(by.css('activity-location-2')).getText();
  }
  getActivityTemp() {
    return element(by.css('activity-temp')).getText();
  }
  getActivityDistance() {
    return element(by.id('activity-distance')).getText();
  }
  getActivityTimer() {
    return element(by.css('activity-timer')).getText();
  }
}
