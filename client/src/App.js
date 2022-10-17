import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Discover from './pages/Discover';
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
          <div>
          
            <Navigation />

            <div className="container">
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
                  path="/profile/:id" 
                  element={<Profile />}
                />
                <Route 
                  path="*"
                  element={<NotFound />}
                />
              </Routes>
            </div> 
            <Footer />           
          </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
