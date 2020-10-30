import * as Realm from 'realm-web';
import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';

export const APP_ID = 'MovieDB';
const graphql_url = `http://it2810-58.idi.ntnu.no:3000/graphql`;

export const client = new ApolloClient({
  link: new HttpLink({uri: graphql_url}),
  /* In Memory Cache so that data that has been requested gets saved
  in cache. This is very useful as if the user clicks on the next page
   and then to the previous page, the data from the previous page gets
   retrieved from cache instead of fetching from db. This improves 
   performance a lot! */
  cache: new InMemoryCache(),
});
