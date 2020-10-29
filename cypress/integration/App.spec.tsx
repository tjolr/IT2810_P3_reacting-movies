import {initMovieState} from '../../src/redux/reducers/movie.reducer';

describe('App', () => {
  it('App render homepage', () => {
    cy.visit('/');
  });

  it('Initial redux state is correct', () => {
    cy.window()
      .its('store')
      .invoke('getState')
      .should('deep.equal', {
        movieReducer: initMovieState,
      });
  });
});
