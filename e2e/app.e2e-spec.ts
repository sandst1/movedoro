import { MovedoroPage } from './app.po';

describe('movedoro App', () => {
  let page: MovedoroPage;

  beforeEach(() => {
    page = new MovedoroPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
