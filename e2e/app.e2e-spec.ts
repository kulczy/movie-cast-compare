import { MovieCastComparePage } from './app.po';

describe('movie-cast-compare App', () => {
  let page: MovieCastComparePage;

  beforeEach(() => {
    page = new MovieCastComparePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
