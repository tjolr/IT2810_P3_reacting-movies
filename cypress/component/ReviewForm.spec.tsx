import React from 'react';
import {mount} from 'cypress-react-unit-test';
import ReviewForm from '../../src/components/GridSection/DetailViewSection/ReviewForm';
import {ApolloProvider} from '@apollo/client';
import {client} from '../../src/fetch/ApolloClient';

describe('Reviews', () => {
  it('Mounts reviewForm component', () => {
    mount(
      <ApolloProvider client={client}>
        <ReviewForm />
      </ApolloProvider>
    );
  });

  it('Can type in author and text field after mount', () => {
    mount(
      <ApolloProvider client={client}>
        <ReviewForm />
      </ApolloProvider>
    );

    cy.get('input[placeholder="Your name"]')
      .type('Cypress author')
      .invoke('val')
      .should('equal', 'Cypress author');

    cy.get('textarea[placeholder="Your review"]')
      .type('Cypress reviewtext')
      .invoke('val')
      .should('equal', 'Cypress reviewtext');
  });

  it('Submit gets activated after typing author and text', () => {
    mount(
      <ApolloProvider client={client}>
        <ReviewForm />
      </ApolloProvider>
    );

    cy.get('input[placeholder="Your name"]').type('Cypress author');

    cy.get('textarea[placeholder="Your review"]').type('Cypress reviewtext');

    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('Submits form, then clears input and textfield and disables button', () => {
    mount(
      <ApolloProvider client={client}>
        <ReviewForm />
      </ApolloProvider>
    );

    cy.get('input[placeholder="Your name"]').type('Cypress author');

    cy.get('textarea[placeholder="Your review"]').type('Cypress reviewtext');

    cy.get('button[type="submit"]')
      .should('not.be.disabled')
      .click();

    cy.get('button[type="submit"]').should('be.disabled');
  });
});
