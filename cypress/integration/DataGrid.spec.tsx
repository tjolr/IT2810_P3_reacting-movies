describe('Datagrid', () => {
  it('Click on next page', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('button[aria-label="Next page"]').click();

    cy.window()
      .its('store')
      .invoke('getState')
      .its('movieReducer')
      .its('page')
      .should('deep.equal', 2);
  });

  it('Sort columns on release year ascending', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('div[aria-label="Release year"]').click();
    cy.wait(500);
    cy.window()
      .its('store')
      .invoke('getState')
      .its('movieReducer')
      .its('sort')
      .should('deep.equal', {
        field: 'release_date',
        direction: 'asc',
      });
  });

  it('Sort revenue on descending order', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('div[aria-label="Revenue"]')
      .click()
      .click();
    cy.wait(500);
    cy.window()
      .its('store')
      .invoke('getState')
      .its('movieReducer')
      .its('sort')
      .should('deep.equal', {
        field: 'revenue',
        direction: 'desc',
      });
  });
});
