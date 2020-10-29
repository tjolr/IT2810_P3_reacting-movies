describe('ReleaseYear rangeslider', () => {
  it('Dispatch UPDATE_RELEASE_YEAR', () => {
    cy.visit('/');
    cy.window()
      .its('store')
      .invoke('dispatch', {
        type: 'UPDATE_RELEASE_YEAR',
        payload: {
          content: [1985, 2000],
        },
      });

    cy.window()
      .its('store')
      .invoke('getState')
      .its('movieReducer')
      .its('filter')
      .its('release_year')
      .should('deep.equal', {
        from: 1985,
        to: 2000,
      });
  });
});
