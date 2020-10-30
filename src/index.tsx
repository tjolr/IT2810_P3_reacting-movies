import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './redux/store';
import {ApolloProvider} from '@apollo/client';
import {client} from './GraphQL/ApolloClient';

ReactDOM.render(
  /* Apolloprovider so all its children can access the client */
  <ApolloProvider client={client}>
    {/* Redux provider so all its children can access the store */}
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

/* Expose the redux store to cypress to be able 
to test the Redux implementation */
// @ts-ignore
if (window.Cypress) {
  // @ts-ignore
  window.store = store;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
