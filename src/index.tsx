import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// make sure cache is merged with incoming (fetched) changes
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allProjects: {
          merge(existing: any, incoming: any) {
            return incoming;
          },
        },
      },
    },
    Project: {
      fields: {
        Users: {
          merge(existing: any, incoming: any) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri:
    process.env.REACT_APP_GQL_API ||
    'https://blooming-cliffs-33388.herokuapp.com/graphql',
  // 'http://localhost:5000/graphql',
  cache: cache,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
