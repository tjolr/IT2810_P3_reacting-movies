import React from 'react';
import {mount} from 'cypress-react-unit-test';
import Reviews from '../../src/components/GridSection/DetailViewSection/Reviews';
import {ApolloProvider} from '@apollo/client';
import {client} from '../../src/GraphQL/ApolloClient';

describe('Reviews', () => {
  it('Mounts review component', () => {
    mount(
      <ApolloProvider client={client}>
        <Reviews />
      </ApolloProvider>
    );
  });

  it('Fetches reviews for the Minions movie', () => {
    mount(
      <ApolloProvider client={client}>
        <Reviews movieId={'5f8ede493a48b53b2073d3b9'} />
      </ApolloProvider>
    );
  });
});
