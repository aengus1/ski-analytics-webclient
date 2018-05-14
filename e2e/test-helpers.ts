import {ElementFinder, promise} from 'protractor';

export let testHelpers = {
  isClickable(el: ElementFinder): promise.Promise<boolean> {
    return new promise.Promise(resolve => {
      const interval = setInterval(() => {
        el.click().then(() => {
          clearInterval(interval);
          setTimeout(() => {
            resolve(true);
          }, 500);
        }, () => { });
      }, 100);
    });
  }
};
