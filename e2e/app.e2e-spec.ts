import { ClassroomFrontendPage } from './app.po';

describe('classroom-frontend App', function() {
  let page: ClassroomFrontendPage;

  beforeEach(() => {
    page = new ClassroomFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
