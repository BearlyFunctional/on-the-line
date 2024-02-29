import './App.css'

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Auth from './utils/auth';

import Header from './components/Header';
import SignInHeader from './components/SignInHeader';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const location = useLocation();

  useEffect(() => {

    const pathArray = ['/createPost', '/myPosts', '/donate'];

    if (Auth.loggedIn() && location.pathname === '/home') {
      document.body.style.placeItems = 'baseline';
    } else {
      document.body.style.placeItems = 'center'; 
    }

    if (pathArray.includes(location.pathname) ) {
      document.body.style.placeItems = 'baseline';
    }

  }, [location.pathname]);

  return (
    <ApolloProvider client={client}>
      {Auth.loggedIn() ? < Header /> : ''}
      <div className='main-container'>
        < Outlet />
      </div>
    </ApolloProvider>
  )
}

export default App;
