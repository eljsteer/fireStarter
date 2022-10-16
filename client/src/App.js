import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'

import Home from './pages/Home';
import Login from './pages/Matchup';
import Signup from './pages/Signup';
import Discover from './pages/Discover';
import Project from './pages/Project';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// create HTTP link for graphQL
const httpLink = createHttpLink({
  uri: '/graphql',
});

// authLink variable to check local storage for token 
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers, 
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  uri: '/graphql',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Routes>
            <Route 
              path="/" 
              element={<Home />}
            />
            <Route 
              path="/login" 
              element={<Login />}
            />
            <Route 
              path="/signup" 
              element={<Signup />}
            />
            <Route 
              path="/discover" 
              element={<Discover />}
            />
            <Route 
              path="/project/:id" 
              element={<Project />}
            />
            <Route 
              path="/profile/:id" 
              element={<Profile />}
            />
            <Route 
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
