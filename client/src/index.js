import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'components/App';
import registerServiceWorker from 'lib/registerServiceWorker';

import {BrowserRouter as Router} from 'react-router-dom';

import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';

import GoogleAuth from 'lib/auth/GoogleAuth.js';
import {AuthProvider} from 'lib/auth/authContext.js';
import LoginSwitch from 'lib/auth/LoginSwitch.js';
import LoginPage from 'pages/LoginPage.js';

// Only bundle GraphiQL for dev builds
let GraphiQLDev = () => null;
if (process.env.NODE_ENV === 'development') {
  GraphiQLDev = require('components/GraphiQLDev.js').default;
}

const auth = new GoogleAuth({
  clientId: process.env.REACT_APP_OAUTH_CLIENT_ID
});

const link = new HttpLink({
  async fetch(uri, opts) {
    // Get auth info
    const creds = await auth.getCredentials();
    if (creds == null) {
      throw new Error('No credentials to fetch data');
    }

    return fetch(uri, {
      ...opts,
      headers: {
        ...opts.headers,
        Authorization: `Bearer ${creds.id_token}`
      }
    });
  }
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  shouldBatch: true
});

auth.subscribe(user => {
  if (user == null) {
    client.resetStore();
  }
});

if (process.env.NODE_ENV === 'development') {
  Object.assign(window, {
    client,
    auth
  });
}

ReactDOM.render(
  <AuthProvider auth={auth}>
    <ApolloProvider client={client}>
      <div>
        <GraphiQLDev link={link} />
        <Router>
          <LoginSwitch loggedIn={<App />} loggedOut={<LoginPage />} />
        </Router>
      </div>
    </ApolloProvider>
  </AuthProvider>,
  document.getElementById('root')
);
registerServiceWorker();
