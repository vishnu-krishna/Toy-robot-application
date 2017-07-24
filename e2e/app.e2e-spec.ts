import { RobotPage } from './app.po';

describe('robot App', function() {
  let page: RobotPage;

  beforeEach(() => {
    page = new RobotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
