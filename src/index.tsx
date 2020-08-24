import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client'
import { offsetLimitPagination } from "@apollo/client/utilities";

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          launchesPast: offsetLimitPagination(),
        },
      },
    },
  }),
  link: new HttpLink({
    uri: 'https://api.spacex.land/graphql/'
  })
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
