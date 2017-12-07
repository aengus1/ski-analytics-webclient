import { SkiAnalyticsWebclientPage } from './app.po';

describe('ski-analytics-webclient App', function() {
  let page: SkiAnalyticsWebclientPage;

  beforeEach(() => {
    page = new SkiAnalyticsWebclientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
