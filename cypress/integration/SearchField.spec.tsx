describe('SearchField', () => {
  it('Dispatch UPDATE_SEARCH_FIELD', () => {
    cy.visit('/');
    cy.window()
      .its('store')
      .invoke('dispatch', {
        type: 'UPDATE_SEARCH_FIELD',
        payload: {
          content: 'Test',
        },
      });

    cy.window()
      .its('store')
      .invoke('getState')
      .its('movieReducer')
      .its('searchString')
      .should('deep.equal', 'Test');
  });

  it('Type in searchField updates redux state', () => {
    cy.visit('/');
    cy.get('#searchMovieField').type('Batman');

    cy.window()
      .its('store')
      .invoke('getState')
      .its('movieReducer')
      .its('searchString')
      .should('deep.equal', 'Batman')
      .should('have.length', 6);
  });
});
