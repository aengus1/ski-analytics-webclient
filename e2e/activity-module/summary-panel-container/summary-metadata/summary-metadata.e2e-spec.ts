import {SummaryMetaDataPage} from './summary-metadata.po';



describe('summary metadata panel', () => {
  let page: SummaryMetaDataPage;


  beforeEach(() => {
    page = new SummaryMetaDataPage();
    page.navigateTo();
  });

  it('should display date', () => {
    // browser.addMockModule('ActivityService', mockActivityService);  //dynamically write mock code here
    page.getActivityCreatedDate().then(res => {
      expect(res.getAttribute('innerHTML')).toEqual('05 Dec 2017');
    });
  });
});
