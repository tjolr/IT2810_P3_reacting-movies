import * as Realm from 'realm-web';
import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';

export const APP_ID = 'MovieDB';
/* const graphql_url = `http://129.241.104.155:4000/graphql`; */
const graphql_url = `http://it2810-58.idi.ntnu.no:3000/graphql`;

export const client = new ApolloClient({
  link: new HttpLink({uri: graphql_url}),
  cache: new InMemoryCache(),
});
