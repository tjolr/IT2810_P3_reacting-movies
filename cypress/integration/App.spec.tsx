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

  it('loads 25 movies', () => {
    cy.get('.MuiToolbar-root > .MuiTypography-root').contains('25');
  });

  it('shows the total number of films', () => {
    cy.get('.MuiDataGrid-rowCount').contains('Total Rows: 4 799');
  });
});
